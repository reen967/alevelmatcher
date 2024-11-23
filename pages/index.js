// pages/index.js
import { useState, useEffect } from 'react'
import { getALevels, getApprenticeshipStandards } from '../lib/supabase'
import { findCourseJobMatches } from '../lib/matchingLogic'

function SearchPage() {
  const [courses, setCourses] = useState([])
  const [jobs, setJobs] = useState([])
  const [selectedCourses, setSelectedCourses] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)
  const [matches, setMatches] = useState([])

  useEffect(() => {
    async function fetchData() {
      const coursesData = await getALevels()
      const jobsData = await getApprenticeshipStandards()
      setCourses(coursesData)
      setJobs(jobsData)
    }
    fetchData()
  }, [])

  const handleCourseSelect = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value)

    // Allow only 4 courses to be selected
    if (selectedOptions.length <= 4) {
      setSelectedCourses(selectedOptions)
    }
  }

  const handleJobSelect = (e) => {
    setSelectedJob(e.target.value)
  }

  const handleSearch = async () => {
    if (selectedCourses.length > 0 && selectedJob) {
      const jobMatches = await findCourseJobMatches(selectedCourses, selectedJob)
      setMatches(jobMatches)
    } else {
      alert('Please select up to 4 courses and one job!')
    }
  }

  return (
    <div>
      <h1>Course to Apprenticeship Match</h1>

      <label>Select A Levels (Courses):</label>
      <select multiple onChange={handleCourseSelect} value={selectedCourses}>
        {courses.map(course => (
          <option key={course.id} value={course.id}>
            {course.title}
          </option>
        ))}
      </select>
      <p>Maximum of 4 courses allowed</p>

      <label>Select Apprenticeship Job:</label>
      <select onChange={handleJobSelect} value={selectedJob}>
        <option value="">-- Select a Job --</option>
        {jobs.map(job => (
          <option key={job.id} value={job.id}>
            {job.title}
          </option>
        ))}
      </select>

      <button onClick={handleSearch}>Search</button>

      {matches.length > 0 && (
        <>
          <h2>Matching Courses for the Selected Apprenticeship Job</h2>
          <ul>
            {matches.map((match, index) => (
              <li key={index}>
                <h3>{match.course.title}</h3>
                <p>Matching Skills: {match.commonSkills.length}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default SearchPage

