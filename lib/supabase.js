// lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function getALevels() {
  const { data, error } = await supabase.from('alevels').select('*')
  if (error) {
    console.error('Error fetching A Levels:', error)
  }
  return data
}

export async function getApprenticeshipStandards() {
  const { data, error } = await supabase.from('apprenticeship_standards').select('*')
  if (error) {
    console.error('Error fetching Apprenticeships:', error)
  }
  return data
}

export async function getALevelSkills(courseId) {
  const { data, error } = await supabase
    .from('alevel_skills')
    .select('skill_id')
    .eq('alevel_id', courseId)
  if (error) {
    console.error('Error fetching A Level skills:', error)
  }
  return data
}

export async function getApprenticeshipSkills(jobId) {
  const { data, error } = await supabase
    .from('apprenticeship_skills')
    .select('skill_id')
    .eq('apprenticeship_id', jobId)
  if (error) {
    console.error('Error fetching Apprenticeship skills:', error)
  }
  return data
}
