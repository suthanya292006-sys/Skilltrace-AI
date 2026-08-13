export const currentSkills = ['React', 'Node.js', 'Python', 'DBMS', 'Data Structures', 'Git', 'REST APIs'];

export const missingSkills = ['System Design', 'Docker', 'Unit Testing', 'CI/CD', 'TypeScript'];

export const recommendedSkills = [
  { skill: 'System Design', priority: 'High', reason: 'Required for 6 of your top 8 matched roles' },
  { skill: 'Docker', priority: 'High', reason: 'Appears in most Backend/DevOps job listings you match' },
  { skill: 'Unit Testing', priority: 'Medium', reason: 'Flagged as a weakness in your portfolio analysis' },
  { skill: 'TypeScript', priority: 'Medium', reason: 'Increasingly required alongside React in postings' },
  { skill: 'CI/CD', priority: 'Low', reason: 'Useful complement to your DevOps-adjacent projects' },
];

export const learningRoadmap = [
  { step: 1, title: 'System Design Fundamentals', duration: '2 weeks', status: 'current' },
  { step: 2, title: 'Docker & Containerization', duration: '1 week', status: 'upcoming' },
  { step: 3, title: 'Testing with Jest & React Testing Library', duration: '1.5 weeks', status: 'upcoming' },
  { step: 4, title: 'TypeScript for React Developers', duration: '2 weeks', status: 'upcoming' },
  { step: 5, title: 'CI/CD with GitHub Actions', duration: '1 week', status: 'upcoming' },
];

export const projectSuggestions = [
  {
    title: 'Rate-limited URL Shortener',
    skillsCovered: ['System Design', 'Docker'],
    description: 'Design a URL shortener with a rate limiter, cache layer, and containerized deployment.',
  },
  {
    title: 'Test-covered Task API',
    skillsCovered: ['Unit Testing', 'CI/CD'],
    description: 'Rebuild one existing project with full unit test coverage and an automated pipeline.',
  },
  {
    title: 'Typed Portfolio Dashboard',
    skillsCovered: ['TypeScript'],
    description: 'Convert a small React project to TypeScript to build fluency incrementally.',
  },
];

export const learningResources = [
  { title: 'System Design Primer', platform: 'GitHub', type: 'Free', skill: 'System Design' },
  { title: 'Docker for Beginners', platform: 'YouTube', type: 'Free', skill: 'Docker' },
  { title: 'Testing JavaScript', platform: 'Kent C. Dodds', type: 'Paid', skill: 'Unit Testing' },
  { title: 'TypeScript Deep Dive', platform: 'GitBook', type: 'Free', skill: 'TypeScript' },
  { title: 'GitHub Actions Docs', platform: 'GitHub', type: 'Free', skill: 'CI/CD' },
];

export const improvementTimeline = [
  { milestone: 'Complete System Design fundamentals', eta: 'Week 2' },
  { milestone: 'Ship containerized project', eta: 'Week 3' },
  { milestone: 'Reach 70%+ test coverage on one repo', eta: 'Week 5' },
  { milestone: 'Migrate one project to TypeScript', eta: 'Week 7' },
  { milestone: 'Automate deployment with CI/CD', eta: 'Week 8' },
];
