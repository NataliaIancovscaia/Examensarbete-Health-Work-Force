
import { viewApplicationsPageData } from "../assets/images/assets"


const ViewApplications = () => {
  return (
    <div>
      <div>
        <table>
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
            {viewApplicationsPageData.map((applicant,index)=>(
              <tr>
                <td>{index+1}</td>
                <td>
                  <img src={applicant.imgSrc} alt="applicant image" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewApplications