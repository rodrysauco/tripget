import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
  useEffect,
  useState,
} from "react";
import { saveTravels, loadTravels } from "../storage/storage";

import type { Expense, Travel } from "../types";

type State = {
  travels: Travel[];
  selectedTravelID: string | undefined;
};

type Action =
  | { type: "ADD_TRAVEL"; payload: Travel }
  | { type: "ADD_EXPENSE"; travelId: string; dayDate: string; expense: Expense }
  | { type: "ENSURE_DAY"; travelId: string; dayDate: string }
  | { type: "LOAD_TRAVELS"; payload: Travel[] }
  | { type: "SELECT_TRAVEL"; payload: string };

const TravelContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
  isLoaded: boolean;
} | null>(null);

const initialState: State = {
  travels: [],
  selectedTravelID: undefined,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOAD_TRAVELS":
      return { ...state, travels: action.payload };

    case "ADD_TRAVEL":
      return { ...state, travels: [...state.travels, action.payload] };

    case "ENSURE_DAY":
      return {
        ...state,
        travels: state.travels.map((travel) => {
          if (travel.id !== action.travelId) return travel;

          const dayExists = travel.days.find((d) => d.date === action.dayDate);
          const newEndDate = travel.endDate
            ? action.dayDate > travel.endDate
              ? action.dayDate
              : travel.endDate
            : action.dayDate;

          if (dayExists) {
            return {
              ...travel,
              endDate: newEndDate,
            };
          }

          return {
            ...travel,
            days: [
              ...travel.days,
              { date: action.dayDate, expenses: [], totalAmount: 0 },
            ],
            endDate: newEndDate,
          };
        }),
      };

    case "ADD_EXPENSE":
      return {
        ...state,
        travels: state.travels.map((travel) => {
          if (travel.id !== action.travelId) return travel;

          return {
            ...travel,
            days: travel.days.map((day) => {
              if (day.date !== action.dayDate) return day;
              const newExpenses = [...day.expenses, action.expense];
              const totalAmount = newExpenses.reduce(
                (prev, exp) => prev + exp.amountUSD,
                0
              );
              return {
                ...day,
                expenses: newExpenses,
                totalAmount,
              };
            }),
          };
        }),
      };

    case "SELECT_TRAVEL":
      return {
        ...state,
        selectedTravelID: action.payload,
      };

    default:
      return state;
  }
}

export const TravelProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      const stored = await loadTravels();
      if (stored) {
        dispatch({ type: "LOAD_TRAVELS", payload: stored });
      }
      setIsLoaded(true);
    };
    load();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    saveTravels(state.travels);
  }, [isLoaded, state.travels]);
  return (
    <TravelContext.Provider value={{ state, dispatch, isLoaded }}>
      {children}
    </TravelContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTravelContext = () => {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error("useTravelContext must be used within a TravelProvider");
  }
  return context;
};
