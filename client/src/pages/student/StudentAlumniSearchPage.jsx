import { useEffect, useState } from 'react';
import { searchStudentAlumniRequest } from '../../api/studentAlumni.js';
import EmptyState from '../../components/ui/EmptyState.jsx';
import LoadingState from '../../components/ui/LoadingState.jsx';
import PageHeader from '../../components/ui/PageHeader.jsx';
import { MemberCard } from '../../components/ui/CommunityCards.jsx';
import { SlidersHorizontal, Users } from 'lucide-react';

const INITIAL_FILTERS = {
  branch: '',
  batch: '',
  company: '',
  skill: '',
  domain: '',
  location: ''
};

function StudentAlumniSearchPage() {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const loadResults = async (params = {}) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await searchStudentAlumniRequest(params);
      setResults(response.data?.alumni || []);
    } catch (error) {
      setErrorMessage(error.userMessage || 'Unable to search alumni.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadResults();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((current) => ({ ...current, [name]: value }));
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    const cleanedFilters = Object.fromEntries(
      Object.entries(filters)
        .map(([key, value]) => [key, value.trim()])
        .filter(([, value]) => value)
    );

    await loadResults(cleanedFilters);
  };

  const handleClear = async () => {
    setFilters(INITIAL_FILTERS);
    await loadResults();
  };

  return (
    <div>
      <PageHeader
        eyebrow="The alumni directory"
        title="Familiar roots. New connections."
        description="Find the people who once sat where you sit. Explore your institute alumni network, ask a question, and start a conversation."
      />

      <section className="directory-layout">
        <aside className="directory-filters">
          <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold">
            <SlidersHorizontal className="h-4 w-4" />
            Find your people
          </h2>
          <p className="mb-6 text-xs leading-6 text-text-secondary">
            A shared interest is a good place to start.
          </p>
          <form
            onSubmit={handleSearch}
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1"
          >
            <div>
              <label htmlFor="branch">Branch</label>
              <input
                id="branch"
                name="branch"
                value={filters.branch}
                onChange={handleChange}
                className="field-control"
                placeholder="CSE"
              />
            </div>
            <div>
              <label htmlFor="batch">Batch</label>
              <input
                id="batch"
                name="batch"
                value={filters.batch}
                onChange={handleChange}
                className="field-control"
                placeholder="2020"
              />
            </div>
            <div>
              <label htmlFor="company">Company</label>
              <input
                id="company"
                name="company"
                value={filters.company}
                onChange={handleChange}
                className="field-control"
                placeholder="Infosys"
              />
            </div>
            <div>
              <label htmlFor="skill">Skill</label>
              <input
                id="skill"
                name="skill"
                value={filters.skill}
                onChange={handleChange}
                className="field-control"
                placeholder="React"
              />
            </div>
            <div>
              <label htmlFor="domain">Domain</label>
              <input
                id="domain"
                name="domain"
                value={filters.domain}
                onChange={handleChange}
                className="field-control"
                placeholder="Web Development"
              />
            </div>
            <div>
              <label htmlFor="location">Location</label>
              <input
                id="location"
                name="location"
                value={filters.location}
                onChange={handleChange}
                className="field-control"
                placeholder="Jaipur"
              />
            </div>

            <div className="flex flex-wrap gap-3 sm:col-span-2 xl:col-span-1 pt-2">
              <button
                type="submit"
                className="btn-primary w-full"
                disabled={isLoading}
              >
                Search alumni
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="btn-secondary w-full"
                disabled={isLoading}
              >
                Clear filters
              </button>
            </div>
          </form>
        </aside>
        <div className="min-w-0">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-base font-semibold">
              <Users className="h-4 w-4 text-primary" />
              Your alumni community
            </h2>
            {!isLoading && !errorMessage && (
              <span className="skill-tag">{results.length} shown</span>
            )}
          </div>

          {errorMessage ? (
            <p className="alert-error mt-6" role="alert" aria-live="polite">
              {errorMessage}
            </p>
          ) : null}

          {isLoading ? (
            <LoadingState
              message="Loading verified alumni..."
              className="mt-6"
            />
          ) : results.length === 0 ? (
            <div className="mt-6">
              <EmptyState
                title="No alumni matched your search"
                description="Try clearing one or two filters to broaden the results across your institute network."
              />
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {results.map((alumni) => (
                <MemberCard key={alumni._id} alumni={alumni} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default StudentAlumniSearchPage;
