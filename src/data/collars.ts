export interface Collar {
  id: string;
  title: string;
  level: number;
  color: string;
  bg: string;
}

export const COLLARS: Collar[] = [
  { id: 'cto', title: 'CTO / Tech Lead', level: 1, color: '#6C63FF', bg: '#EEEEFF' },
  { id: 'pm', title: 'Project Manager', level: 2, color: '#E8526A', bg: '#FFF1F3' },
  { id: 'senior_mobile', title: 'Senior Mobile Developer', level: 3, color: '#F5A623', bg: '#FFF9EC' },
  { id: 'senior_sw', title: 'Senior Software Engineer', level: 3, color: '#2DC88E', bg: '#EDFBF5' },
  { id: 'junior_mobile', title: 'Junior Mobile Developer', level: 4, color: '#B0B0C8', bg: '#F5F5FA' },
];

export const DEFAULT_COLLAR_ID = 'junior_mobile';

export function getCollar(id: string | null | undefined): Collar {
  return COLLARS.find(c => c.id === id) ?? COLLARS[COLLARS.length - 1];
}
