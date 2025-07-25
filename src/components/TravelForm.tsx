import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTravelContext } from "../context/TravelContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const schema = z.object({
  name: z.string().min(1),
  startDate: z.string().min(1),
  dailyBudgetUSD: z.number().positive(),
  conversionRate: z.number().positive(),
  customCurrency: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

const TravelForm: React.FC<{ afterSubmit: () => void }> = ({ afterSubmit }) => {
  const { dispatch } = useTravelContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const dailyBudgetUSD = watch("dailyBudgetUSD") || 0;
  const conversionRate = watch("conversionRate") || 0;

  const onSubmit = (data: FormData) => {
    const newTravel = {
      id: uuidv4(),
      name: data.name,
      startDate: data.startDate,
      dailyBudget: {
        USD: data.dailyBudgetUSD,
        conversionRate: data.conversionRate,
        customCurrency: data.customCurrency.toUpperCase(),
      },
      days: [],
    };
    dispatch({ type: "ADD_TRAVEL", payload: newTravel });
    dispatch({ type: "SELECT_TRAVEL", payload: newTravel.id });
    navigate(`/travels/${newTravel.id}`);
    afterSubmit();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        placeholder="Nombre del viaje"
        {...register("name")}
        className="border p-2 w-full"
      />
      {errors.name && <p className="text-red-500">Requerido</p>}

      <input
        type="date"
        {...register("startDate")}
        placeholder="Fecha inicio"
        className="border p-2 w-full"
      />
      {errors.startDate && <p className="text-red-500">Requerido</p>}

      <input
        placeholder="Presupuesto diario USD"
        type="number"
        {...register("dailyBudgetUSD", { valueAsNumber: true })}
        className="border p-2 w-full"
      />
      {errors.dailyBudgetUSD && <p className="text-red-500">Requerido</p>}

      <input
        placeholder="Moneda custom (ARS, EUR, BRL...)"
        {...register("customCurrency")}
        className="border p-2 w-full"
      />
      {errors.customCurrency && <p className="text-red-500">Requerido</p>}

      <input
        placeholder="Cotización (1 USD equivale a...)"
        type="number"
        step=".01"
        {...register("conversionRate", { valueAsNumber: true })}
        className="border p-2 w-full"
      />
      {errors.conversionRate && <p className="text-red-500">Requerido</p>}

      {/* 👇 Preview calculado */}
      <div className="p-2 bg-gray-100 rounded text-center">
        <p className="text-sm text-gray-700">
          Presupuesto diario en{" "}
          {watch("customCurrency")?.toUpperCase() || "Moneda"}:{" "}
          <strong>{(dailyBudgetUSD * conversionRate).toFixed(2)}</strong>
        </p>
      </div>
      <div className="flex justify-around">
        <button
          onClick={afterSubmit}
          type="button"
          className="bg-gray-400 text-white px-4 py-2"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Crear Viaje
        </button>
      </div>
    </form>
  );
};

export default TravelForm;
