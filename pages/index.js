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
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-8">Course to Apprenticeship Match</h1>

      <div className="mb-4">
        <label className="block text-xl">Select A Levels (Courses):</label>
        <select
          multiple
          className="w-full p-2 border rounded"
          onChange={handleCourseSelect}
          value={selectedCourses}
        >
          {courses.map(course => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
        <p className="mt-2 text-sm text-gray-500">Select up to 4 courses</p>
      </div>

      <div className="mb-4">
        <label className="block text-xl">Select Apprenticeship Job:</label>
        <select
          className="w-full p-2 border rounded"
          onChange={handleJobSelect}
          value={selectedJob}
        >
          <option value="">-- Select a Job --</option>
          {jobs.map(job => (
            <option key={job.id} value={job.id}>
              {job.title}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Search
      </button>

      {matches.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Matching Courses for the Selected Apprenticeship Job</h2>
          <ul className="mt-4 space-y-4">
            {matches.map((match, index) => (
              <li key={index} className="p-4 border rounded shadow-md">
                <h3 className="text-xl">{match.course.title}</h3>
                <p>Matching Skills: {match.commonSkills.length}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SearchPage
