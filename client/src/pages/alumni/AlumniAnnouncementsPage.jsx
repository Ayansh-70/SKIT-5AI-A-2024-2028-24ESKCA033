import { BulletinCard } from '../../components/ui/CommunityCards.jsx';
import { useEffect, useState } from 'react';
import PageHeader from '../../components/ui/PageHeader.jsx';
import EmptyState from '../../components/ui/EmptyState.jsx';
import LoadingState from '../../components/ui/LoadingState.jsx';
import { getAlumniAnnouncementsRequest } from '../../api/alumniAnnouncements.js';

function AlumniAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadAnnouncements = async () => {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const response = await getAlumniAnnouncementsRequest();
        setAnnouncements(response.data?.announcements || []);
      } catch (error) {
        setErrorMessage(error.userMessage || 'Unable to load announcements.');
      } finally {
        setIsLoading(false);
      }
    };

    loadAnnouncements();
  }, []);

  return (
    <div>
      <PageHeader eyebrow="ALUMNI" title="The campus bulletin." description="View active institute announcements meant for alumni." />
      <section className="space-y-5">
        {errorMessage ? <p className="alert-error mb-4">{errorMessage}</p> : null}
        {isLoading ? (
          <LoadingState message="Loading announcements..." />
        ) : announcements.length === 0 ? (
          <EmptyState
            title="No announcements available"
            description="Institute announcements for alumni will appear here when they are active."
          />
        ) : (
          <div className="grid items-start gap-5 lg:grid-cols-2">
            {announcements.map((announcement) => (
              <BulletinCard key={announcement._id} announcement={announcement} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default AlumniAnnouncementsPage;
