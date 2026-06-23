export interface TaskTheme {
  id: string;
  label: string;
  color: string;
  bg: string;
}

export const TASK_THEMES: TaskTheme[] = [
  { id: 'bug', label: 'Bug', color: '#E8526A', bg: '#FFF1F3' },
  { id: 'mobile', label: 'Mobile', color: '#6C63FF', bg: '#EEEEFF' },
  { id: 'frontend', label: 'Frontend', color: '#F5A623', bg: '#FFF9EC' },
  { id: 'backend', label: 'Backend', color: '#2DC88E', bg: '#EDFBF5' },
  { id: 'design', label: 'Design', color: '#E870C0', bg: '#FEF0F8' },
  { id: 'devops', label: 'DevOps', color: '#4A90D9', bg: '#EBF5FF' },
];

export const DEFAULT_THEME_ID = 'mobile';

export function getTheme(id: string | null | undefined): TaskTheme {
  return TASK_THEMES.find(t => t.id === id) ?? TASK_THEMES[0];
}
