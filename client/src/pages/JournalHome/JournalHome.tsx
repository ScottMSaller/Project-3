import React from "react";
import { Link } from "react-router-dom";
import "./JournalHome.css";

const JournalHome: React.FC = () => {
  return (
    <div className="journal-home-parent">
    <div id="journal-home-container" className="text-center">
      <h1 id="journal-home-title" className="mt-4">Welcome To Your Journal</h1>
      <p id="journal-home-subtitle" className="lead mb-2">What would you like to do today?</p>
      <div id="journal-home-buttons">
        <button id="new-entry-btn" className="btn m-1">
          <Link to="/new-entry" className="journal-link">New Journal Entry</Link>
        </button>
        <button id="my-quotes-btn" className="btn m-1">
          <Link to="/my-quotes" className="journal-link">View My Quotes</Link>
        </button>
        <button id="browse-quotes-btn" className="btn m-1">
          <Link to="/browse-quotes" className="journal-link">Browse New Quotes</Link>
        </button>
        <button id="entry-history-btn" className="btn m-1">
          <Link to="/entry-history" className="journal-link">View Past Entries</Link>
        </button>
      </div>
    </div>
    </div>
  );
};

export default JournalHome;
