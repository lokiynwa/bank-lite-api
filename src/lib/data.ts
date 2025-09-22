import { Account, Payment } from '../types/models';

export const accounts: Account[] = [
  { id: 'acc_1', name: 'Alice', balance: 1250.75, currency: 'GBP' },
  { id: 'acc_2', name: 'Bob', balance: 640.20, currency: 'GBP' },
  { id: 'acc_3', name: 'Carol', balance: 812.10, currency: 'EUR' }
];

export const payments: Payment[] = [];
