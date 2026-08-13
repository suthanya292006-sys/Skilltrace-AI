import {
  FiCpu,
  FiDatabase,
  FiServer,
  FiLayers,
  FiCloud,
  FiGitMerge,
  FiShield,
  FiCheckSquare,
} from 'react-icons/fi';

export const careerRecommendations = [
  {
    key: 'ml-engineer',
    title: 'Machine Learning Engineer',
    icon: FiCpu,
    description:
      'Builds and deploys models that power intelligent product features, from data pipelines to production inference.',
    requiredSkills: ['Python', 'TensorFlow/PyTorch', 'Statistics', 'SQL', 'MLOps'],
    salaryRange: '₹8L – ₹22L / yr',
    growth: '+24% (5 yr outlook)',
    match: 61,
  },
  {
    key: 'data-scientist',
    title: 'Data Scientist',
    icon: FiDatabase,
    description:
      'Turns raw data into decisions — statistical modeling, experimentation, and clear storytelling with numbers.',
    requiredSkills: ['Python', 'SQL', 'Statistics', 'Data Visualization', 'A/B Testing'],
    salaryRange: '₹7L – ₹20L / yr',
    growth: '+21% (5 yr outlook)',
    match: 64,
  },
  {
    key: 'backend-developer',
    title: 'Backend Developer',
    icon: FiServer,
    description:
      'Designs and maintains the APIs, services, and databases that power applications behind the scenes.',
    requiredSkills: ['Node.js', 'REST APIs', 'SQL/NoSQL', 'System Design', 'Docker'],
    salaryRange: '₹6L – ₹18L / yr',
    growth: '+18% (5 yr outlook)',
    match: 81,
  },
  {
    key: 'fullstack-developer',
    title: 'Full Stack Developer',
    icon: FiLayers,
    description:
      'Owns both the interface and the server behind it — a strong fit for builders who like end-to-end ownership.',
    requiredSkills: ['React', 'Node.js', 'REST APIs', 'SQL', 'Git'],
    salaryRange: '₹6L – ₹19L / yr',
    growth: '+19% (5 yr outlook)',
    match: 88,
  },
  {
    key: 'cloud-engineer',
    title: 'Cloud Engineer',
    icon: FiCloud,
    description:
      'Architects and manages the cloud infrastructure that applications run on, with a focus on scalability and cost.',
    requiredSkills: ['AWS/Azure/GCP', 'Terraform', 'Networking', 'Linux', 'CI/CD'],
    salaryRange: '₹7L – ₹21L / yr',
    growth: '+22% (5 yr outlook)',
    match: 52,
  },
  {
    key: 'devops-engineer',
    title: 'DevOps Engineer',
    icon: FiGitMerge,
    description:
      'Bridges development and operations — automating builds, deployments, and monitoring for reliable releases.',
    requiredSkills: ['CI/CD', 'Docker', 'Kubernetes', 'Linux', 'Scripting'],
    salaryRange: '₹7L – ₹20L / yr',
    growth: '+20% (5 yr outlook)',
    match: 55,
  },
  {
    key: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    icon: FiShield,
    description:
      'Monitors, investigates, and defends systems against threats — a mix of vigilance and technical depth.',
    requiredSkills: ['Networking', 'SIEM Tools', 'Linux', 'Threat Analysis', 'Scripting'],
    salaryRange: '₹6L – ₹18L / yr',
    growth: '+27% (5 yr outlook)',
    match: 41,
  },
  {
    key: 'qa-engineer',
    title: 'QA Engineer',
    icon: FiCheckSquare,
    description:
      'Designs test strategy and automation that catches bugs before users do — precision-minded and detail-driven.',
    requiredSkills: ['Test Automation', 'Selenium/Playwright', 'API Testing', 'SQL', 'CI/CD'],
    salaryRange: '₹5L – ₹15L / yr',
    growth: '+14% (5 yr outlook)',
    match: 58,
  },
];
