// pages/index.js
import { useState, useEffect } from 'react'
import { getALevels, getApprenticeshipStandards } from '../lib/supabase'
import { findCourseJobMatches } from '../lib/matchingLogic'

function SearchPage() {
  const [courses, setCourses] = useState([])
  const [jobs, setJobs] = useState([])
  const [selectedCourses, setSelectedCourses] = useState([])
  const [matches, setMatches] = useState([])

  useEffect(() => {
    // Fetch the courses and jobs from Supabase
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
    setSelectedCourses(selectedOptions)
  }

  const handleSearch = async () => {
    // Perform the matching when the user clicks "Go"
    const jobMatches = await findCourseJobMatches(selectedCourses)
    setMatches(jobMatches)
  }

  return (
    <div>
      <h1>Course to Apprenticeship Match</h1>

      <select multiple onChange={handleCourseSelect}>
        {courses.map(course => (
          <option key={course.id} value={course.id}>
            {course.title}
          </option>
        ))}
      </select>

      <button onClick={handleSearch}>Go</button>

      <h2>Top 5 Matching Jobs</h2>
      <ul>
        {matches.map((match, index) => (
          <li key={index}>
            <h3>{match.job.title}</h3>
            <p>Matching Skills: {match.commonSkills.length}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchPage
