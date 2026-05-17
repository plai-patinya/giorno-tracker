import { create } from "zustand";

const useFuelStore = create((set) => ({

  fuelRecords: [],

  setFuelRecords: (fuelRecords) =>
    set({ fuelRecords })

}));

export default useFuelStore;