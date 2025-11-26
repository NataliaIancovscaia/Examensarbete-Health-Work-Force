import { useContext } from "react";
import { useParams } from "react-router";
import { AppContext, type Job } from "../context/AppContext";
import Loading from "../components/Loading";
import NavigationBar from "../components/NavigationBar";
import { assets } from "../assets/images/assets";

const ApplyJob: React.FC = () => {
  const appContext = useContext(AppContext);
  if (!appContext) {
    throw new Error("ApplyJob must be used inside AppProvider");
  }

  const { id } = useParams<{ id: string }>();
  const { jobs } = appContext;

  
  const JobData: Job| undefined = jobs.find((job) => job.id === id);

  if (!JobData) return <Loading />;

  return (
    <>
      <NavigationBar />
      
      <div>
        <div>
          <div>
            <div>
                 
              <img src={assets.company_icon} alt="Company Icon" />
              <div>
                <h1>{JobData.title}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
  
    </>
  );
};

export default ApplyJob;
