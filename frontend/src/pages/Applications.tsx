import { useContext, useEffect, useState, type ChangeEvent } from 'react';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import moment from 'moment';
import axios from 'axios';
import { useAuth, useUser } from '@clerk/clerk-react';
import { AppContext, type Application } from '../context/AppContext';
import { assets } from '../assets/images/assets';

interface UpdateResumeResponse {
  success: boolean;
  message: string;
}

const Applications: React.FC = () => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const appContext = useContext(AppContext);
  if (!appContext)
    throw new Error('Applications must be used inside AppProvider');

  const {
    backendUrl,
    userData,
    fetchUserData,
    userApplications,
    fetchUsersApplications,
  } = appContext;

  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState<File | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleResumeUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    setResume(e.target.files[0]);
  };

  const getErrorMessage = (error: unknown) => {
    if (axios.isAxiosError(error))
      return error.message || 'Something went wrong';
    if (error instanceof Error) return error.message;
    return 'Something went wrong';
  };

  const updateResume = async () => {
    if (!resume) return alert('Please select a resume first');

    try {
      const formData = new FormData();
      formData.append('resume', resume);

      const token = await getToken();

      const { data } = await axios.post<UpdateResumeResponse>(
        `${backendUrl}/api/users/update-resume`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (data.success) {
        await fetchUserData();
        alert('Resume updated successfully');
      } else {
        alert(data.message);
      }
    } catch (error: unknown) {
      alert(getErrorMessage(error));
      console.error(error);
    } finally {
      setIsEdit(false);
      setResume(null);
    }
  };

  const handleDownload = async () => {
    if (!userData?.resume) return;

    const response = await fetch(userData.resume);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.pdf';
    a.click();

    window.URL.revokeObjectURL(url);
  };

  const handleView = () => {
    if (!userData?.resume) return;
    window.open(userData.resume, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    if (user) {
      fetchUsersApplications();
    }
  }, [user, fetchUsersApplications]);

  return (
    <>
      <NavigationBar />

      <div className="applications">
        <h2 className="applications_title">Resume</h2>

        <div className="applications_resume-container">
          {isEdit || !userData?.resume ? (
            <label className="application-card application-card-upload">
              <p className="application-card_upload-text">
                {resume ? resume.name : 'Select Resume'}
              </p>

              <input
                type="file"
                accept="application/pdf"
                hidden
                onChange={handleResumeUpload}
              />

              <img
                src={assets.profile_upload_icon}
                alt="upload"
                className="application-card_upload-icon"
              />

              <button
                className="applications_save-btn"
                type="button"
                onClick={updateResume}
              >
                Save
              </button>
            </label>
          ) : (
            <div className="applications_resume-view">
              <button className="applications_resume-link" onClick={handleView}>
                View Resume
              </button>

              <button
                className="applications_resume-link"
                onClick={handleDownload}
              >
                Download
              </button>

              <button
                className="applications_edit-btn"
                onClick={() => setIsEdit(true)}
              >
                Edit
              </button>
            </div>
          )}
        </div>

        <h2 className="applications_title">Jobs Applied</h2>

        <div className="applications_cards-list">
          {userApplications.length === 0 && <p>No job applications yet.</p>}

          {userApplications.map((app: Application) => (
            <div key={app._id} className="application-card">
              <div className="application-card_header">
                <img
                  src={app.companyId?.image || assets.company_icon}
                  alt={app.companyId?.name || 'Company logo'}
                />
                <div className="application-card_company">
                  <span className="name">
                    {app.companyId?.name || 'Unknown Company'}
                  </span>
                  <span className="date">{moment(app.date).format('ll')}</span>
                </div>
              </div>

              
                <div className="application-card_info">
                  <span className="application-card_title">
                    {app.jobId?.title || 'Unknown Job'}
                  </span>
                  <span className="application-card_location">
                    <strong>Place:</strong> {app.jobId?.location || '-'}
                  </span>
                </div>

                <span
                  className={`application-card_status ${
                    app.status === 'Accepted'
                      ? 'accepted'
                      : app.status === 'Rejected'
                        ? 'rejected'
                        : 'pending'
                  }`}
                >
                  {app.status || 'Pending'}
                </span>
              </div>
          
          ))}
        </div>

        {isPreviewOpen && userData?.resume && (
          <div className="resume-modal-overlay">
            <div className="resume-modal">
              <div className="resume-modal-header">
                <span>Resume Preview</span>
                <button onClick={() => setIsPreviewOpen(false)}>✕</button>
              </div>

              <iframe
                src={userData.resume}
                width="100%"
                height="600"
                title="Resume Preview"
                style={{ border: 'none' }}
              />
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Applications;
