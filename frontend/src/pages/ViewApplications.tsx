import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext, type Application } from "../context/AppContext";
import axios from "axios";
import Loading from "../components/Loading";

const ViewApplications: React.FC = () => {
  const appContext = useContext(AppContext);
  if (!appContext) {
    throw new Error("ViewApplications must be used inside AppProvider");
  }

  const { backendUrl, companyToken } = appContext;

  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [applicants, setApplicants] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const toggleMenu = (index: number) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const fetchCompanyJobApplications = useCallback(async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/company/applicants",
        { headers: { token: companyToken } }
      );

      if (data.success) {
        setApplicants(data.applications.reverse());
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

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications();
    }
  }, [companyToken, fetchCompanyJobApplications]);

  const changeJobApplicationStatus = async (
    id: string,
    status: "Accepted" | "Rejected"
  ) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/company/change-status",
        { id, status },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        fetchCompanyJobApplications();
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

  if (loading) return <Loading />;

 if (applicants.length=== 0) {
    return <div className="empty-state">No applicants  available or posted</div>;
  }
  return (
    <div className="view-applications">
      <h2 className="view-applications_title">
        <strong>Applications</strong>
      </h2>

      <div className="view-applications_table-wrapper">
        <table className="view-applications_table">
          <thead>
            <tr>
              <th>Nr.</th>
              <th>User Name</th>
              <th>Job Title</th>
              <th>Location</th>
              <th>Resume</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {applicants
              .filter(item => item.jobId && item.userId)
              .map((applicant, index) => (
                <tr key={applicant._id} className="view-applications_row">
                  <td>{index + 1}</td>

                  <td className="view-applications_user-cell">
                    <img
                      src={applicant.userId.image}
                      alt={applicant.userId.name}
                      className="view-applications_avatar"
                    />
                    <span>{applicant.userId.name}</span>
                  </td>

                  <td>{applicant.jobId.title}</td>
                  <td>{applicant.jobId.location}</td>

                  <td>
                    <a
                      href={applicant.userId.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="view-applications_resume-link"
                    >
                      Resume
                    </a>
                  </td>

                  <td>
                    {applicant.status === "Pending" ? (
                      <div className="view-applications_action-wrapper">
                        <div
                          className="view-applications_dots-btn"
                          onClick={() => toggleMenu(index)}
                        >
                          ...
                        </div>

                        {openMenuIndex === index && (
                          <div className="view-applications_menu">
                            <button
                              className="accept"
                              onClick={() =>
                                changeJobApplicationStatus(
                                  applicant._id,
                                  "Accepted"
                                )
                              }
                            >
                              Accept
                            </button>

                            <button
                              className="reject"
                              onClick={() =>
                                changeJobApplicationStatus(
                                  applicant._id,
                                  "Rejected"
                                )
                              }
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>{applicant.status}</div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;







