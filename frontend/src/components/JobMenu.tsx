import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/images/assets";
import JobCard from "./JobCard";

const JobMenu: React.FC = () => {
  const appContext = useContext(AppContext);
  if (!appContext) {
    throw new Error("JobMenu must be used inside AppProvider");
  }

  const { isSearched, searchFilter, setSearchFilter, jobs } = appContext;

  const [showFilter, setShowFilter] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(jobs.length / 6);

  return (
    <div className="job-menu">

    
      <button
        className="job-menu__toggle"
        onClick={() => setShowFilter(prev => !prev)}
      >
        {showFilter ? "Close" : "Filters"}
      </button>

      
      {showFilter && (
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
                          setSearchFilter(prev => ({ ...prev, title: "" }))
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
                          setSearchFilter(prev => ({ ...prev, location: "" }))
                        }
                        src={assets.cross_icon}
                        alt="Delete"
                      />
                    </span>
                  )}
                </div>
              </div>
            )}

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
      )}

     
      <section className="job-menu__block job-menu__jobs">
        <h3>Jobs</h3>

        <div className="job-menu__grid">
          {jobs.slice((currentPage - 1) * 6, currentPage * 6).map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>

       
        {jobs.length > 0 && (
          <div className="pagination">

           
            <img
              src={assets.left_arrow_icon}
              alt="LeftArrow"
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            />

           
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={currentPage === index + 1 ? "active" : "inactive"}
              >
                {index + 1}
              </button>
            ))}

          
            <img
              src={assets.right_arrow_icon}
              alt="RightArrow"
              onClick={() =>
                setCurrentPage(p => Math.min(p + 1, totalPages))
              }
            />

          </div>
        )}

      </section>
    </div>
  );
};

export default JobMenu;



