import React, { useState, useEffect } from 'react';
import { Quote, fetchQuotes } from '../../services/quoteService';

interface Props {
  onAddToFavorites: (quote: Quote) => void;
}

const QuotePage: React.FC<Props> = ({ onAddToFavorites }) => {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getNewQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      const quotes = await fetchQuotes();
      setCurrentQuote(quotes[0]);
    } catch (err) {
      setError('Failed to fetch a new quote');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNewQuote();
  }, []);

  const handleAddToFavorites = () => {
    if (currentQuote) {
      onAddToFavorites(currentQuote);
      getNewQuote();
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Quote of the Moment</h2>
      {currentQuote && (
        <>
          <blockquote>
            <p>"{currentQuote.q}"</p>
            <footer>- {currentQuote.a}</footer>
          </blockquote>
          <button onClick={handleAddToFavorites}>Add to Favorites</button>
        </>
      )}
      <button onClick={getNewQuote}>Get Another Quote</button>
    </div>
  );
};

export default QuotePage;
