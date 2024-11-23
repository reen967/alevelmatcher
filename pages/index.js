import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Home({ jobs, courses }) {
  const [selectedJob, setSelectedJob] = useState('')
  const [selectedCourses, setSelectedCourses] = useState([])

  const handleJobChange = (e) => setSelectedJob(e.target.value)

  const handleCourseChange = (e) => {
    const value = e.target.value
    setSelectedCourses((prev) =>
      prev.includes(value) ? prev.filter((course) => course !== value) : [...prev, value]
    )
  }

  const handleSubmit = async () => {
    if (selectedJob && selectedCourses.length > 0) {
      // Matching courses with the job based on skills
      const { data: jobSkills, error: jobSkillsError } = await supabase
        .from('apprenticeship_skills')
        .select('skills_id')
        .eq('apprenticeship_id', selectedJob)

      if (jobSkillsError) {
        console.error(jobSkillsError)
        return
      }

      const jobSkillIds = jobSkills.map(skill => skill.skills_id)

      const { data: matchingCourses, error: coursesError } = await supabase
        .from('alevel_skills')
        .select('a_level_id, skills_id')
        .in('skills_id', jobSkillIds)

      if (coursesError) {
        console.error(coursesError)
        return
      }

      // Find the top matching courses
      const matchingCourseIds = matchingCourses.map(course => course.a_level_id)
      const { data: matchingCoursesDetails, error: matchingCoursesError } = await supabase
        .from('alevels')
        .select('id, title')
        .in('id', matchingCourseIds)

      if (matchingCoursesError) {
        console.error(matchingCoursesError)
        return
      }

      console.log('Matching Courses:', matchingCoursesDetails)
      // Process to show matched courses...
    }
  }

  return (
    <div>
      <h1>Welcome to the Job-Course Matcher</h1>

      <div>
        <label>Job:</label>
        <select onChange={handleJobChange} value={selectedJob}>
          <option value="">Select a Job</option>
          {jobs.map((job) => (
            <option key={job.id} value={job.id}>
              {job.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Courses (Select up to 4):</label>
        {courses.map((course) => (
          <div key={course.id}>
            <input
              type="checkbox"
              value={course.id}
              onChange={handleCourseChange}
              disabled={selectedCourses.length >= 4 && !selectedCourses.includes(course.id)}
            />
            {course.title}
          </div>
        ))}
      </div>

      <button onClick={handleSubmit}>Find Matching Courses</button>

      {/* Optionally, show results or send details via email */}
    </div>
  )
}

export async function getServerSideProps() {
  const { data: jobs, error: jobError } = await supabase.from('apprenticeship_standards').select('*')
  const { data: courses, error: courseError } = await supabase.from('alevels').select('*')

  if (jobError || courseError) {
    console.log(jobError || courseError)
    return { props: { jobs: [], courses: [] } }
  }

  return {
    props: { jobs, courses }
  }
}
