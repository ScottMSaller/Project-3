import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_QUOTE } from '../../graphql/mutations';
import { Quote, fetchQuotes } from '../../services/quoteService';
import './QuotePage.css';

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
          userId: localStorage.getItem('id'),
        },
      });

      console.log('Quote saved:', data.createQuote);
      getNewQuote();
    } catch (err) {
      console.error('Error adding quote to database:', err);
    }
  };

  if (loading) return <p id="quote-loading">Loading...</p>;
  if (error) return <p id="quote-error">Error: {error}</p>;

  return (
    <div id="quote-page-container">
      <h2 id="quote-page-title">Quote of the Moment</h2>
      {currentQuote && (
        <>
          <blockquote id="quote-block">
            <p id="quote-text">"{currentQuote.q}"</p>
            <footer id="quote-author">- {currentQuote.a}</footer>
          </blockquote>
          <button id="add-to-favorites-btn" onClick={handleAddToFavorites}>
            Add to Favorites
          </button>
        </>
      )}
      <button id="get-new-quote-btn" onClick={getNewQuote}>
        Get Another Quote
      </button>
    </div>
  );
};

export default QuotePage;





