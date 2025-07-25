import { formatDate } from "date-fns";
import type { Day } from "../types";

const DayList: React.FC<{ days: Day[]; goToDay: (date: string) => void }> = ({
  days,
  goToDay,
}) => {
  return (
    <div className="w-full flex justify-center items-center max-h-[calc(100vh-185px)] overflow-y-auto">
      <div className="w-[90%]">
        {days.length === 0 ? (
          <p>No hay dias registrados</p>
        ) : (
          <ul className="w-full space-y-2">
            {days.map((day) => (
              <li
                key={day.date}
                onClick={() => goToDay(day.date)}
                className="border p-2 rounded flex justify-between items-center"
              >
                <p className="font-bold">{formatDate(day.date, "dd-MM-Y")}</p>
                <p>${day.totalAmount.toFixed(2)}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DayList;
