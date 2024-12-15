import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Journal  from './pages/Journal/Journal';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'; 
import { setContext } from '@apollo/client/link/context';
import NewJournal from './pages/NewJournal/NewJournal';
import PastEntries from './pages/PastEntries/PastEntries';
import QuoteFinder from './pages/QuoteFinder/QuoteFinder';
import SavedQuotes from './pages/SavedQuotes/SavedQuotes';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const userId = localStorage.getItem("id") || '';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
    <BrowserRouter>
    <Navbar/>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/my-journal" element={<Journal/>} />
        <Route path="/new-entry" element={<NewJournal/>} />
        <Route path="/entry-history" element={<PastEntries/>} />
        <Route path="/browse-quotes" element={<QuoteFinder/>} />
        <Route path="/my-quotes" element={<SavedQuotes userId={userId}/>} />
    </Routes>        
    </BrowserRouter>
    </ApolloProvider>
  </StrictMode>
)