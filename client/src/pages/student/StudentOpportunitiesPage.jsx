import { ArrowUpRight, Briefcase, MapPin, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader.jsx';
import EmptyState from '../../components/ui/EmptyState.jsx';
import LoadingState from '../../components/ui/LoadingState.jsx';
import { getStudentOpportunitiesRequest } from '../../api/studentOpportunities.js';

const formatDate = (value) => new Date(value).toLocaleDateString();

function StudentOpportunitiesPage() {
  const [opportunities, setOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadOpportunities = async () => {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const response = await getStudentOpportunitiesRequest();
        setOpportunities(response.data?.opportunities || []);
      } catch (error) {
        setErrorMessage(error.userMessage || 'Unable to load opportunities.');
      } finally {
        setIsLoading(false);
      }
    };

    loadOpportunities();
  }, []);

  return (
    <div>
      <PageHeader
        eyebrow="The career board"
        title="Your next door is open."
        description="Browse approved opportunities shared by verified alumni from your institute."
      />

      <section className="space-y-5">
        {errorMessage ? (
          <p className="alert-error mb-4">{errorMessage}</p>
        ) : null}

        {isLoading ? (
          <LoadingState message="Loading opportunities..." />
        ) : opportunities.length === 0 ? (
          <EmptyState
            title="No opportunities available"
            description="Approved openings from verified alumni will appear here when your institute has active postings."
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {opportunities.map((opportunity) => (
              <article key={opportunity._id} className="opportunity-card">
                <div className="mb-6 flex items-center justify-between gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-bg-secondary text-primary">
                    <Briefcase className="h-6 w-6" strokeWidth={1.3} />
                  </span>
                  <span className="skill-tag">
                    {opportunity.type?.replaceAll('_', ' ')}
                  </span>
                </div>
                <h2 className="text-section font-semibold text-text-primary">
                  {opportunity.title}
                </h2>
                <p className="mt-1 text-caption text-text-secondary">
                  {opportunity.role} at {opportunity.company}
                </p>
                <div className="my-6 flex flex-wrap gap-3 text-xs text-text-secondary">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {opportunity.location}
                  </span>
                  <span className="skill-tag">{opportunity.mode}</span>
                </div>
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4 text-xs text-text-secondary">
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Apply by {formatDate(opportunity.deadline)}
                  </span>
                  <span>
                    Shared by{' '}
                    {opportunity.postedBy?.name || 'your alumni community'}
                  </span>
                </div>
                <Link
                  to={`/student/opportunities/${opportunity._id}`}
                  className="btn-secondary mt-auto w-full justify-between"
                >
                  Explore opportunity <ArrowUpRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default StudentOpportunitiesPage;
