import type { Expense, Day } from "../types";

const ExpenseList: React.FC<{ day: Day }> = ({ day }) => {
  return (
    <div className="w-full flex justify-center items-center max-h-[calc(100vh-265px)] overflow-y-auto">
      <div className="w-[90%]">
        {day.expenses.length === 0 ? (
          <p>No hay gastos registrados.</p>
        ) : (
          <ul className="w-full space-y-2">
            {day.expenses.map((exp: Expense) => (
              <li key={exp.id} className="border p-2 rounded flex justify-between items-center">
                <p className="font-bold">{exp.title}</p>
                {exp.description && <p>{exp.description}</p>}
                <p>${exp.amountUSD.toFixed(2)}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
