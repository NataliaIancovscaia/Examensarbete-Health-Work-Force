import { createContext } from "react";

export interface SearchFilter {
  title: string;
  location: string;
}

export interface Job {
  title: string;
  category: string;
  location: string;
  level: string;
  description: string;
}

export interface AppContextType {
  searchFilter: SearchFilter;
  setSearchFilter: React.Dispatch<React.SetStateAction<SearchFilter>>;
  isSearched: boolean;
  setIsSearched: React.Dispatch<React.SetStateAction<boolean>>;
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
}


export const AppContext = createContext<AppContextType | null>(null);


