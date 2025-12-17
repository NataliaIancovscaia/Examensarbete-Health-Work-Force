import { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AppContext, type Job, type Application } from '../context/AppContext';

import NavigationBar from '../components/NavigationBar';
import { assets } from '../assets/images/assets';
import moment from 'moment';
import '../assets/scss/ApplyJob.scss';
import JobCard from '../components/JobCard';
import Footer from '../components/Footer';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';

interface ApplyJobResponse {
  success: boolean;
  message: string;
}

interface GetJobResponse {
  success: boolean;
  message: string;
  job: Job;
}

const ApplyJob: React.FC = () => {
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error('ApplyJob must be used inside AppProvider');

  const { id } = useParams<{ id: string }>();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const { jobs, backendUrl, userData, userApplications, setUserApplications } =
    appContext;

  const [jobData, setJobData] = useState<Job | null>(null);

  const applyHandler = async () => {
    try {
      if (!userData) return alert('Login to apply for jobs');
      if (!userData.resume) {
        navigate('/applications');
        return alert('Upload resume to apply');
      }

      if (!jobData) return;

      const token = await getToken();

      const { data } = await axios.post<ApplyJobResponse>(
        `${backendUrl}/api/users/apply`,
        { jobId: jobData._id },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      alert(data.message);

      if (data.success) {
        setUserApplications([
          ...userApplications,
          { jobId: jobData } as Application,
        ]);
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      alert(message);
      console.error(error);
    }
  };

  useEffect(() => {
    const getJob = async () => {
      try {
        const { data } = await axios.get<GetJobResponse>(
          `${backendUrl}/api/jobs/${id}`,
        );
        if (data.success) setJobData(data.job);
        else alert(data.message);
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : 'Unknown error';
        alert(message);
        console.error(error);
      }
    };

    getJob();
  }, [id, backendUrl]);

  const isAlreadyApplied = useMemo(() => {
    if (!jobData) return false;

    return userApplications.some((app) => {
      if (!app.jobId) return false;
      return typeof app.jobId === 'string'
        ? app.jobId === jobData._id
        : app.jobId._id === jobData._id;
    });
  }, [userApplications, jobData]);

  if (!jobData) return <div className="loading">Loading...</div>;

  // --- Похожие вакансии ---
  const appliedJobsIds = new Set(
    userApplications.map((app) =>
      typeof app.jobId === 'string' ? app.jobId : app.jobId?._id,
    ),
  );

  const similarJobs = jobs
    .filter(
      (job) =>
        job._id !== jobData._id && job.companyId._id === jobData.companyId._id,
    )
    .filter((job) => !appliedJobsIds.has(job._id))
    .slice(0, 3);

  return (
    <>
      <NavigationBar />

      <main className="apply-job">
        <section className="apply-job_header">
          <img src={jobData.companyId.image} alt="Company Icon" />
          <h1>{jobData.title}</h1>

          <div className="apply-job_header-tags">
            <span>
              <img src={assets.suitcase_icon} alt="" />
              {jobData.companyId.name}
            </span>
            <span>
              <img src={assets.location_icon} alt="" />
              {jobData.location}
            </span>
            <span>
              <img src={assets.person_icon} alt="" />
              {jobData.level}
            </span>
            <span>
              <img src={assets.money_icon} alt="" />
              {jobData.salary} SEK
            </span>
          </div>

          <div className="apply-job_header-apply">
            <button
              onClick={applyHandler}
              className="apply-btn"
              disabled={isAlreadyApplied}
            >
              {isAlreadyApplied ? 'Already applied' : 'Apply now'}
            </button>
            <p className="posted">Posted {moment(jobData.date).fromNow()}</p>
          </div>
        </section>

        <section className="apply-job_content">
          <article className="apply-job_description">
            <h2>Job Description</h2>
            <div
              className="apply-job_description-text"
              dangerouslySetInnerHTML={{ __html: jobData.description }}
            />
            <button
              onClick={applyHandler}
              className="apply-btn"
              disabled={isAlreadyApplied}
            >
              {isAlreadyApplied ? 'Already applied' : 'Apply now'}
            </button>
          </article>

          {similarJobs.length > 0 && (
            <aside className="apply-job_sidebar">
              <h2>More similar {jobData.companyId.name} jobs</h2>
              <div className="apply-job_more-jobs-list">
                {similarJobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            </aside>
          )}
        </section>

        {similarJobs.length > 0 && (
          <section className="mobile-only">
            <h2>More similar {jobData.companyId.name} jobs</h2>
            <div className="apply-job_more-jobs-list">
              {similarJobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
};

export default ApplyJob;
