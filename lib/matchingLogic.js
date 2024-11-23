// lib/matchingLogic.js
import { getALevelSkills, getApprenticeshipSkills } from './supabase'

export async function findCourseJobMatches(selectedCourses) {
  let courseSkills = []

  // Get the skills for each selected course
  for (let courseId of selectedCourses) {
    const skills = await getALevelSkills(courseId)
    courseSkills = [...courseSkills, ...skills.map(skill => skill.skill_id)]  // Collect all skill IDs
  }

  // Now, compare the skills with jobs
  const allJobs = await getApprenticeshipStandards()
  const matchedJobs = []

  for (let job of allJobs) {
    const jobSkills = await getApprenticeshipSkills(job.id)

    // Check if the job has any skills in common with the selected courses
    const commonSkills = jobSkills.filter(jobSkill => courseSkills.includes(jobSkill.skill_id))

    if (commonSkills.length > 0) {
      matchedJobs.push({ job, commonSkills })  // Store the job and the matching skills
    }
  }

  // Sort matched jobs based on the number of common skills (optional)
  matchedJobs.sort((a, b) => b.commonSkills.length - a.commonSkills.length)

  return matchedJobs.slice(0, 5)  // Return the top 5 matched jobs
}
