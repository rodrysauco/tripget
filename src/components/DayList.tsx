import { formatDate } from "date-fns";
import type { Day } from "../types";

const DayList: React.FC<{ days: Day[]; goToDay: (date: string) => void }> = ({
  days,
  goToDay,
}) => {
  return (
    <div className="w-full flex justify-center max-h-[calc(100vh-210px)] overflow-y-auto">
      {days.length === 0 ? (
        <div className="text-center">No hay dias registrados</div>
      ) : (
        <ul className="w-[90%] space-y-2">
          {days.map((day) => (
            <li
              key={day.date}
              onClick={() => goToDay(day.date)}
              className="border p-2 rounded flex justify-between items-center"
            >
              <p className="font-bold">{formatDate(day.date, "dd-MM-y")}</p>
              <p>${day.totalAmount.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DayList;
