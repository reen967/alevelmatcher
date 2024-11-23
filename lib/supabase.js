// lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase

// Fetch A Levels (Courses)
export async function getALevels() {
  const { data, error } = await supabase
    .from('alevels')
    .select('id, title')
  if (error) {
    console.error('Error fetching A Levels:', error.message)
  }
  return data
}

// Fetch Apprenticeship Standards (Jobs)
export async function getApprenticeshipStandards() {
  const { data, error } = await supabase
    .from('apprenticeship_standards')
    .select('id, title')
  if (error) {
    console.error('Error fetching Apprenticeship Standards:', error.message)
  }
  return data
}

// Fetch A Level Skills
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

// Fetch Apprenticeship Skills
export async function getApprenticeshipSkills(apprenticeshipId) {
  const { data, error } = await supabase
    .from('
