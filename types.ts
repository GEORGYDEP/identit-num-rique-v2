
export enum LevelId {
  INTRO = 'intro',
  GROUPS = 'groups',
  IDENTITY = 'identity',
  TRACES = 'traces',
  RGPD = 'rgpd',
  SECURITY = 'security',
  CONCLUSION = 'conclusion'
}

export interface LevelProgress {
  id: LevelId;
  completed: boolean;
  score: number;
}

export interface DragItem {
  id: string;
  text: string;
  category: string;
}
