import { useTravelContext } from "../context/TravelContext";
import ExpenseModal from "./ExpenseModal";

const Footer: React.FC = () => {
  const { state } = useTravelContext();
  const actualTravel = state.travels.find(
    (travel) => travel.id === state.selectedTravelID
  );

  return (
    <div className="w-full fixed z-50 bottom-0 left-0 p-5 right-0 flex justify-between bg-slate-100 border-t border-slate-300">
      <div className="font-semibold">{actualTravel?.name}</div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <ExpenseModal />
      </div>
      <div className="font-semibold">
        Total: $
        {actualTravel?.days
          .reduce((prev, act) => prev + act.totalAmount, 0)
          .toFixed(2)}
      </div>
    </div>
  );
};

export default Footer;
