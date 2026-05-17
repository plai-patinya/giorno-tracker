import { create } from "zustand";

const useExpenseStore = create((set) => ({

  expenses: [],

  setExpenses: (expenses) =>
    set({ expenses })

}));

export default useExpenseStore;