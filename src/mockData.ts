import { Batch, Stats } from './types';

export const MOCK_STATS: Stats = {
  totalIdentified: 1284092,
  yieldRatio: '51.2%',
  avgConfidence: 98.4,
  activeBatches: 14,
  sortingSpeed: 4200,
};

export const MOCK_BATCHES: Batch[] = [
  {
    id: '#B2023-9942',
    date: 'Oct 24, 2023',
    startTime: '14:20 PM',
    breed: 'Rhode Island Red',
    totalCount: 5000,
    femaleCount: 2600,
    maleCount: 2400,
    status: 'In Progress',
    precision: 99.2,
    operator: 'Admin_Chen',
  },
  {
    id: '#B2023-9941',
    date: 'Oct 24, 2023',
    startTime: '11:05 AM',
    breed: 'Leghorn White',
    totalCount: 12500,
    femaleCount: 6125,
    maleCount: 6375,
    status: 'Completed',
    precision: 98.7,
    operator: 'Admin_Chen',
  },
  {
    id: '#B2023-9939',
    date: 'Oct 23, 2023',
    startTime: '09:15 AM',
    breed: 'Sussex Hybrid',
    totalCount: 8200,
    femaleCount: 4100,
    maleCount: 4100,
    status: 'Completed',
    precision: 99.5,
    operator: 'System_Auto',
  },
  {
    id: '#B2023-9938',
    date: 'Oct 23, 2023',
    startTime: '16:44 PM',
    breed: 'Plymouth Rock',
    totalCount: 4150,
    femaleCount: 2199,
    maleCount: 1951,
    status: 'Completed',
    precision: 99.1,
    operator: 'Admin_Chen',
  }
];

export const TRENDS_DATA = [
  { time: '08:00', throughput: 2100 },
  { time: '10:00', throughput: 3400 },
  { time: '12:00', throughput: 6200 },
  { time: '14:00', throughput: 4800 },
  { time: '16:00', throughput: 5600 },
  { time: '18:00', throughput: 3200 },
  { time: '20:00', throughput: 6800 },
];
