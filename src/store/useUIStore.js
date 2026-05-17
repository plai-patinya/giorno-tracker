import { create } from "zustand";

const useUIStore = create((set) => ({

  // 📱 Current View
  view: "dashboard",

  setView: (view) =>
    set({ view }),

  // 🔍 Search
  searchTerm: "",

  setSearchTerm: (searchTerm) =>
    set({ searchTerm }),

  // ⏳ Loading
  loading: true,

  setLoading: (loading) =>
    set({ loading })

}));

export default useUIStore;