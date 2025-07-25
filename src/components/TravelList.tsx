import type { Travel } from "../types";

const TravelList: React.FC<{
  travels: Travel[];
  goToTravel: (id: string) => void;
}> = ({ travels, goToTravel }) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[90%]">
        {travels.length === 0 ? (
          <p>No hay viajes registrados</p>
        ) : (
          <ul className="w-full space-y-2">
            {travels.map((travel) => (
              <li
                key={travel.id}
                onClick={() => goToTravel(travel.id)}
                className="border p-2 rounded flex justify-between items-center"
              >
                <p>{travel.name}</p>
                <p>{travel.days.length} dias</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TravelList;
