import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/images/assets";
import JobCard from "./JobCard";

const JobMenu: React.FC = () => {
  const appContext = useContext(AppContext);
  if (!appContext) {
    throw new Error("JobMenu must be used inside AppProvider");
  }

  const { isSearched, searchFilter, setSearchFilter, jobs } = appContext;

  return (
    <div className="job-menu">

      
      <div className="job-menu__filters">

       
        {isSearched &&
          (searchFilter.title !== "" || searchFilter.location !== "") && (
            <div className="job-menu__block">
              <h3>Selected Search</h3>

              <div className="job-menu__selected-tags">
                {searchFilter.title && (
                  <span>
                    {searchFilter.title}
                    <img
                      onClick={() =>
                        setSearchFilter((prev) => ({ ...prev, title: "" }))
                      }
                      src={assets.cross_icon}
                      alt="Delete"
                    />
                  </span>
                )}

                {searchFilter.location && (
                  <span>
                    {searchFilter.location}
                    <img
                      onClick={() =>
                        setSearchFilter((prev) => ({ ...prev, location: "" }))
                      }
                      src={assets.cross_icon}
                      alt="Delete"
                    />
                  </span>
                )}
              </div>
            </div>
          )}

        {/* Categories */}
        <div className="job-menu__block">
          <h4>Category Search</h4>
          <ul className="job-menu__list">
            {JobCategories.map((category, index) => (
              <li key={index}>
                <input type="checkbox" id={`cat-${index}`} />
                <label htmlFor={`cat-${index}`}>{category}</label>
              </li>
            ))}
          </ul>
        </div>

        {/* Locations */}
        <div className="job-menu__block">
          <h4>Locations Search</h4>
          <ul className="job-menu__list">
            {JobLocations.map((location, index) => (
              <li key={index}>
                <input type="checkbox" id={`loc-${index}`} />
                <label htmlFor={`loc-${index}`}>{location}</label>
              </li>
            ))}
          </ul>
        </div>
      </div>

    
      <section className="job-menu__block job-menu__jobs">
        <h3>Jobs</h3>

        <div className="job-menu__grid">
          {jobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default JobMenu;

