// lib/matchingLogic.js
import { getALevelSkills, getApprenticeshipSkills } from './supabase'

export async function findCourseJobMatches(selectedCourses) {
  let courseSkills = []

  // Get skills for selected A Levels
  for (let courseId of selectedCourses) {
    const skills = await getALevelSkills(courseId)
    courseSkills = [...courseSkills, ...skills.map(skill => skill.skill_id)]
  }

  // Get all jobs (Apprenticeship Standards)
  const allJobs = await getApprenticeshipStandards()
  const matchedJobs = []

  // Find jobs that match the skills from the selected A Levels
  for (let job of allJobs) {
    const jobSkills = await getApprenticeshipSkills(job.id)

    // Check for common skills
    const commonSkills = jobSkills.filter(jobSkill => courseSkills.includes(jobSkill.skill_id))

    if (commonSkills.length > 0) {
      matchedJobs.push({ job, commonSkills })
    }
  }

  // Sort jobs by number of common skills
  matchedJobs.sort((a, b) => b.commonSkills.length - a.commonSkills.length)

  // Return the top 5 matches
  return matchedJobs.slice(0, 5)
}
