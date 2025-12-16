import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  AppContext,
  type AppContextType,
  type Application,
  type Company,
  type Job,
  type Recruiter,
  type SearchFilter,
   type User,
} from "./AppContext";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";


interface AppProviderProps {
  children: React.ReactNode;
}

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
 
  const [searchFilter, setSearchFilter] = useState<SearchFilter>({
    title: "",
    location: "",
  });
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState<boolean>(false);
  const [recruiter, setRecruiter] = useState<Recruiter | null>(null);

  const [companyToken, setCompanyToken] = useState<string | null>(null);
  const [companyData, setCompanyData] = useState<Company | null>(null);

  const [userData, setUserData] = useState<User| null>(null);
  const [userApplications, setUserApplications] = useState<Application[]>([]);

  const { user } = useUser();
  const { getToken } = useAuth();

  const logoutRecruiter = () => setRecruiter(null);

  
 const fetchUserData = useCallback(async () => {
  try {
    const token = await getToken();
    const { data } = await axios.get(`${backendUrl}/api/users/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (data.success) {
      setUserData(data.user);
    } else {
      console.warn(data.message);
    }
  } catch (error) {
    console.error("Failed to get user:", error);
  }
}, [getToken]);

 const fetchUsersApplications=useCallback(async()=>{
  try {
    const token=await getToken();

    const{data}=await axios.get(backendUrl+'/api/users/applications',
    {headers:{Authorization:`Bearer ${token}`}}
    );
    if (data.success) {
          setUserApplications(data.applications);
        } else {
          alert(data.message);
        }

  } catch (err) {
        console.error("Failed to fetch usersData:", err);
      }
}, [getToken]);

useEffect(() => {
  if (!user) return;
  
  (async () => {
    try {
      await Promise.all([fetchUserData(), fetchUsersApplications()]);
    } catch (err) {
      console.error(err);
    }
  })();
}, [user, fetchUserData, fetchUsersApplications]);



  
  useEffect(() => {
    const isMounted = { current: true };
    const init = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/jobs`);
        if (data.success && isMounted.current) setJobs(data.jobs);
        else console.warn(data.message);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      }

      const storedToken = localStorage.getItem("companyToken");
      if (storedToken && isMounted.current) setCompanyToken(storedToken);
    };
    init();
    return () => {
      isMounted.current = false;
    };
  }, []);

 
  useEffect(() => {
    if (!companyToken) return;
    const isMounted = { current: true };

    const fetchCompanyData = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/company/company`, {
          headers: { token: companyToken },
        });
        if (data.success && isMounted.current) setCompanyData(data.company);
        else console.warn(data.message);
      } catch (err) {
        console.error("Failed to fetch companyData:", err);
      }
    };

    fetchCompanyData();
    return () => {
      isMounted.current = false;
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
      userData,
      setUserData,
      userApplications,
      setUserApplications,
      backendUrl,
        fetchUserData, 
        fetchUsersApplications
    }),
    [
      searchFilter,
      isSearched,
      jobs,
      showRecruiterLogin,
      recruiter,
      companyToken,
      companyData,
      userData,
      userApplications,
        fetchUserData, 
        fetchUsersApplications
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};


