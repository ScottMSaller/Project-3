import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_QUOTES } from '../../graphql/queries';
import { Quote } from '../../services/quoteService';

interface SavedQuotesPageProps {
  userId: string;
}

const SavedQuotesPage: React.FC<SavedQuotesPageProps> = ({ userId }) => {
  const { loading, error, data } = useQuery(GET_USER_QUOTES, {
    variables: { userId },
  });

  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    if (data && data.getUserQuotes) {
      setQuotes(data.getUserQuotes);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Your Saved Quotes</h2>
      {quotes.length === 0 ? (
        <p>No saved quotes yet!</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {quotes.map((quote) => (
            <li key="" style={{ margin: '20px 0' }}>
              <blockquote>
                <p>"{quote.q}"</p>
                <footer>- {quote.a}</footer>
              </blockquote>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedQuotesPage;
