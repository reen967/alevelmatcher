// lib/supabase.js
import supabase from './supabase'

// Get all A Levels (Courses)
export async function getALevels() {
  const { data, error } = await supabase
    .from('alevels')
    .select('id, title')
  if (error) {
    console.error('Error fetching A Levels:', error.message)
  }
  return data
}

// Get all Apprenticeship Standards (Jobs)
export async function getApprenticeshipStandards() {
  const { data, error } = await supabase
    .from('apprenticeship_standards')
    .select('id, title')
  if (error) {
    console.error('Error fetching Apprenticeship Standards:', error.message)
  }
  return data
}

// Get A Level Skills
export async function getALevelSkills(alevelId) {
  const { data, error } = await supabase
    .from('alevel_skills')
    .select('skill_id')
    .eq('alevel_id', alevelId)
  if (error) {
    console.error('Error fetching A Level skills:', error.message)
  }
  return data
}

// Get Apprenticeship Skills
export async function getApprenticeshipSkills(apprenticeshipId) {
  const { data, error } = await supabase
    .from('apprenticeship_skills')
    .select('skill_id')
    .eq('apprenticeship_id', apprenticeshipId)
  if (error) {
    console.error('Error fetching Apprenticeship skills:', error.message)
  }
  return data
}
