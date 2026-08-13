export const placementPrediction = {
  score: 78,
  probability: 74,
  confidence: 'High',
  expectedSalary: '₹6.5L – ₹9L / yr',
  expectedTier: 'Tier 2',
  trend: {
    labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    values: [58, 61, 65, 69, 71, 74],
  },
  explanation: [
    {
      factor: 'Portfolio Score',
      weight: 82,
      detail: 'Strong project depth and consistent GitHub activity carry the most weight.',
    },
    {
      factor: 'Assessment Performance',
      weight: 74,
      detail: 'Programming and DSA scores are solidly above the placement threshold.',
    },
    {
      factor: 'Skill Coverage',
      weight: 66,
      detail: 'Core skills are well covered; System Design is the largest gap pulling this down.',
    },
    {
      factor: 'Resume Quality',
      weight: 64,
      detail: 'Clear structure, but missing quantified impact statements.',
    },
  ],
};
