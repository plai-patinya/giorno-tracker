import { create } from "zustand";

const useUIStore = create((set) => ({

  // 📱 Current View
  view: "dashboard",

  setView: (view) =>
    set({ view: (view || "dashboard").toLowerCase() }),

  // 🔍 Search
  searchTerm: "",

  setSearchTerm: (searchTerm) =>
    set({ searchTerm }),

  // ⏳ Loading
  loading: false,

  setLoading: (loading) =>
    set({ loading })

}));

export default useUIStore;