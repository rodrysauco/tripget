import type { Expense, Day } from "../types";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

type ExpenseListProps = {
  day: Day;
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
};

const ExpenseList: React.FC<ExpenseListProps> = ({ day, onDelete, onEdit }) => {
  return (
    <div className="w-full flex justify-center max-h-[calc(100dvh-275px)] overflow-y-auto">
      {day.expenses.length === 0 ? (
        <div className="text-center">No hay gastos registrados.</div>
      ) : (
        <ul className="w-[90%] space-y-2">
          {day.expenses.map((exp: Expense) => (
            <li
              key={exp.id}
              className="border p-2 gap-3 rounded flex justify-between items-center"
            >
              <div className="flex grow-2 justify-between items-center">
                <p className="font-bold">{exp.title}</p>
                {exp.description && <p>{exp.description}</p>}
                <p>${exp.amountUSD.toFixed(2)}</p>
              </div>
              <div>
                <button
                  onClick={() => onEdit(exp)}
                  type="button"
                  className="text-blue-600 mr-1"
                >
                  <PencilSquareIcon className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(exp)}
                  className="text-red-600"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
