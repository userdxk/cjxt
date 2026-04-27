export interface Batch {
  id: string;
  date: string;
  startTime: string;
  breed: string;
  totalCount: number;
  femaleCount: number;
  maleCount: number;
  status: 'In Progress' | 'Completed' | 'Processing';
  precision: number;
  operator: string;
}

export type ViewType = 'dashboard' | 'workbench' | 'batches' | 'reports';

export interface Stats {
  totalIdentified: number;
  yieldRatio: string;
  avgConfidence: number;
  activeBatches: number;
  sortingSpeed: number;
}
