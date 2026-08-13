/**
 * SkillTrace AI - Module 10: Company Recommendation Dummy Data
 * Separated data structures designed for seamless integration with FastAPI + MongoDB + ML REST APIs.
 */

export const studentProfile = {
  id: "std-9021",
  name: "Alex Morgan",
  careerPath: "Full Stack AI Developer",
  targetRole: "Senior Full Stack Engineer / AI Application Specialist",
  skills: [
    "React",
    "Node.js",
    "Python",
    "MongoDB",
    "FastAPI",
    "TypeScript",
    "Docker",
    "Tailwind CSS",
    "Git",
    "REST APIs"
  ],
  portfolioScore: 88,
  portfolioTier: "Tier A - High Potential",
  placementReadiness: 92,
  readinessStatus: "Hiring Ready",
  assessmentsCompleted: 8,
  projectsCount: 5,
  aiRecommendationInsight:
    "Based on your 88/100 Portfolio Score and high proficiency in React, Python, and Node.js, 12 top-tier companies match your skill matrix. You are in the top 8% of candidates for Full Stack & AI roles."
};

export const companiesData = [
  {
    id: "comp-1",
    name: "Google India",
    tagline: "Organizing the world's information and making it universally accessible.",
    companyType: "MNC",
    logoText: "GOOG",
    logoBg: "#4285F4",
    matchPercentage: 96,
    matchTier: "Strong Match",
    packageLpa: {
      min: 24,
      max: 38,
      text: "₹24 - ₹38 LPA"
    },
    packageValue: 38,
    location: "Bangalore / Hyderabad",
    workMode: "Hybrid",
    eligibility: {
      minCgpa: 8.0,
      degrees: ["B.Tech CS/IT", "M.Tech", "Dual Degree"],
      batch: "2025 / 2026",
      backlogsAllowed: 0,
      text: "CGPA ≥ 8.0 | B.Tech CS/IT/ECE | 2025/2026 Batch"
    },
    suitableRoles: [
      "Software Development Engineer I (SDE-1)",
      "Full Stack AI Developer",
      "Cloud Solutions Associate"
    ],
    requiredSkills: ["React", "Python", "Node.js", "System Design", "Algorithms", "Docker"],
    matchedSkills: ["React", "Python", "Node.js", "Docker"],
    missingSkills: ["System Design", "Algorithms"],
    about:
      "Google India is a global leader in artificial intelligence, cloud computing, search, and enterprise software solutions. The engineering teams in Bangalore and Hyderabad build core backend, search algorithms, and cloud native products used by billions worldwide.",
    employees: "10,000+ employees",
    founded: "1998",
    headquarters: "Mountain View, CA (India HQ: Bangalore)",
    website: "https://careers.google.com",
    cultureHighlights: [
      "20% Time for Innovation",
      "Comprehensive Health & Wellness",
      "Global Mobility Options",
      "Generous Stock Units (GSUs)"
    ],
    hiringProcess: [
      {
        step: 1,
        title: "Online Coding Challenge",
        desc: "90 min test focusing on Data Structures & Dynamic Programming on Google CodePlatform."
      },
      {
        step: 2,
        title: "Technical Interview 1",
        desc: "45 min coding & problem-solving session with a Senior Staff Engineer."
      },
      {
        step: 3,
        title: "System Design & AI Architecture",
        desc: "Scalability, microservices, and database architecture discussion."
      },
      {
        step: 4,
        title: "Googleyness & Leadership Fit",
        desc: "Behavioral interview assessing collaboration, ethics, and adaptability."
      }
    ],
    isFeatured: true,
    openPositionsCount: 18
  },
  {
    id: "comp-2",
    name: "Razorpay",
    tagline: "The financial technology platform powering payments and banking for India.",
    companyType: "Startup",
    logoText: "RAZ",
    logoBg: "#0C2340",
    matchPercentage: 94,
    matchTier: "Strong Match",
    packageLpa: {
      min: 18,
      max: 26,
      text: "₹18 - ₹26 LPA"
    },
    packageValue: 26,
    location: "Bangalore, Karnataka",
    workMode: "Hybrid",
    eligibility: {
      minCgpa: 7.5,
      degrees: ["B.Tech CS/IT/ECE", "MCA"],
      batch: "2025 / 2026",
      backlogsAllowed: 0,
      text: "CGPA ≥ 7.5 | B.Tech / MCA | 2025/2026 Batch"
    },
    suitableRoles: [
      "Frontend Software Engineer",
      "Full Stack Engineer (Payments)",
      "Backend Developer (Go/Node)"
    ],
    requiredSkills: ["React", "TypeScript", "Node.js", "MongoDB", "Redis", "Rest API"],
    matchedSkills: ["React", "TypeScript", "Node.js", "MongoDB", "Rest API"],
    missingSkills: ["Redis"],
    about:
      "Razorpay is India's leading Fintech unicorn, processing billions in transactions annually. Razorpay Engineering focuses on high-concurrency payment gateway infrastructure, developer SDKs, and merchant dashboards.",
    employees: "3,000+ employees",
    founded: "2014",
    headquarters: "Bangalore, Karnataka",
    website: "https://razorpay.com/jobs",
    cultureHighlights: [
      "Fast-paced Ownership Culture",
      "No-Meeting Wednesdays",
      "ESOP Ownership Plan",
      "Learning & Certification Allowance"
    ],
    hiringProcess: [
      {
        step: 1,
        title: "Screening & Coding Assessment",
        desc: "2 coding questions + React component building exercise."
      },
      {
        step: 2,
        title: "Machine Coding Round",
        desc: "2-hour live hands-on feature build with clean code standards."
      },
      {
        step: 3,
        title: "Technical Design Round",
        desc: "Low-level class design & API integration patterns."
      },
      {
        step: 4,
        title: "Culture & Engineering Values",
        desc: "Discussion with Engineering Manager."
      }
    ],
    isFeatured: true,
    openPositionsCount: 14
  },
  {
    id: "comp-3",
    name: "Postman",
    tagline: "The world's leading API platform used by over 30 million developers.",
    companyType: "Product",
    logoText: "POST",
    logoBg: "#FF6C37",
    matchPercentage: 91,
    matchTier: "Strong Match",
    packageLpa: {
      min: 20,
      max: 30,
      text: "₹20 - ₹30 LPA"
    },
    packageValue: 30,
    location: "Remote (India)",
    workMode: "Remote",
    eligibility: {
      minCgpa: 7.0,
      degrees: ["B.Tech CS/IT", "B.Sc CS", "MCA"],
      batch: "2025 / 2026",
      backlogsAllowed: 1,
      text: "CGPA ≥ 7.0 | Open to All Branches | 2025/2026 Batch"
    },
    suitableRoles: [
      "API Platform Engineer",
      "Full Stack Developer (Electron/React)",
      "Developer Experience Engineer"
    ],
    requiredSkills: ["React", "Node.js", "TypeScript", "FastAPI", "API Protocols", "Docker"],
    matchedSkills: ["React", "Node.js", "TypeScript", "FastAPI", "Docker"],
    missingSkills: ["API Protocols"],
    about:
      "Postman simplifies each step of the API lifecycle and streamlines collaboration so you can create better APIs faster. Engineering at Postman builds electron desktop apps, real-time collaboration servers, and developer analytics.",
    employees: "1,500+ employees",
    founded: "2014",
    headquarters: "San Francisco, CA (India Hub: Remote / Bangalore)",
    website: "https://www.postman.com/careers",
    cultureHighlights: [
      "100% Remote-First Choice",
      "Home Office Ergonomic Budget",
      "Unlimited PTO Policy",
      "Global Hackathons & Tech Talks"
    ],
    hiringProcess: [
      {
        step: 1,
        title: "Async API Project Take-home",
        desc: "Build a lightweight API service with React frontend within 48 hours."
      },
      {
        step: 2,
        title: "Code Walkthrough & Architecture",
        desc: "Discussion on your submitted solution with senior developers."
      },
      {
        step: 3,
        title: "Systems & Networking Round",
        desc: "HTTP, WebSockets, REST vs GraphQL architecture."
      },
      {
        step: 4,
        title: "Team Alignment Round",
        desc: "Meet team leads and culture fit review."
      }
    ],
    isFeatured: true,
    openPositionsCount: 11
  },
  {
    id: "comp-4",
    name: "Microsoft India",
    tagline: "Empowering every person and organization on the planet to achieve more.",
    companyType: "MNC",
    logoText: "MSFT",
    logoBg: "#00A4EF",
    matchPercentage: 89,
    matchTier: "Good Match",
    packageLpa: {
      min: 22,
      max: 34,
      text: "₹22 - ₹34 LPA"
    },
    packageValue: 34,
    location: "Hyderabad / Noida",
    workMode: "Hybrid",
    eligibility: {
      minCgpa: 8.0,
      degrees: ["B.Tech CS/IT/ECE", "M.Tech"],
      batch: "2025 / 2026",
      backlogsAllowed: 0,
      text: "CGPA ≥ 8.0 | B.Tech CS/IT/ECE | 2025/2026 Batch"
    },
    suitableRoles: [
      "Software Engineer (Azure & AI)",
      "Full Stack Web Developer",
      "Data & AI Systems Engineer"
    ],
    requiredSkills: ["React", "Python", "TypeScript", "Azure/AWS", "C# / Node.js", "Docker"],
    matchedSkills: ["React", "Python", "TypeScript", "Node.js", "Docker"],
    missingSkills: ["Azure/AWS"],
    about:
      "Microsoft India Development Center (IDC) is one of Microsoft's largest R&D centers outside Redmond. Engineers at IDC work on core technology pillars including Azure Cloud, Copilot AI integrations, Office 365, and Security infrastructure.",
    employees: "18,000+ employees in India",
    founded: "1975",
    headquarters: "Redmond, WA (India HQ: Hyderabad)",
    website: "https://careers.microsoft.com",
    cultureHighlights: [
      "Growth Mindset Culture",
      "Global Hackathons & Patent Bonuses",
      "Flexible Working Hours",
      "Comprehensive Family Medical Coverage"
    ],
    hiringProcess: [
      {
        step: 1,
        title: "Online Assessment (OA)",
        desc: "Codility assessment with 3 DSA questions (Focus on Graphs & Strings)."
      },
      {
        step: 2,
        title: "Technical Interview 1",
        desc: "Problem solving, data structures, and algorithmic complexity."
      },
      {
        step: 3,
        title: "Technical Interview 2",
        desc: "System design, object-oriented design & API optimization."
      },
      {
        step: 4,
        title: "AA (As-Appropriate) Interview",
        desc: "Senior engineering leader evaluation for long-term potential."
      }
    ],
    isFeatured: false,
    openPositionsCount: 22
  },
  {
    id: "comp-5",
    name: "Atlassian",
    tagline: "Unleashing the potential of every team with Jira, Confluence, and Trello.",
    companyType: "Product",
    logoText: "ATLAS",
    logoBg: "#0052CC",
    matchPercentage: 88,
    matchTier: "Good Match",
    packageLpa: {
      min: 26,
      max: 40,
      text: "₹26 - ₹40 LPA"
    },
    packageValue: 40,
    location: "Bangalore (Hybrid) / Remote",
    workMode: "Remote",
    eligibility: {
      minCgpa: 7.5,
      degrees: ["B.Tech CS/IT", "M.Tech"],
      batch: "2025 / 2026",
      backlogsAllowed: 0,
      text: "CGPA ≥ 7.5 | B.Tech CS/IT | 2025/2026 Batch"
    },
    suitableRoles: [
      "Graduate Software Engineer",
      "Full Stack Developer (Frontend heavy)",
      "Cloud Infrastructure Associate"
    ],
    requiredSkills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS", "Docker"],
    matchedSkills: ["React", "TypeScript", "Node.js", "Docker"],
    missingSkills: ["GraphQL", "AWS"],
    about:
      "Atlassian develops enterprise collaboration software including Jira, Confluence, Bitbucket, and Loom. Known for exceptional developer perks, high engineering standards, and work Anywhere policies.",
    employees: "11,000+ employees",
    founded: "2002",
    headquarters: "Sydney, Australia (India Hub: Bangalore)",
    website: "https://www.atlassian.com/company/careers",
    cultureHighlights: [
      "Work Anywhere Policy",
      "ShipIt Hackathons Every Quarter",
      "Generous Equity Grants",
      "Top-rated Parental & Health Benefits"
    ],
    hiringProcess: [
      {
        step: 1,
        title: "Karat Technical Screening",
        desc: "60-minute DSA interview conducted via Karat platform."
      },
      {
        step: 2,
        title: "System Design & Code Quality",
        desc: "Component modularity, state management, and edge cases."
      },
      {
        step: 3,
        title: "Values Interview (Be the Change)",
        desc: "Evaluation against Atlassian core company values."
      }
    ],
    isFeatured: false,
    openPositionsCount: 9
  },
  {
    id: "comp-6",
    name: "TCS Digital",
    tagline: "Pioneering digital transformation & enterprise AI solutions globally.",
    companyType: "Service",
    logoText: "TCS",
    logoBg: "#1F4E79",
    matchPercentage: 86,
    matchTier: "Good Match",
    packageLpa: {
      min: 7,
      max: 11,
      text: "₹7 - ₹11 LPA"
    },
    packageValue: 11,
    location: "PAN India (Bangalore, Pune, Hyderabad, Chennai)",
    workMode: "On-site",
    eligibility: {
      minCgpa: 6.5,
      degrees: ["B.Tech All Streams", "M.Tech", "MCA"],
      batch: "2025 / 2026",
      backlogsAllowed: 1,
      text: "CGPA ≥ 6.5 | Open to All Engineering Streams | 2025/2026 Batch"
    },
    suitableRoles: [
      "Digital Software Engineer",
      "Full Stack Developer Trainee",
      "Cloud & DevOps Associate"
    ],
    requiredSkills: ["React", "Python", "Node.js", "MongoDB", "SQL", "Git"],
    matchedSkills: ["React", "Python", "Node.js", "MongoDB", "Git"],
    missingSkills: ["SQL"],
    about:
      "TCS Digital is the premium engineering wing of Tata Consultancy Services, focusing on advanced digital products, AI/ML deployment, cloud migration, and modern web application development for Fortune 500 clients.",
    employees: "600,000+ employees",
    founded: "1968",
    headquarters: "Mumbai, Maharashtra",
    website: "https://www.tcs.com/careers",
    cultureHighlights: [
      "Structured Learning & Certifications",
      "Global Client Exposure",
      "Job Security & Stability",
      "Fast-track Growth Assessments"
    ],
    hiringProcess: [
      {
        step: 1,
        title: "TCS NQT (National Qualifier Test)",
        desc: "Aptitude + Advanced Coding in C/C++/Java/Python."
      },
      {
        step: 2,
        title: "Technical Interview",
        desc: "Core OOPs, Web Development basics, DBMS & SQL queries."
      },
      {
        step: 3,
        title: "HR & Managerial Round",
        desc: "Location preference, communication skills, and willingness to learn."
      }
    ],
    isFeatured: false,
    openPositionsCount: 45
  },
  {
    id: "comp-7",
    name: "Cisco Systems",
    tagline: "Connecting the world with secure networking, cloud infrastructure, and AI.",
    companyType: "MNC",
    logoText: "CSCO",
    logoBg: "#049FD9",
    matchPercentage: 85,
    matchTier: "Good Match",
    packageLpa: {
      min: 15,
      max: 22,
      text: "₹15 - ₹22 LPA"
    },
    packageValue: 22,
    location: "Bangalore, Karnataka",
    workMode: "Hybrid",
    eligibility: {
      minCgpa: 7.5,
      degrees: ["B.Tech CS/IT/ECE/EEE", "M.Tech"],
      batch: "2025 / 2026",
      backlogsAllowed: 0,
      text: "CGPA ≥ 7.5 | CS / IT / ECE / EEE | 2025/2026 Batch"
    },
    suitableRoles: [
      "Software Engineer - Cloud & Web",
      "Network Automation Engineer",
      "Full Stack Systems Specialist"
    ],
    requiredSkills: ["Python", "React", "Node.js", "Docker", "Kubernetes", "REST APIs"],
    matchedSkills: ["Python", "React", "Node.js", "Docker", "REST APIs"],
    missingSkills: ["Kubernetes"],
    about:
      "Cisco Systems is the worldwide leader in networking, security, and cloud infrastructure. The Cisco India site in Bangalore develops software for Cisco Webex, Meraki cloud dashboard, and secure AI network operations.",
    employees: "80,000+ employees",
    founded: "1984",
    headquarters: "San Jose, CA (India Hub: Bangalore)",
    website: "https://jobs.cisco.com",
    cultureHighlights: [
      "Great Place to Work #1 Certified",
      "Time Off for Volunteering (40 hrs)",
      "Tuition Reimbursement Program",
      "Modern Hybrid Campus Amenities"
    ],
    hiringProcess: [
      {
        step: 1,
        title: "Online Technical Assessment",
        desc: "Networking basics, OS concepts, and 2 coding tasks."
      },
      {
        step: 2,
        title: "Technical Interview 1",
        desc: "Data structures, Python/JavaScript, and Web Architectures."
      },
      {
        step: 3,
        title: "Technical Interview 2",
        desc: "System design, cloud deployment & containers."
      },
      {
        step: 4,
        title: "HR Interview",
        desc: "Behavioral and situational discussion."
      }
    ],
    isFeatured: false,
    openPositionsCount: 16
  },
  {
    id: "comp-8",
    name: "Zepto Tech",
    tagline: "India's fastest growing quick-commerce platform delivering in 10 minutes.",
    companyType: "Startup",
    logoText: "ZEP",
    logoBg: "#7B2CBF",
    matchPercentage: 83,
    matchTier: "Good Match",
    packageLpa: {
      min: 16,
      max: 24,
      text: "₹16 - ₹24 LPA"
    },
    packageValue: 24,
    location: "Bangalore, Karnataka",
    workMode: "On-site",
    eligibility: {
      minCgpa: 7.0,
      degrees: ["B.Tech CS/IT/ECE", "MCA"],
      batch: "2025 / 2026",
      backlogsAllowed: 0,
      text: "CGPA ≥ 7.0 | CS / IT / ECE | 2025/2026 Batch"
    },
    suitableRoles: [
      "SDE-1 (Full Stack)",
      "Frontend Developer (React Native / Web)",
      "Backend Platform Engineer"
    ],
    requiredSkills: ["React", "Node.js", "MongoDB", "Redis", "TypeScript", "FastAPI"],
    matchedSkills: ["React", "Node.js", "MongoDB", "TypeScript", "FastAPI"],
    missingSkills: ["Redis"],
    about:
      "Zepto is a hyper-growth quick commerce startup building real-time inventory management, route optimization, and high-concurrency order processing systems for millions of daily active users.",
    employees: "2,000+ employees",
    founded: "2021",
    headquarters: "Bangalore, Karnataka",
    website: "https://www.zepto.co.in/careers",
    cultureHighlights: [
      "Hyper-Growth Environment",
      "High Ownership & Direct Impact",
      "Lucrative Equity / ESOPs",
      "Free Meals & Transport"
    ],
    hiringProcess: [
      {
        step: 1,
        title: "HackerRank DSA Test",
        desc: "2 medium/hard problem solving questions."
      },
      {
        step: 2,
        title: "Live Machine Coding",
        desc: "Build a real-time order status tracking component in React."
      },
      {
        step: 3,
        title: "Backend & Database Round",
        desc: "MongoDB indexing, concurrency, and Node.js performance."
      },
      {
        step: 4,
        title: "Founder / Engineering VP Round",
        desc: "High energy, problem-solving mindset evaluation."
      }
    ],
    isFeatured: true,
    openPositionsCount: 19
  },
  {
    id: "comp-9",
    name: "Infosys Power Programmer",
    tagline: "Specialized high-end engineering stream driving complex cloud & AI transformations.",
    companyType: "Service",
    logoText: "INFY",
    logoBg: "#007CC3",
    matchPercentage: 82,
    matchTier: "Good Match",
    packageLpa: {
      min: 9,
      max: 14,
      text: "₹9 - ₹14 LPA"
    },
    packageValue: 14,
    location: "Mysore / Bangalore / Pune",
    workMode: "Hybrid",
    eligibility: {
      minCgpa: 6.8,
      degrees: ["B.Tech CS/IT/Circuit", "M.Tech"],
      batch: "2025 / 2026",
      backlogsAllowed: 0,
      text: "CGPA ≥ 6.8 | Engineering Streams | 2025/2026 Batch"
    },
    suitableRoles: [
      "Power Programmer (Full Stack)",
      "Specialist Programmer (AI Systems)",
      "Digital Cloud Architect"
    ],
    requiredSkills: ["React", "Python", "Node.js", "Docker", "FastAPI", "PostgreSQL"],
    matchedSkills: ["React", "Python", "Node.js", "Docker", "FastAPI"],
    missingSkills: ["PostgreSQL"],
    about:
      "Infosys Power Programmer role is a specialized track designed for top coding talent. Power Programmers solve complex architecture challenges, build microservices, and deploy AI frameworks for global enterprises.",
    employees: "300,000+ employees",
    founded: "1981",
    headquarters: "Bangalore, Karnataka",
    website: "https://www.infosys.com/careers",
    cultureHighlights: [
      "World-class Infosys Mysore Global Education Center",
      "Specialized High-Pay Track",
      "Hackathon Awards & Speed Promotions",
      "Global Onsite Opportunities"
    ],
    hiringProcess: [
      {
        step: 1,
        title: "HackWithInfy Coding Contest",
        desc: "3 competitive programming problems of medium-hard difficulty."
      },
      {
        step: 2,
        title: "Deep Technical Interview",
        desc: "Full Stack Architecture, REST APIs, and Algorithmic optimization."
      },
      {
        step: 3,
        title: "HR & Project Allocation",
        desc: "Role alignment and preference selection."
      }
    ],
    isFeatured: false,
    openPositionsCount: 30
  },
  {
    id: "comp-10",
    name: "NIC - National Informatics Centre",
    tagline: "The premier science & technology organization of the Government of India.",
    companyType: "Government",
    logoText: "NIC",
    logoBg: "#0F7A60",
    matchPercentage: 79,
    matchTier: "Moderate Fit",
    packageLpa: {
      min: 8,
      max: 14,
      text: "₹8 - ₹14 LPA"
    },
    packageValue: 14,
    location: "New Delhi / State Capitals",
    workMode: "On-site",
    eligibility: {
      minCgpa: 6.5,
      degrees: ["B.Tech CS/IT/ECE", "M.Sc CS", "MCA"],
      batch: "2025 / 2026",
      backlogsAllowed: 0,
      text: "CGPA ≥ 6.5 | CS / IT / ECE | 2025/2026 Batch"
    },
    suitableRoles: [
      "Scientific Officer / Engineer 'SB'",
      "Full Stack E-Governance Developer",
      "Cyber Security & Systems Associate"
    ],
    requiredSkills: ["Python", "React", "MongoDB", "FastAPI", "Linux", "Security Protocols"],
    matchedSkills: ["Python", "React", "MongoDB", "FastAPI"],
    missingSkills: ["Linux", "Security Protocols"],
    about:
      "National Informatics Centre (NIC) under Ministry of Electronics and Information Technology (MeitY) drives Digital India initiatives. NIC builds nationwide e-Governance applications, digital portals, and cloud infrastructure.",
    employees: "5,000+ Scientists & Engineers",
    founded: "1976",
    headquarters: "New Delhi, India",
    website: "https://www.nic.in",
    cultureHighlights: [
      "Central Government Job Security & Gazetted Status",
      "National Impact E-Governance Projects",
      "7th Pay Commission Allowances & Pension Benefits",
      "Government Quarter Allotment & Canteen Perks"
    ],
    hiringProcess: [
      {
        step: 1,
        title: "NIC Written Examination",
        desc: "Objective MCQ paper covering Computer Science core & Reasoning."
      },
      {
        step: 2,
        title: "Technical Interview Board",
        desc: "Panel interview by Senior Scientists on Web Dev, Networks & OS."
      },
      {
        step: 3,
        title: "Document Verification & Medical",
        desc: "Background verification and government joining process."
      }
    ],
    isFeatured: false,
    openPositionsCount: 8
  },
  {
    id: "comp-11",
    name: "GitLab",
    tagline: "The complete AI-powered DevSecOps platform delivered as a single application.",
    companyType: "Remote",
    logoText: "GITL",
    logoBg: "#E24329",
    matchPercentage: 77,
    matchTier: "Moderate Fit",
    packageLpa: {
      min: 28,
      max: 42,
      text: "₹28 - ₹42 LPA"
    },
    packageValue: 42,
    location: "100% Remote (Global)",
    workMode: "Remote",
    eligibility: {
      minCgpa: 7.0,
      degrees: ["Open to All Degrees"],
      batch: "2025 / 2026",
      backlogsAllowed: 1,
      text: "Open to All Degrees | Strong Open Source Track Record"
    },
    suitableRoles: [
      "Junior Frontend Engineer (Vue/React)",
      "Backend Engineer (Ruby/Go/Python)",
      "DevOps Automation Engineer"
    ],
    requiredSkills: ["React", "TypeScript", "Python", "Docker", "CI/CD Pipelines", "Git"],
    matchedSkills: ["React", "TypeScript", "Python", "Docker", "Git"],
    missingSkills: ["CI/CD Pipelines"],
    about:
      "GitLab is one of the world's largest 100% remote software companies. Engineers build open-source CI/CD automation tools, code review interfaces, and AI coding assistants used by millions of developers.",
    employees: "2,200+ employees across 65+ countries",
    founded: "2014",
    headquarters: "100% Remote (All-Remote Company)",
    website: "https://about.gitlab.com/jobs",
    cultureHighlights: [
      "Complete Work-Life Autonomy",
      "Co-Working Allowance ($300/mo)",
      "Transparent Open Compensation",
      "Bi-annual International Gatherings"
    ],
    hiringProcess: [
      {
        step: 1,
        title: "Async Code Review & Assignment",
        desc: "Review a realistic PR and identify performance improvements."
      },
      {
        step: 2,
        title: "Technical Deep-dive",
        desc: "Discuss Git architecture, state management, and testing frameworks."
      },
      {
        step: 3,
        title: "Values & Async Culture Interview",
        desc: "Assessment of self-direction, communication, and transparency."
      }
    ],
    isFeatured: false,
    openPositionsCount: 7
  },
  {
    id: "comp-12",
    name: "CDAC R&D",
    tagline: "India's premier R&D organization for Supercomputing, Grid & AI systems.",
    companyType: "Government",
    logoText: "CDAC",
    logoBg: "#004B87",
    matchPercentage: 74,
    matchTier: "Moderate Fit",
    packageLpa: {
      min: 7,
      max: 12,
      text: "₹7 - ₹12 LPA"
    },
    packageValue: 12,
    location: "Pune / Noida / Bangalore",
    workMode: "On-site",
    eligibility: {
      minCgpa: 6.5,
      degrees: ["B.Tech CS/IT/ECE", "M.Tech", "MCA"],
      batch: "2025 / 2026",
      backlogsAllowed: 0,
      text: "CGPA ≥ 6.5 | CS / IT / ECE | 2025/2026 Batch"
    },
    suitableRoles: [
      "Project Engineer (Web & AI)",
      "High-Performance Computing Developer",
      "Research Associate"
    ],
    requiredSkills: ["Python", "FastAPI", "React", "Docker", "Parallel Computing", "C++"],
    matchedSkills: ["Python", "FastAPI", "React", "Docker"],
    missingSkills: ["Parallel Computing", "C++"],
    about:
      "Centre for Development of Advanced Computing (C-DAC) is the flagship R&D organization of MeitY for carrying out research in High Performance Computing (PARAM Supercomputers), Grid Computing, and AI applications.",
    employees: "3,500+ Researchers & Engineers",
    founded: "1988",
    headquarters: "Pune, Maharashtra",
    website: "https://www.cdac.in",
    cultureHighlights: [
      "Cutting-edge Supercomputing Infrastructure",
      "Sponsored Higher Education (M.Tech / Ph.D.)",
      "Government R&D Grants & Research Publications",
      "Stable Work-Life Balance"
    ],
    hiringProcess: [
      {
        step: 1,
        title: "C-DAC Common Admission Test / Written Test",
        desc: "Technical MCQs on C, OS, Data Structures & Web Tech."
      },
      {
        step: 2,
        title: "R&D Technical Interview",
        desc: "Discussion on final year project, algorithms, and web stack."
      },
      {
        step: 3,
        title: "HR Finalization",
        desc: "Lab allocation and offer letter issuance."
      }
    ],
    isFeatured: false,
    openPositionsCount: 12
  }
];

export const filterCategories = [
  { id: "All", label: "All Companies", icon: "FiBriefcase" },
  { id: "Product", label: "Product", icon: "FiBox" },
  { id: "Startup", label: "Startup", icon: "FiZap" },
  { id: "MNC", label: "MNC", icon: "FiGlobe" },
  { id: "Service", label: "Service", icon: "FiLayers" },
  { id: "Remote", label: "Remote", icon: "FiHome" },
  { id: "Government", label: "Government", icon: "FiAward" }
];
