import { v4 as uuid } from 'uuid';

export enum ReportType {
  INCOME = 'income',
  EXPENSE = 'expense',
}
export interface ReportData {
  report: {
    id: string;
    source: string;
    amount: number;
    created_at: Date;
    updated_at: Date;
    type: ReportType;
  }[];
}

export const data: ReportData = {
  report: [
    {
      id: uuid(),
      source: 'Salary',
      amount: 7500,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.INCOME,
    },
    {
      id: uuid(),
      source: 'Rent',
      amount: 7500,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.EXPENSE,
    },
    {
      id: uuid(),
      source: 'Options Trading',
      amount: 7500,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.INCOME,
    },
  ],
};
