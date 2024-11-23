import supabase from '../../lib/supabase';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { selectedCourses, selectedJob } = req.body;

    let matches = [];

    if (selectedCourses.length > 0) {
      // Match A Levels to Apprenticeships
      const { data: jobSkills, error: jobSkillsError } = await supabase
        .from('apprenticeship_skills')
        .select('apprenticeship_standard_id, skill_id')
        .in('apprenticeship_standard_id', selectedCourses);

      if (jobSkillsError) {
        return res.status(500).json({ error: jobSkillsError.message });
      }

      matches = jobSkills; // Match logic here
    }

    if (selectedJob) {
      // Match Apprenticeship to A Levels
      const { data: courseSkills, error: courseSkillsError } = await supabase
        .from('alevel_skills')
        .select('alevel_id, skill_id')
        .eq('apprenticeship_standard_id', selectedJob);

      if (courseSkillsError) {
        return res.status(500).json({ error: courseSkillsError.message });
      }

      matches = courseSkills; // Match logic here
    }

    res.status(200).json(matches);
  }
}
