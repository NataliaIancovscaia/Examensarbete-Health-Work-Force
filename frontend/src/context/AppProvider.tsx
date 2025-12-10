import React, { useState } from "react";
import { AppContext, type AppContextType, type Company, type Job, type Recruiter, type SearchFilter} from "./AppContext";
import { jobsData } from "../assets/images/assets";


interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [searchFilter, setSearchFilter] = useState<SearchFilter>({
    title: "",
    location: "",
  });
  const backendUrl=import.meta.env.VITE_BACKEND_URL;
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [jobs, setJobs] = useState<Job[]>(jobsData); 
  const[showRecruiterLogin,setShowRecruiterLogin]=useState<boolean>(false);
  const [recruiter, setRecruiter] = useState<Recruiter | null>(null);
  const logoutRecruiter = () => setRecruiter(null);

const [companyToken, setCompanyToken] = useState<string | null>(null);
const [companyData, setCompanyData] = useState<Company | null>(null);
  const value: AppContextType = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    showRecruiterLogin,
    setShowRecruiterLogin,
     recruiter,
    setRecruiter,
    logoutRecruiter,
    companyToken,
    setCompanyToken,
    companyData,
    setCompanyData,
    backendUrl

  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

