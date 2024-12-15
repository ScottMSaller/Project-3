import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_JOURNAL_ENTRY } from "../../graphql/mutations";
import { useNavigate } from "react-router-dom";
import "./NewJournal.css";

const NewJournal = () => {
  const navigate = useNavigate();
  const [journalData, setJournalData] = useState({
    title: "",
    content: "",
    userId: localStorage.getItem("id"),
    token: localStorage.getItem("token"),
  });

  const [addJournalEntry] = useMutation(ADD_JOURNAL_ENTRY);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setJournalData({
      ...journalData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addJournalEntry({
        variables: { ...journalData },
      });

      alert(`Journal entry successfully created!`);
      setJournalData({
        title: "",
        content: "",
        userId: "",
        token: "",
      });
      navigate("/my-journal");
    } catch (err) {
      console.error("Error creating journal entry:", err);
      alert(`Failed to create entry: ${err}`);
    }
  };

  return (
    <div id="new-journal-container">
      <h1 id="new-journal-title">New Entry</h1>
      <form id="new-journal-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-input"
            placeholder="Enter the title"
            value={journalData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content" className="form-label">
            Body
          </label>
          <textarea
            id="content"
            name="content"
            className="form-input"
            placeholder="Enter your text here"
            value={journalData.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <button type="submit" id="new-journal-submit" className="btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewJournal;
