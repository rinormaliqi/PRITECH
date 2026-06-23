import React, { createContext, useContext, ReactNode } from 'react';
import { useTasks } from '../hooks/useTasks';
import { Task } from '../types';

interface TasksContextValue {
  tasks: Task[];
  loading: boolean;
  addTask: (
    title: string,
    description: string,
    supervisor?: string | null,
    theme?: string,
    dateStr?: string,
    deadlineStr?: string,
  ) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  getTask: (id: string) => Task | undefined;
}

const TasksContext = createContext<TasksContextValue | null>(null);

export function TasksProvider({ children }: { children: ReactNode }) {
  const value = useTasks();
  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasksContext(): TasksContextValue {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error('useTasksContext must be inside TasksProvider');
  return ctx;
}
