import { useNavigate, useParams } from "react-router-dom";
import { useTravelContext } from "../context/TravelContext";
import DayList from "../components/DayList";
import { useEffect } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const TravelDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useTravelContext();
  const travel = state.travels.find((travel) => travel.id === id)!;

  const navigate = useNavigate();
  const handleNavigate = (dayDate: string) => {
    navigate(`/travels/${id}/day/${dayDate}`);
  };

  const goBack = () => {
    navigate("/");
  };

  const totalGastado = travel?.days.reduce(
    (prev, act) => prev + act.totalAmount,
    0
  );

  useEffect(() => {
    if (travel) {
      dispatch({ type: "SELECT_TRAVEL", payload: travel.id! });
    }
  }, [travel, dispatch]);
  const presupuesto = travel?.days.length * travel?.dailyBudget.USD;
  const total = presupuesto - totalGastado;

  if (!travel) {
    return <div>No se ha encontrado el viaje</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <button
        className="self-start p-1 m-2 text-[14px] flex gap-1 border border-slate-400 rounded text-slate-400"
        onClick={goBack}
      >
        {" "}
        <ArrowLeftIcon className="w-5 h-5" />
        Volver
      </button>
      <div className="flex gap-1">
        <p>Dias: {travel.days.length} Balance:</p>
        <p
          className={`${
            total > 0 ? "mb-2 text-green-600" : "mb-2 text-red-600"
          }`}
        >
          {total.toFixed(2)}
        </p>
      </div>
      <DayList days={travel?.days} goToDay={handleNavigate} />
    </div>
  );
};

export default TravelDetails;
