import { useState } from 'react';

export default function MatchingForm({ searchType }) {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the API with selected courses/jobs
    const response = await fetch('/api/match', {
      method: 'POST',
      body: JSON.stringify({ selectedCourses, selectedJob }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    // Handle response
  };

  return (
    <form onSubmit={handleSubmit}>
      {searchType === 'course-to-job' && (
        <select multiple onChange={e => setSelectedCourses([...e.target.selectedOptions].map(opt => opt.value))}>
          {/* Populate with courses */}
          <option value="course1">Course 1</option>
          <option value="course2">Course 2</option>
        </select>
      )}
      {searchType === 'job-to-course' && (
        <select onChange={e => setSelectedJob(e.target.value)}>
          {/* Populate with jobs */}
          <option value="job1">Job 1</option>
          <option value="job2">Job 2</option>
        </select>
      )}
      <button type="submit">Go</button>
    </form>
  );
}
