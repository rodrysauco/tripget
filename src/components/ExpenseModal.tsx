import { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import Modal from "./Modal";
import type { Expense } from "../types";

const ExpenseModal: React.FC<{
  handleSave: (expense: Expense, date: string) => void;
}> = ({ handleSave }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={openModal}
        className="bg-green-600 w-[65px] h-[65px] text-white text-[36px] rounded"
      >
        +
      </button>

      {isOpen && (
        <Modal onClose={closeModal}>
          <ExpenseForm onSave={handleSave} closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
};

export default ExpenseModal;
