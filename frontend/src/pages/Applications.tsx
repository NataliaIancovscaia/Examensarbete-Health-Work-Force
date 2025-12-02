import { useState, type ChangeEvent } from "react"
import NavigationBar from "../components/NavigationBar"
import { assets, jobsApplied } from "../assets/images/assets";
import moment from "moment";
import Footer from "../components/Footer";

const Applications:React.FC = () => {
    const [isEdit,setIsEdit]=useState(false);
    const [resume,setResume]=useState<File|null>(null);
    const handleResumeUpload=(e:ChangeEvent<HTMLInputElement>)=>{
      if(!e.target.files||e.target.files.length===0) return;
      setResume(e.target.files[0]);
    }
  return (  
    <>   
      <NavigationBar/>

      <div className='applications'>
        <h2 className="applications_title">Resume</h2>
        <div className="applications_resume-container">
             {isEdit?(
              <label htmlFor="resumeUpload" className="application-card application-card-upload">
                <p className="application-card_upload-text">Select Resume</p>
                <input accept='application/pdf' 
                      type="file"
                      id='resumeUpload'
                      hidden
                      onChange={handleResumeUpload}
                 />
                <img src={assets.profile_upload_icon} 
                   alt="upload icon"
                   className="application-card_upload-icon" 
                />

                <button className="applications_save-btn" onClick={()=>setIsEdit(false)}>Save</button>
              </label>
             ):(<div className="applications_resume-view">
              {resume?(
                <a className= 'applications_resume-link' href="">
                   View Resume
                </a>
              ):(<span className="application_resume-empty">No resume uploaded</span>
              )}
                <button  className='applications_edit-btn' 
                         onClick={()=>setIsEdit(true)}
                >
                  Edit
                </button>
              </div>
            ) }
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

        <span
          className={`application-card_status ${
            job.status === "Accepted"
              ? "accepted"
              : job.status === "Rejected"
              ? "rejected"
              : "pending"
          }`}
        >
          {job.status}
        </span>
      </div>
    </div>
  ))}
</div>

        
         
      </div>

      <Footer />
    </>
  );
};

export default Applications;