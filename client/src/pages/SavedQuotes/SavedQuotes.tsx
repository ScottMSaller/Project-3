import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_QUOTES } from '../../graphql/queries';
import { Quote } from '../../services/quoteService';
import "./SavedQuotes.css"

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
  
    if (loading) return <p className="saved-quotes-loading">Loading your saved quotes...</p>;
    if (error) return <p className="saved-quotes-error">Error: {error.message}</p>;
  
    return (
      <div className="saved-quotes-container">
        <h2 className="saved-quotes-title">Your Saved Quotes</h2>
        {quotes.length === 0 ? (
          <p className="saved-quotes-empty">You haven't saved any quotes yet. Start adding some!</p>
        ) : (
          <ul className="saved-quotes-list">
            {quotes.map((quote) => (
              <li key={""} className="saved-quotes-item">
                <blockquote className="saved-quotes-quote">
                  <p className="saved-quotes-text">"{quote.q}"</p>
                  <footer className="saved-quotes-author">- {quote.a}</footer>
                </blockquote>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default SavedQuotesPage;
  