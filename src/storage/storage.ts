import localforage from 'localforage';
import type { Travel } from '../types';

const TRAVELS_KEY = 'travels';

export const saveTravels = async (travels: Travel[]) => {
  await localforage.setItem<Travel[]>(TRAVELS_KEY, travels);
};

export const loadTravels = async (): Promise<Travel[] | null> => {
  const travels = await localforage.getItem<Travel[]>(TRAVELS_KEY);
  return travels;
};