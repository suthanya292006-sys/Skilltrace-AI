export const skillMetrics = [
  {
    key: 'programming',
    label: 'Programming Skill',
    value: 85,
    level: 'Advanced',
    note: 'Strong across JS, Python and core CS fundamentals.',
  },
  {
    key: 'communication',
    label: 'Communication',
    value: 79,
    level: 'Advanced',
    note: 'Clear written documentation; verbal practice recommended.',
  },
  {
    key: 'problemSolving',
    label: 'Problem Solving',
    value: 72,
    level: 'Intermediate',
    note: 'Consistent DSA scores with room to grow on hard problems.',
  },
  {
    key: 'databaseKnowledge',
    label: 'Database Knowledge',
    value: 66,
    level: 'Intermediate',
    note: 'Solid SQL basics; normalization concepts need reinforcement.',
  },
  {
    key: 'systemDesign',
    label: 'System Design',
    value: 48,
    level: 'Beginner',
    note: 'Biggest growth area — start with one small case study.',
  },
];

export function levelFromScore(score) {
  if (score >= 85) return 'Expert';
  if (score >= 70) return 'Advanced';
  if (score >= 50) return 'Intermediate';
  return 'Beginner';
}

export const overallSkillLevel = Math.round(
  skillMetrics.reduce((sum, s) => sum + s.value, 0) / skillMetrics.length
);
