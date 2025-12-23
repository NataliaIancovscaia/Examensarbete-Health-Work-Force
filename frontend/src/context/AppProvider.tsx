import React, { useState, useMemo, useCallback } from 'react';
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

const rawBackendUrl = import.meta.env.VITE_BACKEND_URL;
if (!rawBackendUrl) {
  throw new Error('VITE_BACKEND_URL is not defined');
}
const backendUrl: string = rawBackendUrl;



const initAuthState = () => {
  const isFirstLoad = !sessionStorage.getItem('app_initialized');

  if (isFirstLoad) {
    sessionStorage.setItem('app_initialized', 'true');
    localStorage.removeItem('companyToken');
  }

  return {
    isFirstLoad,
    initialUserData: null as User | null,
    initialUserApplications: [] as Application[],
    initialRecruiter: null as Recruiter | null,
    initialCompanyToken: isFirstLoad ? null : localStorage.getItem('companyToken'),
    initialCompanyData: null as Company | null,
  };
};



export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const { initialUserData, initialUserApplications, initialRecruiter, initialCompanyToken, initialCompanyData } = initAuthState();

  const [searchFilter, setSearchFilter] = useState<SearchFilter>({ title: '', location: '' });
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState<boolean>(false);

  const [recruiter, setRecruiter] = useState<Recruiter | null>(initialRecruiter);
  const [companyToken, setCompanyToken] = useState<string | null>(initialCompanyToken);
  const [companyData, setCompanyData] = useState<Company | null>(initialCompanyData);

  const [userData, setUserData] = useState<User | null>(initialUserData);
  const [userApplications, setUserApplications] = useState<Application[]>(initialUserApplications);

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


  const fetchUserData = useCallback(async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get<GetUserResponse>(`${backendUrl}/api/users/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) setUserData(data.user);
      else console.warn(data.message);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error('Failed to get user:', message);
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
      else console.warn(data.message);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error('Failed to fetch user applications:', message);
    }
  }, [getToken]);

  React.useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        await Promise.all([fetchUserData(), fetchUsersApplications()]);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [user, fetchUserData, fetchUsersApplications]);

 

  React.useEffect(() => {
    let isMounted = true;

    const init = async () => {
      try {
        const { data } = await axios.get<GetJobsResponse>(`${backendUrl}/api/jobs`);
        if (data.success && isMounted) setJobs(data.jobs);
        else console.warn(data.message);
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error('Failed to fetch jobs:', message);
      }

      const storedToken = localStorage.getItem('companyToken');
      if (storedToken && isMounted) setCompanyToken(storedToken);
    };

    init();

    return () => {
      isMounted = false;
    };
  }, []);



  React.useEffect(() => {
    if (!companyToken) return;

    let isMounted = true;

    const fetchCompanyData = async () => {
      try {
        const { data } = await axios.get<GetCompanyResponse>(
          `${backendUrl}/api/company/company`,
          { headers: { token: companyToken } },
        );

        if (data.success && isMounted) setCompanyData(data.company);
        else console.warn(data.message);
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error('Failed to fetch company data:', message);
      }
    };

    fetchCompanyData();

    return () => {
      isMounted = false;
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
      fetchUsersApplications,
      resetAuth,
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
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};



