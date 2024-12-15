import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_QUOTE } from '../../graphql/mutations';
import { Quote, fetchQuotes } from '../../services/quoteService';

const QuotePage: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [createQuote] = useMutation(CREATE_QUOTE);

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

  const handleAddToFavorites = async () => {
    if (!currentQuote) return;

    try {
      const { data } = await createQuote({
        variables: {
          q: currentQuote.q,
          a: currentQuote.a,
          c: currentQuote.c,
          h: currentQuote.h,
          userId: localStorage.getItem("id")
        },
      });

      console.log('Quote saved:', data.createQuote);
      getNewQuote();
    } catch (err) {
      console.error('Error adding quote to database:', err);
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




