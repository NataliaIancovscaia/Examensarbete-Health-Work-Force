import { useNavigate } from "react-router-dom";
import { assets } from "../assets/images/assets";
import type { Job } from "../context/AppContext";


interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const navigate=useNavigate();
  
  return (
   <div className="job-card">

  <div className="job-card__header">
    <img
      className="job-card__logo"
      src={assets.company_icon}
      alt="Company icon"
    />

    <h4 className="job-card__title">{job.title}</h4>
  </div>

  <div className="job-card__meta">
    <span>{job.category}</span>
    <span>{job.location}</span>
    <span>{job.level}</span>
  </div>

  <p
    className="job-card__description"
    dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}
  ></p>

  <div className="job-card__buttons">
    <button onClick={() => { 
    navigate(`/apply-job/${job.id}`); 
    scrollTo(0, 0); 
}}>
  Apply
</button>

<button onClick={() => { 
    navigate(`/apply-job/${job.id}`); 
    scrollTo(0, 0); 
}}>
  Read more
</button>
  </div>
</div>

  );
};

export default JobCard;
