import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_JOURNAL_ENTRY } from "../../graphql/mutations";
import { useNavigate } from "react-router-dom";

const NewJournal = () => {
  const navigate = useNavigate();
    const [journalData, setJournalData] = useState({
        title: '',
        content: '',
        userId: localStorage.getItem("id"),
        token: localStorage.getItem("token")
        });
    
    const [addJournalEntry] = useMutation(ADD_JOURNAL_ENTRY);
    
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setJournalData({
          ...journalData,
          [name]: value
        });
      };

      const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
          const response = await addJournalEntry({
            variables: { ...journalData },
          });


          alert(`journal entry sucessfully created!`);
          setJournalData({
            title: '',
            content: '',
            userId: '',
            token: ''
          });
          navigate('/my-journal')
        } catch (err) {
          console.log('Error registering user:', err);
          alert(`failed to create entry: ${err}`);
          console.log()
        }
      };

    return (
        <div className="text-center hero-section">
            <h1>New Entry</h1>
            <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" id="title" name="title" className="form-control" placeholder="Enter the title" value={journalData.title}
            onChange={handleChange}
            required/>
            </div>
            <div className="">
              <label htmlFor="content" className="">Body</label>
              <textarea id="content" name="content" className="form-control" placeholder="Enter your text here" value={journalData.content}
            onChange={handleChange}
            required></textarea>
            </div>
            <div className="">
              <button type="submit" className="btn btn-primary mt-2">Submit</button>
            </div>
            </form>
        </div>
    )
}

export default NewJournal;