import { Link } from 'react-router-dom';
import './Journal.css'; 
const Journal = () => {
return (
<div className="text-center">
    <h1 className="mt-4">Welcome To Your Journal</h1>
    <p className="lead mb-2">What would you like to do today?</p>
    <button className="btn new-journal-btn m-1"><Link to="/new-entry" style={{textDecoration: "none", color: "black"}}>New Journal Entry</Link></button>
    <button className="btn new-journal-btn"><Link to="/my-quotes" style={{textDecoration: "none", color: "black"}}>View My Quotes</Link></button>
    <button className="btn new-journal-btn"><Link to="/browse-quotes" style={{textDecoration: "none", color: "black"}}>Browse New Quotes</Link></button>
    <button className="btn new-journal-btn"><Link to="/entry-history" style={{textDecoration: "none", color: "black"}}>View Past Entries</Link></button>
    
</div>
)
}
export default Journal;