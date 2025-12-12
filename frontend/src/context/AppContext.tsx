import { createContext } from "react";

export interface SearchFilter {
  title: string;
  location: string;
}

export interface Company {
  id: string;
  name: string;
  email: string;
  image: string;
}

export interface Job {
  _id: string;
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

   applicants: number;
   visible: boolean;
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

  backendUrl: string;

  companyToken: string | null;
  setCompanyToken: React.Dispatch<React.SetStateAction<string | null>>;

  companyData: Company | null;
 setCompanyData: React.Dispatch<React.SetStateAction<Company | null>>;
}


export const AppContext = createContext<AppContextType | null>(null);


