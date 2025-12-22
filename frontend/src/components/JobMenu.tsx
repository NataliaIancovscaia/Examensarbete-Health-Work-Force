import { useContext, useMemo, useState } from 'react';
import { AppContext, type Job, type SearchFilter } from '../context/AppContext';
import { assets, JobCategories, JobLocations } from '../assets/images/assets';
import JobCard from './JobCard';

const JobMenu: React.FC = () => {
  const appContext = useContext(AppContext);
  if (!appContext) {
    throw new Error('JobMenu must be used inside AppProvider');
  }

  const { isSearched, searchFilter, setSearchFilter, jobs } = appContext;

  const [showFilter, setShowFilter] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
    setCurrentPage(1);
  };

  const handleLocationsChange = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((c) => c !== location)
        : [...prev, location],
    );
    setCurrentPage(1);
  };

  const clearTitleFilter = () => {
    setSearchFilter((prev: SearchFilter) => ({ ...prev, title: '' }));
    setCurrentPage(1);
  };

  const clearLocationFilter = () => {
    setSearchFilter((prev: SearchFilter) => ({ ...prev, location: '' }));
    setCurrentPage(1);
  };

  const filteredJobs = useMemo(() => {
    const matchesCategory = (job: Job) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(job.category);

    const matchesLocation = (job: Job) =>
      selectedLocations.length === 0 ||
      selectedLocations.includes(job.location);

    const matchesTitle = (job: Job) =>
      searchFilter.title === '' ||
      job.title.toLowerCase().includes(searchFilter.title.toLowerCase());

    const matchesSearchLocation = (job: Job) =>
      searchFilter.location === '' ||
      job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

    return jobs
      .slice()
      .reverse()
      .filter(
        (job) =>
          matchesCategory(job) &&
          matchesLocation(job) &&
          matchesTitle(job) &&
          matchesSearchLocation(job),
      );
  }, [jobs, selectedCategories, selectedLocations, searchFilter]);

  const totalPages = Math.ceil(filteredJobs.length / 6);

  const page = Math.min(currentPage, totalPages || 1);

  return (
   <div className="job-menu">

  <aside className="job-menu_sidebar">
    <button
      className="job-menu_toggle"
      onClick={() => setShowFilter((prev) => !prev)}
    >
      {showFilter ? 'Close' : 'Filters'}
    </button>

    <div
      className={`job-menu_filters ${
        showFilter ? 'is-open' : 'is-closed'
      }`}
    >
     
      {isSearched &&
        (searchFilter.title || searchFilter.location) && (
          <div className="job-menu_block">
            <h3>Selected Search</h3>

            <div className="job-menu_selected-tags">
              {searchFilter.title && (
                <span>
                  {searchFilter.title}
                  <img
                    src={assets.cross_icon}
                    onClick={clearTitleFilter}
                    alt=""
                  />
                </span>
              )}

              {searchFilter.location && (
                <span>
                  {searchFilter.location}
                  <img
                    src={assets.cross_icon}
                    onClick={clearLocationFilter}
                    alt=""
                  />
                </span>
              )}
            </div>
          </div>
        )}


      <div className="job-menu_block">
        <h4>Category</h4>
        <ul className="job-menu_list">
          {JobCategories.map((cat, i) => (
            <li key={i}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
              />
              <label>{cat}</label>
            </li>
          ))}
        </ul>
      </div>

  
      <div className="job-menu_block">
        <h4>Location</h4>
        <ul className="job-menu_list">
          {JobLocations.map((loc, i) => (
            <li key={i}>
              <input
                type="checkbox"
                checked={selectedLocations.includes(loc)}
                onChange={() => handleLocationsChange(loc)}
              />
              <label>{loc}</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </aside>


  <section className="job-menu_jobs">
    <h3>Jobs</h3>

    <div className="job-menu_grid">
      {filteredJobs
        .slice((page - 1) * 6, page * 6)
        .map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
    </div>

 
    {filteredJobs.length > 0 && (
      <div className="pagination">
        <img
          src={assets.left_arrow_icon}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        />

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={page === i + 1 ? 'active' : ''}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <img
          src={assets.right_arrow_icon}
          onClick={() =>
            setCurrentPage((p) => Math.min(p + 1, totalPages))
          }
        />
      </div>
    )}
  </section>
</div>

  );
};

export default JobMenu;
