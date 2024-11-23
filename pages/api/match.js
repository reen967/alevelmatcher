import supabase from '../../lib/supabase';

export default async function handler(req, res) {
  const { selectedCourses, selectedJob } = req.body;

  // Example: fetch data from Supabase based on the selected values
  const { data: results, error } = await supabase
    .from('job_skills')
    .select('*')
    .in('course_id', selectedCourses);  // Modify based on your actual schema

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json(results);
}
