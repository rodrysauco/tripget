import { useState } from "react";
import TravelForm from "./TravelForm";

const TravelModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={openModal}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Agregar Viaje
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="absolute inset-0" onClick={closeModal} />

          <div className="relative w-[90%] flex flex-col justify-center items-center bg-white p-6 rounded-lg w-full max-w-md z-50">
            <TravelForm afterSubmit={closeModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default TravelModal;
