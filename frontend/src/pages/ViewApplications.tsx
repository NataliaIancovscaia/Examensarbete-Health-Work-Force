import { useState } from "react";
import { viewApplicationsPageData } from "../assets/images/assets";

const ViewApplications: React.FC = () => {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  const toggleMenu = (index: number) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  return (
    <div className="view-applications">
      <h2 className="view-applications_title">Applications</h2>

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
            {viewApplicationsPageData.map((applicant, index) => (
              <tr key={index} className="view-applications_row">
                <td>{index + 1}</td>

                <td className="view-applications_user-cell">
                  <img
                    src={applicant.imgSrc}
                    alt={applicant.name}
                    className="view-applications_avatar"
                  />
                  <span>{applicant.name}</span>
                </td>

                <td>{applicant.jobTitle}</td>
                <td>{applicant.location}</td>

                <td>
                  <a
                    href={applicant.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-applications_resume-link"
                  >
                    Resume
                  </a>
                </td>

                <td>
                  <div className="view-applications_action-wrapper">
                    <div
                      className="view-applications_dots-btn"
                      onClick={() => toggleMenu(index)}
                    >
                      ...
                    </div>

                    {openMenuIndex === index && (
                      <div className="view-applications_menu">
                        <button className="accept">Accept</button>
                        <button className="reject">Reject</button>
                      </div>
                    )}
                  </div>
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






