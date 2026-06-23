import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types';
import { DEFAULT_THEME_ID } from '../data/taskThemes';

const TASKS_KEY = '@pritech:tasks';

const generateId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

function save(tasks: Task[]) {
  AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

function addDays(isoDate: string, days: number): string {
  const d = new Date(isoDate);
  d.setDate(d.getDate() + days);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(TASKS_KEY).then(stored => {
      if (stored) {
        try {
          const parsed: Task[] = JSON.parse(stored);
          const migrated = parsed.map(t => ({
            ...t,
            supervisor: t.supervisor ?? null,
            theme: t.theme ?? DEFAULT_THEME_ID,
            deadline: t.deadline ?? addDays(t.createdAt, 7),
          }));
          setTasks(migrated);
        } catch {}
      }
      setLoading(false);
    });
  }, []);

  const addTask = useCallback(
    (
      title: string,
      description: string,
      supervisor: string | null = null,
      theme: string = DEFAULT_THEME_ID,
      dateStr?: string,
      deadlineStr?: string,
    ) => {
      const now = new Date();
      if (dateStr) {
        const [y, mo, d] = dateStr.split('-').map(Number);
        now.setFullYear(y, mo - 1, d);
      }
      const createdAt = now.toISOString();
      const task: Task = {
        id: generateId(),
        title: title.trim(),
        description: description.trim(),
        status: 'todo',
        createdAt,
        deadline: deadlineStr ?? addDays(createdAt, 7),
        supervisor,
        theme,
      };
      setTasks(prev => {
        const next = [task, ...prev];
        save(next);
        return next;
      });
    },
    [],
  );

  const toggleTask = useCallback((id: string) => {
    setTasks(prev => {
      const next = prev.map(t => {
        if (t.id !== id) return t;
        const becomingDone = t.status !== 'done';
        return {
          ...t,
          status: (becomingDone ? 'done' : 'todo') as Task['status'],
          finishDate: becomingDone ? new Date().toISOString() : undefined,
        };
      });
      save(next);
      return next;
    });
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => {
      const next = prev.filter(t => t.id !== id);
      save(next);
      return next;
    });
  }, []);

  const getTask = useCallback(
    (id: string) => tasks.find(t => t.id === id),
    [tasks],
  );

  return { tasks, loading, addTask, toggleTask, deleteTask, getTask };
}
