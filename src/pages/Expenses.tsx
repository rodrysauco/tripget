import { useTravelContext } from "../context/TravelContext";
import { useNavigate, useParams } from "react-router-dom";
import ExpenseList from "../components/ExpensesList";
import { formatDate } from "date-fns";
import type { Expense } from "../types";
import { useState } from "react";
import Modal from "../components/Modal";
import ExpenseForm from "../components/ExpenseForm";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const Expenses: React.FC = () => {
  const { id: id, dayDate: dayDate } = useParams<{
    id: string;
    dayDate: string;
  }>();
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const { state, dispatch } = useTravelContext();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(`/travels/${id}`);
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
  };

  const handleDelete = (expense: Expense) => {
    dispatch({
      type: "DELETE_EXPENSE",
      travelId: id!,
      dayDate: dayDate!,
      expenseId: expense.id,
    });
  };

  const travel = state.travels.find((t) => t.id === id);
  if (!travel) return <p>Viaje no encontrado</p>;
  const day = travel.days.find((d) => d.date === dayDate);
  if (!day) return <p>Día no encontrado</p>;
  const rest = travel.dailyBudget.USD - day.totalAmount;
  const message =
    rest > 0
      ? `Te quedan $${rest.toFixed(2)}`
      : rest === 0
      ? "Gastaste tu presupuesto"
      : `Te excediste $${rest.toFixed(2)}`;

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <button
        className="self-start p-1 m-2 flex gap-1 text-[14px] border border-slate-400 rounded text-slate-400"
        onClick={goBack}
      >
        <ArrowLeftIcon className="w-5 h-5"/> Volver
      </button>
      <h2 className="text-xl font-bold mb-2">
        {formatDate(dayDate!, "dd-MM-y")}
      </h2>
      <h3>Llevas gastado: ${day.totalAmount.toFixed(2)}</h3>
      <h3 className={rest > 0 ? "mb-2 text-green-600" : "mb-2 text-red-600"}>
        {message}
      </h3>

      <ExpenseList onEdit={handleEdit} onDelete={handleDelete} day={day} />
      {editingExpense && (
        <Modal onClose={() => setEditingExpense(null)}>
          <ExpenseForm
            editMode={true}
            initialData={editingExpense}
            onSave={(updatedExpense, date) =>
              dispatch({
                type: "UPDATE_EXPENSE",
                travelId: travel.id,
                dayDate: date,
                expense: updatedExpense,
              })
            }
            closeModal={() => setEditingExpense(null)}
          />
        </Modal>
      )}
    </div>
  );
};

export default Expenses;
