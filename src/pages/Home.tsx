import { useNavigate } from "react-router-dom";
import TravelList from "../components/TravelList";
import TravelModal from "../components/TravelModal";
import { useTravelContext } from "../context/TravelContext";

const Home: React.FC = () => {
  const { state } = useTravelContext();
  const navigate = useNavigate();
  const handleGoToTravel = (id: string) => {
    navigate(`travels/${id}`);
  };
  return (
    <div className=" mt-4 flex flex-col items-center gap-4">
      <TravelList travels={state.travels} goToTravel={handleGoToTravel} />
      <TravelModal />
    </div>
  );
};

export default Home;
