// lib/matchingLogic.js
import { getALevelSkills, getApprenticeshipSkills } from './supabase'

export async function findCourseJobMatches(selectedCourses, selectedJob) {
  let courseSkills = []

  // Get skills for selected A Levels (Courses)
  for (let courseId of selectedCourses) {
    const skills = await getALevelSkills(courseId)
    courseSkills = [...courseSkills, ...skills.map(skill => skill.skill_id)]
  }

  // Get the skills required for the selected Apprenticeship job
  const jobSkills = await getApprenticeshipSkills(selectedJob)

  // Find the courses that match the job skills
  const matchedCourses = []

  for (let courseId of selectedCourses) {
    const courseSkills = await getALevelSkills(courseId)
    const commonSkills = courseSkills.filter(courseSkill =>
      jobSkills.some(jobSkill => jobSkill.skill_id === courseSkill.skill_id)
    )

    if (commonSkills.length > 0) {
      const course = { id: courseId, commonSkills }
      matchedCourses.push(course)
    }
  }

  // Sort courses by number of common skills
  matchedCourses.sort((a, b) => b.commonSkills.length - a.commonSkills.length)

  return matchedCourses.slice(0, 5)  // Return up to 5 courses that match
}
