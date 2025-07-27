import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTravelContext } from "../context/TravelContext";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import type { Expense } from "../types";
import { useEffect } from "react";

const schema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  amount: z.number().positive(),
  currency: z.enum(["USD", "CUSTOM"]),
  date: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

type ExpenseFormProps = {
  initialData?: Expense;
  onSave: (expense: Expense, date: string) => void;
  closeModal: () => void;
  editMode?: boolean;
};

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  closeModal,
  onSave,
  editMode = false,
  initialData,
}) => {
  const { id: travelId } = useParams<{ id: string }>();
  const { state } = useTravelContext();
  const travel = state.travels.find((t) => t.id === travelId);
  const { customCurrency, conversionRate } = travel!.dailyBudget;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      currency: "USD",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        description: initialData.description,
        currency: initialData.currency === "USD" ? "USD" : "CUSTOM",
        amount:
          initialData.currency === "USD"
            ? initialData.amountUSD
            : initialData.amountOriginal,
      });
    }
  }, [initialData, reset]);

  const amount = watch("amount") || 0;
  const currency = watch("currency");

  const amountUSD = currency === "USD" ? amount : amount / conversionRate;

  const converted = currency === "USD" ? amount * conversionRate : amountUSD;

  const onSubmit = (data: FormData) => {
    if (!travelId) return;

    const expense = {
      id: initialData ? initialData.id : uuidv4(),
      title: data.title,
      description: data.description,
      amountUSD:
        data.currency === "USD" ? data.amount : data.amount / conversionRate,
      amountOriginal: data.amount,
      currency: data.currency,
    } as Expense;
    onSave(expense, data.date);
    reset();
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <input
        placeholder="Título"
        {...register("title")}
        className="border p-2 w-full"
      />
      {errors.title && <p className="text-red-500">Requerido</p>}

      <input
        placeholder="Descripción"
        {...register("description")}
        className="border p-2 w-full"
      />

      <input
        type="date"
        disabled={editMode}
        {...register("date")}
        className="border p-2 w-full"
      />
      {errors.date && <p className="text-red-500">Fecha requerida</p>}

      <input
        placeholder="Monto"
        type="number"
        step=".01"
        {...register("amount", { valueAsNumber: true })}
        className="border p-2 w-full"
      />
      {errors.amount && <p className="text-red-500">Monto inválido</p>}

      <select {...register("currency")} className="border p-2 w-full">
        <option value="USD">USD</option>
        <option value="CUSTOM">{customCurrency}</option>
      </select>

      <div className="p-2 bg-gray-100 rounded text-sm text-center">
        {currency === "USD" ? (
          <p>
            {amount} USD ≈ {converted.toFixed(2)} {customCurrency}
          </p>
        ) : (
          <p>
            {amount} {customCurrency} ≈ {converted.toFixed(2)} USD
          </p>
        )}
      </div>

      <div className="flex justify-around items-center">
        <button
          onClick={closeModal}
          type="button"
          className="bg-gray-400 text-white px-4 py-2"
        >
          Cancelar
        </button>
        <button type="submit" className="bg-green-500 text-white px-4 py-2">
          Guardar
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
