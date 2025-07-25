export type Expense = {
  id: string;
  title: string;
  description?: string;
  amountUSD: number;
  amountOriginal: number;
  currency: string;
};

export type Day = {
  date: string;
  expenses: Expense[];
  totalAmount: number;
};

export type Travel = {
  id: string;
  name: string;
  startDate: string;
  endDate?: string;
  dailyBudget: {
    USD: number;
    customCurrency: string;
    conversionRate: number;
  };
  days: Day[];
};
