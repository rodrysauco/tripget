import { useState } from "react";
import { useTravelContext } from "../context/TravelContext";
import type { Expense } from "../types";
import Modal from "./Modal";
import ExpenseForm from "./ExpenseForm";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

const Footer: React.FC = () => {
  const { state, dispatch } = useTravelContext();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const handleSubmit = (expense: Expense, date: string) => {
    dispatch({
      type: "ENSURE_DAY",
      travelId: state.selectedTravelID!,
      dayDate: date,
    });
    dispatch({
      type: "ADD_EXPENSE",
      travelId: state.selectedTravelID!,
      dayDate: date,
      expense,
    });
  };
  const actualTravel = state.travels.find(
    (travel) => travel.id === state.selectedTravelID
  );

  return (
    <div className="w-full fixed z-50 bottom-0 left-0 p-5 right-0 flex justify-between bg-slate-100 border-t border-slate-300">
      <div className="font-semibold">{actualTravel?.name}</div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <button
          onClick={openModal}
          className="bg-green-600 w-[65px] h-[65px] text-white text-[36px] rounded"
        >
          <PlusCircleIcon className="w-5 h-5"/>
        </button>
      </div>
      <div className="font-semibold">
        Total: $
        {actualTravel?.days
          .reduce((prev, act) => prev + act.totalAmount, 0)
          .toFixed(2)}
      </div>
      {isOpen && (
        <Modal onClose={closeModal}>
          <ExpenseForm onSave={handleSubmit} closeModal={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default Footer;
