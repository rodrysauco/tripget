import { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import Modal from "./Modal";

const ExpenseModal: React.FC = () => {
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
          <ExpenseForm afterSubmit={closeModal} />
        </Modal>
      )}
    </>
  );
};

export default ExpenseModal;
