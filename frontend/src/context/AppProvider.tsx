import React, { useEffect, useState, useMemo } from "react";
import {
  AppContext,
  type AppContextType,
  type Company,
  type Job,
  type Recruiter,
  type SearchFilter
} from "./AppContext";
import { jobsData } from "../assets/images/assets";
import axios from "axios";

interface AppProviderProps {
  children: React.ReactNode;
}

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [searchFilter, setSearchFilter] = useState<SearchFilter>({
    title: "",
    location: ""
  });

  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [jobs, setJobs] = useState<Job[]>(jobsData);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState<boolean>(false);
  const [recruiter, setRecruiter] = useState<Recruiter | null>(null);

  const [companyToken, setCompanyToken] = useState<string | null>(null);
  const [companyData, setCompanyData] = useState<Company | null>(null);


  const logoutRecruiter = () => setRecruiter(null);


  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/jobs`);
        if (data.success) setJobs(data.jobs);
        else alert(data.message);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      }

      const storedToken = localStorage.getItem("companyToken");
      if (storedToken) setCompanyToken(storedToken);
    };

    init();
  }, []); 
  useEffect(() => {
    if (!companyToken) return;

    let active = true;

    const fetchCompanyData = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/company/company`, {
          headers: { token: companyToken }
        });

        if (!active) return;
        if (data.success) setCompanyData(data.company);
        else alert(data.message);
      } catch (err) {
        console.error("Failed to fetch companyData:", err);
      }
    };

    fetchCompanyData();
    return () => {
      active = false; 
    };
  }, [companyToken]); 


  const value: AppContextType = useMemo(
    () => ({
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
    }),
    [
      searchFilter,
      isSearched,
      jobs,
      showRecruiterLogin,
      recruiter,
      companyToken,
      companyData
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};


