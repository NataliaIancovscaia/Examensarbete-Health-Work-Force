import { useContext } from "react";
import { useParams } from "react-router";
import { AppContext, type Job } from "../context/AppContext";
import Loading from "../components/Loading";
import NavigationBar from "../components/NavigationBar";
import { assets } from "../assets/images/assets";
import moment from "moment";

const ApplyJob: React.FC = () => {
  const appContext = useContext(AppContext);
  if (!appContext) {
    throw new Error("ApplyJob must be used inside AppProvider");
  }

  const { id } = useParams<{ id: string }>();
  const { jobs } = appContext;

  const JobData: Job | undefined = jobs.find((job) => job.id === id);
  if (!JobData) return <Loading />;

  return (
    <>
      <NavigationBar />

      <div className="apply-job">

      
        <div className="apply-job__header">
          <img src={JobData.companyId.image} alt="Company Icon" />

          <h1>{JobData.title}</h1>

          <div className="apply-job__header-tags">
            <span>
              <img src={assets.suitcase_icon} alt="Suitcase Icon" />
              {JobData.companyId.name}
            </span>

            <span>
              <img src={assets.location_icon} alt="Location Icon" />
              {JobData.location}
            </span>

            <span>
              <img src={assets.person_icon} alt="Person Icon" />
              {JobData.level}
            </span>

            <span>
              <img src={assets.money_icon} alt="Money Icon" />
              {JobData.salary} SEK
            </span>
          </div>

         
          <div className="apply-job__header-apply">
            <button className="apply-btn">Apply Now</button>
            <p className="posted">Posted {moment(JobData.date).fromNow()}</p>
          </div>
        </div>

       
        <div className="apply-job__description">
          <h2>Job Description</h2>

          <div
            className="apply-job__description-text"
            dangerouslySetInnerHTML={{ __html: JobData.description }}
          ></div>

          
          <button className="apply-btn">Apply Now</button>
        </div>

      </div>
    </>
  );
};

export default ApplyJob;


