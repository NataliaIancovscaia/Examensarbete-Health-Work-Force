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
      <button
        className="job-menu_toggle"
        onClick={() => setShowFilter((prev) => !prev)}
      >
        {showFilter ? 'Close' : 'Filters'}
      </button>

      {showFilter && (
        <div className="job-menu_filters">
          {isSearched &&
            (searchFilter.title !== '' || searchFilter.location !== '') && (
              <div className="job-menu_block">
                <h3>Selected Search</h3>

                <div className="job-menu_selected-tags">
                  {searchFilter.title && (
                    <span>
                      {searchFilter.title}
                      <img
                        onClick={clearTitleFilter}
                        src={assets.cross_icon}
                        alt="Delete"
                      />
                    </span>
                  )}

                  {searchFilter.location && (
                    <span>
                      {searchFilter.location}
                      <img
                        onClick={clearLocationFilter}
                        src={assets.cross_icon}
                        alt="Delete"
                      />
                    </span>
                  )}
                </div>
              </div>
            )}

          <div className="job-menu_block">
            <h4>Category Search</h4>
            <ul className="job-menu_list">
              {JobCategories.map((category, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    id={`cat-${index}`}
                    onChange={() => handleCategoryChange(category)}
                    checked={selectedCategories.includes(category)}
                  />
                  <label htmlFor={`cat-${index}`}>{category}</label>
                </li>
              ))}
            </ul>
          </div>

          <div className="job-menu_block">
            <h4>Locations Search</h4>
            <ul className="job-menu_list">
              {JobLocations.map((location, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    id={`loc-${index}`}
                    onChange={() => handleLocationsChange(location)}
                    checked={selectedLocations.includes(location)}
                  />
                  <label htmlFor={`loc-${index}`}>{location}</label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <section className="job-menu_block job-menu_jobs">
        <h3>Jobs</h3>

        <div className="job-menu_grid">
          {filteredJobs.slice((page - 1) * 6, page * 6).map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>

        {filteredJobs.length > 0 && (
          <div className="pagination">
            <img
              src={assets.left_arrow_icon}
              alt="LeftArrow"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            />

            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={page === index + 1 ? 'active' : 'inactive'}
              >
                {index + 1}
              </button>
            ))}

            <img
              src={assets.right_arrow_icon}
              alt="RightArrow"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default JobMenu;
