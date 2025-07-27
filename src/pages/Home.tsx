import { useNavigate } from "react-router-dom";
import TravelList from "../components/TravelList";
import { useTravelContext } from "../context/TravelContext";
import { useState } from "react";
import TravelForm from "../components/TravelForm";
import Modal from "../components/Modal";

const Home: React.FC = () => {
  const { state } = useTravelContext();
  const navigate = useNavigate();
  const handleGoToTravel = (id: string) => {
    navigate(`travels/${id}`);
  };
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <div className=" mt-4 flex flex-col items-center gap-4">
      <TravelList travels={state.travels} goToTravel={handleGoToTravel} />
      <button
        onClick={openModal}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Agregar Viaje
      </button>
      {isOpen && (
        <Modal onClose={closeModal}>
          <TravelForm afterSubmit={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default Home;
