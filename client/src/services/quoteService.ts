export interface Quote {
    q: string;
    a: string;
    c?: string;
    h?: string;
  }
  
  export const fetchQuotes = async (): Promise<Quote[]> => {
    const response = await fetch('http://localhost:3001/api/quotes');
    if (!response.ok) {
      throw new Error('Failed to fetch quotes');
    }
    return await response.json();
  };