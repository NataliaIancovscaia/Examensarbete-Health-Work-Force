import moment from "moment";
import { manageJobsDate } from "../assets/images/assets";
import { useNavigate } from "react-router";

const ManageJobs: React.FC = () => {

  const navigate=useNavigate();
  return (
    <div className="manage-jobs">
      <h2 className="manage-jobs_title"><strong>Manage Jobs</strong></h2>

      <div className="manage-jobs_table-wrapper">
        <table className="manage-jobs_table">
          <thead>
            <tr>
              <th>Nr.</th>
              <th>Job Title</th>
              <th>Date</th>
              <th>Location</th>
              <th>Applicants</th>
              <th>Visible</th>
            </tr>
          </thead>

          <tbody>
            {manageJobsDate.map((job, index) => (
              <tr key={index} className="manage-jobs_row">
                <td data-label="Nr.">{index + 1}</td>
                <td data-label="Job Title">{job.title}</td>
                <td  data-label="Date">{moment(job.date).format("ll")}</td>
                <td data-label="Location">{job.location}</td>
                <td>{job.applicants}</td>
                <td data-label="Visible">
                  <label className="manage-jobs_toggle">
                    <input type="checkbox"  />
                    <span className="slider" />
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <button onClick={()=>navigate('/dashboard/add-job')}> Add New Job</button>
      </div>
    </div>
  );
};

export default ManageJobs;
