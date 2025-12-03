import React, { useState } from "react";
import { AppContext, type AppContextType, type Job, type Recruiter, type SearchFilter} from "./AppContext";
import { jobsData } from "../assets/images/assets";


interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [searchFilter, setSearchFilter] = useState<SearchFilter>({
    title: "",
    location: "",
  });

  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [jobs, setJobs] = useState<Job[]>(jobsData); 
  const[showRecruiterLogin,setShowRecruiterLogin]=useState<boolean>(false);
   const [recruiter, setRecruiter] = useState<Recruiter | null>(null);
  const logoutRecruiter = () => setRecruiter(null);
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
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

