import './PastEntries.css';
import { useQuery } from '@apollo/client';
import { GET_JOURNAL_ENTRIES_BY_USER } from '../../graphql/queries';

const PastEntries = () => {
  const userId = localStorage.getItem('id');
  const { data, loading, error } = useQuery(GET_JOURNAL_ENTRIES_BY_USER, { variables: { userId } });

  if (loading) return <p id="past-entries-loading">Loading...</p>;
  if (error) return <p id="past-entries-error">Error: {error.message}</p>;

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const arr = data.journalEntriesByUser;

  return (
    <div className="past-entries-parent">
    <div id="past-entries-container">
      <h1 id="past-entries-title">Past Entries</h1>
      {arr.map((item: any) => (
        <div key={item.id} className="past-entry">
          <h2 className="past-entry-title">
            {item.title} <span className="past-entry-date">on {formatDate(item.date)}</span>
          </h2>
          <p className="past-entry-content">{item.content}</p>
          <hr className="past-entry-divider" />
        </div>
      ))}
    </div>
    </div>
  );
};

export default PastEntries;

