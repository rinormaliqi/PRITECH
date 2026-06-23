export type TaskStatus = 'todo' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  finishDate?: string;
  supervisor: string | null;
  theme: string;
}

export interface Quote {
  content: string;
  author: string;
}

export interface ScheduleTask {
  id: string;
  title: string;
  description: string;
  time: string;
  cardColor: string;
  dotColor: string;
  active: boolean;
}

export type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  AddTask: undefined;
  TaskDetail: { taskId: string };
  Schedule: { filter?: 'all' | 'todo' | 'done' } | undefined;
  Profile: undefined;
};
