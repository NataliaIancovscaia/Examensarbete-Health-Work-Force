import { createContext } from "react";

export interface SearchFilter {
  title: string;
  location: string;
}

export interface AppContextType {
  searchFilter: SearchFilter;
  setSearchFilter: (value: SearchFilter) => void;
  isSearched: boolean;
  setIsSearched: (value: boolean) => void;
}

export const AppContext = createContext<AppContextType | null>(null);