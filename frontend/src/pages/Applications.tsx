import { useContext, useState, type ChangeEvent } from "react";
import NavigationBar from "../components/NavigationBar";
import { assets, jobsApplied } from "../assets/images/assets";
import moment from "moment";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";

const Applications: React.FC = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("Applications must be used inside AppProvider");

  const { backendUrl, userData, fetchUserData } = appContext;

  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState<File | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const updateResume = async () => {
    if (!resume) return alert("Please select a resume first");

    try {
      const formData = new FormData();
      formData.append("resume", resume);

      const token = await getToken();
      const { data } = await axios.post(`${backendUrl}/api/users/update-resume`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        alert(data.message);
        await fetchUserData();
      } else {
        alert(data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) alert(error.response?.data?.message || "Something went wrong");
      console.error(error);
    } finally {
      setIsEdit(false);
      setResume(null);
    }
  };

  const handleResumeUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setResume(e.target.files[0]);
  };

  return (
    <>
      <NavigationBar />

      <div className="applications">
        <h2 className="applications_title">Resume</h2>
        <div className="applications_resume-container">
          {(isEdit || !userData?.resume) ? (
            <label htmlFor="resumeUpload" className="application-card application-card-upload">
              <p className="application-card_upload-text">{resume ? resume.name : "Select Resume"}</p>
              <input accept="application/pdf" type="file" id="resumeUpload" hidden onChange={handleResumeUpload} />
              <img src={assets.profile_upload_icon} alt="upload icon" className="application-card_upload-icon" />
              <button className="applications_save-btn" onClick={updateResume}>Save</button>
            </label>
          ) : (
            <div className="applications_resume-view">
              {userData?.resume ? (
                <>
                  <button className="applications_resume-link" onClick={() => setIsPreviewOpen(true)}>View Resume</button>
                  <a href={userData.resume} download className="applications_resume-link">Download</a>
                </>
              ) : <span className="application_resume-empty">No resume uploaded</span>}
              <button className="applications_edit-btn" onClick={() => setIsEdit(true)}>Edit</button>
            </div>
          )}
        </div>

        <h2 className="applications_title">Jobs Applied</h2>
        <div className="applications_cards-list">
          {jobsApplied.map((job, i) => (
            <div key={i} className="application-card">
              <div className="application-card_header">
                <img src={job.logo} alt="company logo" />
                <div className="application-card_company">
                  <span className="name">{job.company}</span>
                  <span className="date">{moment(job.date).format("ll")}</span>
                </div>
              </div>
              <div className="application-card_body">
                <div className="application-card_info">
                  <span className="application-card_title">{job.title}</span>
                  <span className="application-card_location"><strong>Place:</strong> {job.location}</span>
                </div>
                <span className={`application-card_status ${job.status === "Accepted" ? "accepted" : job.status === "Rejected" ? "rejected" : "pending"}`}>
                  {job.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

     
      {isPreviewOpen && userData?.resume && (
        <div className="resume-modal-overlay">
          <div className="resume-modal">
            <div className="resume-modal-header">
              <span>Resume Preview</span>
              <button onClick={() => setIsPreviewOpen(false)}>✕</button>
            </div>
            <iframe
              src={`https://docs.google.com/gview?url=${encodeURIComponent(userData.resume)}&embedded=true`}
              width="100%"
              height="600"
              title="Resume Preview"
            />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Applications;


