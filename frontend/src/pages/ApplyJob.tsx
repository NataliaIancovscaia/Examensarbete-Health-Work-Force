import { useContext } from "react";
import { useParams } from "react-router";
import { AppContext, type Job } from "../context/AppContext";
import Loading from "../components/Loading";
import NavigationBar from "../components/NavigationBar";
import { assets } from "../assets/images/assets";
import moment from "moment";
import "../assets/scss/ApplyJob.scss";
import JobCard from "../components/JobCard";

const ApplyJob: React.FC = () => {
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("ApplyJob must be used inside AppProvider");

  const { id } = useParams<{ id: string }>();
  const { jobs } = appContext;

  const jobData: Job | undefined = jobs.find(job => job.id === id);
  if (!jobData) return <Loading />;

 
  const similarJobs = jobs
    .filter(job => job.id !== jobData.id && job.companyId.id === jobData.companyId.id)
    .slice(0, 3);

  return (
    <>
      <NavigationBar />

      <main className="apply-job">
      
        <section className="apply-job__header">
          <img src={jobData.companyId.image} alt="Company Icon" />
          <h1>{jobData.title}</h1>

          <div className="apply-job__header-tags">
            <span><img src={assets.suitcase_icon} alt="" />{jobData.companyId.name}</span>
            <span><img src={assets.location_icon} alt="" />{jobData.location}</span>
            <span><img src={assets.person_icon} alt="" />{jobData.level}</span>
            <span><img src={assets.money_icon} alt="" />{jobData.salary} SEK</span>
          </div>

          <div className="apply-job__header-apply">
            <button className="apply-btn">Apply Now</button>
            <p className="posted">Posted {moment(jobData.date).fromNow()}</p>
          </div>
        </section>

      
        <section className="apply-job__content">
         
          <article className="apply-job__description">
            <h2>Job Description</h2>
            <div
              className="apply-job__description-text"
              dangerouslySetInnerHTML={{ __html: jobData.description }}
            />
            <button className="apply-btn">Apply Now</button>
          </article>

          
          {similarJobs.length > 0 && (
            <aside className="apply-job__sidebar">
              <h2>More similar {jobData.companyId.name} jobs</h2>
              <div className="apply-job__more-jobs-list">
                {similarJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </aside>
          )}
        </section>

       
        {similarJobs.length > 0 && (
          <section className="mobile-only">
            <h2>More similar {jobData.companyId.name} jobs</h2>
            <div className="apply-job__more-jobs-list">
              {similarJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default ApplyJob;






