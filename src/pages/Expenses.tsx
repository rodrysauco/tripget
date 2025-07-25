import { useTravelContext } from "../context/TravelContext";
import { useNavigate, useParams } from "react-router-dom";
import ExpenseList from "../components/ExpensesList";
import { formatDate } from "date-fns";

const Expenses: React.FC = () => {
  const { id: id, dayDate: dayDate } = useParams<{
    id: string;
    dayDate: string;
  }>();
  const { state } = useTravelContext();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(`/travels/${id}`);
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
        className="self-start p-1 m-2 text-[14px] border border-slate-400 rounded text-slate-400"
        onClick={goBack}
      >
        Volver
      </button>
      <h2 className="text-xl font-bold mb-2">
        {formatDate(dayDate!, "dd-MM-Y")}
      </h2>
      <h3>Llevas gastado: ${day.totalAmount.toFixed(2)}</h3>
      <h3 className={rest > 0 ? "mb-2 text-green-600" : "mb-2 text-red-600"}>
        {message}
      </h3>

      <ExpenseList day={day} />
    </div>
  );
};

export default Expenses;
