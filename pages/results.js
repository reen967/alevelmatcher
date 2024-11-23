import { useState } from 'react';
import MatchingForm from '../components/MatchingForm';
import ResultList from '../components/ResultList';

export default function Results() {
  const [results, setResults] = useState([]);
  const [email, setEmail] = useState('');

  const fetchResults = async (selectedCourses, selectedJob) => {
    const response = await fetch('/api/match', {
      method: 'POST',
      body: JSON.stringify({ selectedCourses, selectedJob }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    setResults(data);
  };

  const handleEmailSubmit = async () => {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      body: JSON.stringify({ email, results }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <div>
      <h1>Results</h1>
      <MatchingForm searchType="course-to-job" />
      <ResultList results={results} />
      <div>
        <input 
          type="email" 
          placeholder="Enter email for detailed results" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
        />
        <button onClick={handleEmailSubmit}>Submit</button>
      </div>
    </div>
  );
}
