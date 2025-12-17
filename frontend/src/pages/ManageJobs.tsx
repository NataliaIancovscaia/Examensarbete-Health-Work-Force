import moment from "moment";
import { useNavigate } from "react-router";
import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext, type Job } from "../context/AppContext";
import axios from "axios";
import Loading from "../components/Loading";

const ManageJobs: React.FC = () => {
  const navigate = useNavigate();
  const { backendUrl, companyToken } = useContext(AppContext)!;

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  
  const fetchCompanyJobs = useCallback(async () => {
    if (!companyToken) return;

    try {
      setLoading(true);

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
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [backendUrl, companyToken]);


  const changeJobVisibility = async (id: string) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/company/change-visibility",
        { id },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        fetchCompanyJobs();
      } else {
        alert(data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "Something went wrong");
      }
      console.error(error);
    }
  };


  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs();
    }
  }, [companyToken, fetchCompanyJobs]);

  
  if (loading) {
    return <Loading />;
  }

  if (jobs.length === 0) {
    return <div className="empty-state">No job available or posted</div>;
  }

  return (
    <div className="manage-jobs">
      <h2 className="manage-jobs_title">
        <strong>Manage Jobs</strong>
      </h2>

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
              <tr key={job._id} className="manage-jobs_row">
                <td>{index + 1}</td>
                <td>{job.title}</td>
                <td>{moment(job.date).format("ll")}</td>
                <td>{job.location}</td>
                <td>{job.applicants ?? 0}</td>
                <td>
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

      <button onClick={() => navigate("/dashboard/add-job")}>
        Add New Job
      </button>
    </div>
  );
};

export default ManageJobs;
