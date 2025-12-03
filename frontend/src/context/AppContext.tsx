import { createContext } from "react";

export interface SearchFilter {
  title: string;
  location: string;
}

export interface Job {
  id: string;
  title: string;
  category: string;
  location: string;
  level: string;
  description: string;
  salary: number;
  date: number;
  companyId: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
}
export interface Recruiter {
  id: string;
  name: string;
  email: string;
  company: string;
  image: string;
}
export interface AppContextType {
  searchFilter: SearchFilter;
  setSearchFilter: React.Dispatch<React.SetStateAction<SearchFilter>>;
  isSearched: boolean;
  setIsSearched: React.Dispatch<React.SetStateAction<boolean>>;
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  showRecruiterLogin: boolean;
  setShowRecruiterLogin: React.Dispatch<React.SetStateAction<boolean>>;
  recruiter: Recruiter | null;
  setRecruiter: React.Dispatch<React.SetStateAction<Recruiter | null>>;
  logoutRecruiter: () => void;
}


export const AppContext = createContext<AppContextType | null>(null);


