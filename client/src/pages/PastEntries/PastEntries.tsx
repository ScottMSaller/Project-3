// import 'PastEntries.css';
import { useQuery } from '@apollo/client';
import { GET_JOURNAL_ENTRIES_BY_USER } from '../../graphql/queries'
const PastEntries = () => {
const userId = localStorage.getItem("id");
const { data, loading, error } = useQuery(GET_JOURNAL_ENTRIES_BY_USER, { variables: { userId }});

if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error.message}</p>;

const arr = data.journalEntriesByUser;

    return (
        <div className="hero-section">
            <h1>Past Entries</h1>
            {arr.map((item: any) => (
                <div key={item.id}>
                    <h2>{item.title} on {(item.date)}</h2>
                    <h5>{item.content}</h5>
                    <hr/>
                </div>
            ))
            }
        </div>
    )
}

export default PastEntries;