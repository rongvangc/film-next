import { getMovies } from "@/services/movie";
import { create } from "zustand";

interface AppState {
  showMobileDraw: boolean;
  loading: boolean;
  sidebarAction: string;
  page: number;
  moviesList: MovieList | null;
  setShowMobileDraw: (data: boolean) => void;
  setSidebarAction: (data: string, page: number) => void;
  setLoading: (data: boolean) => void;
  setPage: (data: number) => void;
}

const useAppStore = create<AppState>((set) => ({
  showMobileDraw: false,
  sidebarAction: "",
  page: 1,
  moviesList: null,
  loading: false,
  setPage: (data) =>
    set((state) => ({
      ...state,
      page: data,
    })),
  setLoading: (data) =>
    set((state) => ({
      ...state,
      loading: data,
    })),
  setShowMobileDraw: (data) =>
    set((state) => ({
      ...state,
      showMobileDraw: data,
    })),
  setSidebarAction: async (data, page) => {
    const movies = await getMovies(data, page);

    set((state) => ({
      ...state,
      moviesList: movies ?? null,
      sidebarAction: data,
      loading: false,
    }));
  },
}));

export default useAppStore;
