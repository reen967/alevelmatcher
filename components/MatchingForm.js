import { useState, useEffect } from 'react';
import supabase from '../lib/supabase';

export default function MatchingForm({ searchType }) {
  const [courses, setCourses] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  // Fetch courses (A Levels) and jobs (Apprenticeships) from Supabase
  useEffect(() => {
    async function fetchData() {
      const { data: alevelsData, error: alevelsError } = await supabase
        .from('alevels')
        .select('id, name');  // Select the fields you need (id and name for example)

      if (alevelsError) {
        console.error('Error fetching A Levels:', alevelsError.message);
      } else {
        setCourses(alevelsData);
      }

      const { data: apprenticeshipData, error: apprenticeshipError } = await supabase
        .from('apprenticeship_standards')
        .select('id, title');  // Select the fields you need (id and title for example)

      if (apprenticeshipError) {
        console.error('Error fetching Apprenticeships:', apprenticeshipError.message);
      } else {
        setJobs(apprenticeshipData);
      }
    }

    fetchData();
  }, []);

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
    console.log('Match Results:', data);
  };

  return (
    <form onSubmit={handleSubmit}>
      {searchType === 'course-to-job' && (
        <div>
          <label htmlFor="courses">Select Courses (A Levels):</label>
          <select
            multiple
            id="courses"
            onChange={e =>
              setSelectedCourses([...e.target.selectedOptions].map(opt => opt.value))
            }
          >
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {searchType === 'job-to-course' && (
        <div>
          <label htmlFor="jobs">Select Job (Apprenticeship):</label>
          <select
            id="jobs"
            onChange={(e) => setSelectedJob(e.target.value)}
          >
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title}
              </option>
            ))}
          </select>
        </div>
      )}

      <button type="submit">Go</button>
    </form>
  );
}

