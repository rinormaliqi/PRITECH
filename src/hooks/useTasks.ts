import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types';

const TASKS_KEY = '@pritech:tasks';

const generateId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

function save(tasks: Task[]) {
  AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(TASKS_KEY).then(stored => {
      if (stored) {
        try { setTasks(JSON.parse(stored)); } catch {}
      }
      setLoading(false);
    });
  }, []);

  const addTask = useCallback((title: string, description: string) => {
    const task: Task = {
      id: generateId(),
      title: title.trim(),
      description: description.trim(),
      status: 'todo',
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => {
      const next = [task, ...prev];
      save(next);
      return next;
    });
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks(prev => {
      const next = prev.map(t =>
        t.id === id
          ? { ...t, status: (t.status === 'done' ? 'todo' : 'done') as Task['status'] }
          : t,
      );
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
