import { useState } from 'react';
import ResultList from '../components/ResultList';

export default function Results() {
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const response = await fetch('/api/match', {
      method: 'POST',
      body: JSON.stringify({ selectedCourses: [], selectedJob: 'someJobId' }), // Pass your actual selected values
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();
    setResults(data);
  };

  return (
    <div>
      <button onClick={handleSearch}>Search</button>
      <ResultList results={results} />
    </div>
  );
}

