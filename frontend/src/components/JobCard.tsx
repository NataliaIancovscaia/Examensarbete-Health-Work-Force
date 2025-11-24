import { assets } from "../assets/images/assets";
import type { Job } from "../context/AppContext";


interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="job-card">
      <img
        className="job-card__logo"
        src={assets.company_icon}
        alt="Company icon"
      />

      <h4 className="job-card__title">{job.title}</h4>

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
        <button>Apply</button>
        <button>Read more</button>
      </div>
    </div>
  );
};

export default JobCard;
