import { EventCard } from '../../components/ui/CommunityCards.jsx';
import { useEffect, useState } from 'react';
import PageHeader from '../../components/ui/PageHeader.jsx';
import EmptyState from '../../components/ui/EmptyState.jsx';
import LoadingState from '../../components/ui/LoadingState.jsx';
import { getAlumniEventsRequest } from '../../api/alumniEvents.js';

function AlumniEventsPage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const response = await getAlumniEventsRequest();
        setEvents(response.data?.events || []);
      } catch (error) {
        setErrorMessage(error.userMessage || 'Unable to load events.');
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, []);

  return (
    <div>
      <PageHeader eyebrow="ALUMNI" title="Come back. Join in." description="View active institute events meant for alumni." />
      <section className="space-y-5">
        {errorMessage ? <p className="alert-error mb-4">{errorMessage}</p> : null}
        {isLoading ? (
          <LoadingState message="Loading events..." />
        ) : events.length === 0 ? (
          <EmptyState
            title="No events available"
            description="Active institute events for alumni will appear here when they are published."
          />
        ) : (
          <div className="grid gap-5">
            {events.map((eventItem) => (
              <EventCard key={eventItem._id} event={eventItem} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default AlumniEventsPage;
