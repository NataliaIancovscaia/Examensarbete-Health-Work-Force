import moment from "moment";
import { useNavigate } from "react-router";
import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext, type Job } from "../context/AppContext";
import axios from "axios";

const ManageJobs: React.FC = () => {

  const navigate=useNavigate();

const [jobs, setJobs] = useState<Job[]>([]);
 const { backendUrl, companyToken } = useContext(AppContext)!;

 const fetchCompanyJobs = useCallback(async () => {
  try {
    const { data } = await axios.get(
      backendUrl + "/api/company/list-jobs",
      { headers: { token: companyToken } }
    );

    if (data.success) {
      setJobs(data.jobsData.reverse());
    } else {
      alert(data.message);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.response?.data?.message || "Something went wrong");
      console.error(error.response?.data);
    } else {
      console.error(error);
    }
  }
}, [backendUrl, companyToken]);

const changeJobVisibility=async(id: string)=>{
  try {
    const { data } = await axios.post(
      backendUrl + "/api/company/change-visibility",
      {id},
      { headers: { token: companyToken } }
    );
    if (data.success) {
        // alert(data.message);
        fetchCompanyJobs();
    }else {
      alert(data.message);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.response?.data?.message || "Something went wrong");
      console.error(error.response?.data);
    } else {
      console.error(error);
    }
  }

}

  useEffect(() => {
  if (!companyToken) return;

  const loadJobs = async () => {
    await fetchCompanyJobs();
  };

  loadJobs();
}, [companyToken, fetchCompanyJobs]);


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
            {jobs.map((job, index) => (
              <tr key={index} className="manage-jobs_row">
                <td data-label="Nr.">{index + 1}</td>
                <td data-label="Job Title">{job.title}</td>
                <td  data-label="Date">{moment(job.date).format("ll")}</td>
                <td data-label="Location">{job.location}</td>
                <td>{job.applicants}</td>
                <td data-label="Visible">
                  <label className="manage-jobs_toggle">
                    <input
                       type="checkbox"
                       checked={job.visible}
                       onChange={() => changeJobVisibility(job._id)}
                     />
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
