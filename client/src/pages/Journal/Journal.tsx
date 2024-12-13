import './Journal.css'; 
const Journal = () => {
return (
<div className="text-center">
    <h1 className="mt-4">Welcome To Your Journal</h1>
    <p className="lead mb-2">What would you like to do today?</p>
    <button className="btn new-journal-btn m-1">New Journal</button>
    <button className="btn new-journal-btn">Inspirational Quotes</button>

</div>
)
}
export default Journal;