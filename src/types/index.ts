export type TaskStatus = 'todo' | 'progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  time: string;
  status: TaskStatus;
  progress: number;
  cardColor: string;
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

export interface WeekDay {
  day: string;
  date: number;
  selected: boolean;
}

export type RootStackParamList = {
  Home: undefined;
  Schedule: undefined;
};
