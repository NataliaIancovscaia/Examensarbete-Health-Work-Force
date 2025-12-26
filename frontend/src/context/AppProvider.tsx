import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  AppContext,
  type AppContextType,
  type Application,
  type Company,
  type Job,
  type Recruiter,
  type SearchFilter,
  type User,
} from './AppContext';
import axios from 'axios';
import { useAuth, useUser } from '@clerk/clerk-react';



interface GetUserResponse {
  success: boolean;
  message: string;
  user: User;
}

interface GetApplicationsResponse {
  success: boolean;
  message: string;
  applications: Application[];
}

interface GetJobsResponse {
  success: boolean;
  message: string;
  jobs: Job[];
}

interface GetCompanyResponse {
  success: boolean;
  message: string;
  company: Company;
}

interface AppProviderProps {
  children: React.ReactNode;
}



const backendUrl = import.meta.env.VITE_BACKEND_URL as string;
if (!backendUrl) throw new Error('VITE_BACKEND_URL is not defined');



export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {

  const [searchFilter, setSearchFilter] = useState<SearchFilter>({
    title: '',
    location: '',
  });
  const [isSearched, setIsSearched] = useState(false);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);


  const [jobs, setJobs] = useState<Job[]>([]);


  const [userData, setUserData] = useState<User | null>(null);
  const [userApplications, setUserApplications] = useState<Application[]>([]);


  const [recruiter, setRecruiter] = useState<Recruiter | null>(null);
  const [companyToken, setCompanyToken] = useState<string | null>(
    localStorage.getItem('companyToken'),
  );
  const [companyData, setCompanyData] = useState<Company | null>(null);

  const { user } = useUser();
  const { getToken } = useAuth();



  const resetAuth = useCallback(() => {
    setUserData(null);
    setUserApplications([]);
    setRecruiter(null);
    setCompanyData(null);
    setCompanyToken(null);
    localStorage.removeItem('companyToken');
  }, []);

  const logoutRecruiter = () => setRecruiter(null);


  const fetchJobs = useCallback(async () => {
    try {
      const { data } = await axios.get<GetJobsResponse>(
        `${backendUrl}/api/jobs`,
      );
      if (data.success) setJobs(data.jobs);
    } catch {
      console.error('Failed to fetch jobs');
    }
  }, []);

  const fetchUserData = useCallback(async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get<GetUserResponse>(
        `${backendUrl}/api/users/user`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (data.success) setUserData(data.user);
    } catch (err) {
      console.error('Failed to fetch user data', err);
    }
  }, [getToken]);

  const fetchUsersApplications = useCallback(async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get<GetApplicationsResponse>(
        `${backendUrl}/api/users/applications`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (data.success) setUserApplications(data.applications);
    } catch (err) {
      console.error('Failed to fetch applications', err);
    }
  }, [getToken]);

  
 useEffect(() => {
  let active = true;

  (async () => {
    try {
      const { data } = await axios.get<GetJobsResponse>(
        `${backendUrl}/api/jobs`,
      );

      if (data.success && active) {
        setJobs(data.jobs);
      }
    } catch (error) {
      console.error('Failed to fetch jobs', error);
    }
  })();

  return () => {
    active = false;
  };
}, []);


 
  useEffect(() => {
    if (!user) return;

    let active = true;

    (async () => {
      try {
        const token = await getToken();

        const [userRes, appsRes] = await Promise.all([
          axios.get<GetUserResponse>(`${backendUrl}/api/users/user`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get<GetApplicationsResponse>(
            `${backendUrl}/api/users/applications`,
            { headers: { Authorization: `Bearer ${token}` } },
          ),
        ]);

        if (!active) return;

        if (userRes.data.success) setUserData(userRes.data.user);
        if (appsRes.data.success)
          setUserApplications(appsRes.data.applications);
      } catch (err) {
        console.error('Failed to load user state', err);
      }
    })();

    return () => {
      active = false;
    };
  }, [user, getToken]);

  
  useEffect(() => {
    if (!companyToken) return;

    let active = true;

    (async () => {
      try {
        const { data } = await axios.get<GetCompanyResponse>(
          `${backendUrl}/api/company/company`,
          { headers: { token: companyToken } },
        );

        if (data.success && active) setCompanyData(data.company);
      } catch (err) {
        console.error('Failed to fetch company data', err);
      }
    })();

    return () => {
      active = false;
    };
  }, [companyToken]);

  

  const updateJobInContext = useCallback(
    async (updatedJob: Job) => {
      if (!updatedJob.visible) {
        setJobs((prev) => prev.filter((j) => j._id !== updatedJob._id));
        return;
      }
      fetchJobs();
    },
    [fetchJobs],
  );

 

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
      fetchUsersApplications,
      resetAuth,
      updateJobInContext,
      fetchJobs,
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
      fetchUsersApplications,
      resetAuth,
      updateJobInContext,
      fetchJobs,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

