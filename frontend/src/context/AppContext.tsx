import { createContext } from 'react';

export interface SearchFilter {
  title: string;
  location: string;
}

export interface Company {
  _id: string;
  name: string;
  email: string;
  image?: string;
}

export interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  level: string;
  salary: string;
  date: number;
  visible: boolean;
  companyId: Company;
  applicants?: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  resume?: string;
  image?: string;
}

export interface Application {
  _id: string;
  userId: User;
  companyId: Company;
  jobId: Job;
  status: 'Pending' | 'Accepted' | 'Rejected';
  date: number;
}

export interface Recruiter {
  id: string;
  name: string;
  email: string;
  company: string;
  image?: string;
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

  userData: User | null;
  setUserData: React.Dispatch<React.SetStateAction<User | null>>;

  userApplications: Application[];
  setUserApplications: React.Dispatch<React.SetStateAction<Application[]>>;

  fetchUserData: () => Promise<void>;
  fetchUsersApplications: () => Promise<void>;
}

export const AppContext = createContext<AppContextType | null>(null);
