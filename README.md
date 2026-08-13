# SkillTrace AI — Frontend

React + Vite + MUI frontend for SkillTrace AI, built module by module.

## Stack
React 19 · Vite · Material UI v9 · React Router DOM v7 · Axios · React Hook Form · Framer Motion · Chart.js (react-chartjs-2) · React Icons

## Getting started
```bash
npm install
npm run dev
```
Then open the printed local URL. The app starts at `/` (splash screen) and flows:
`/` → `/welcome` → `/login` or `/register` → `/dashboard`.

You can also jump straight to a route, e.g. `/dashboard`, `/register`, `/forgot-password`.

## Design system
Tokens live in `src/styles/theme.js`:
- **Ink Navy** `#101828` — dark surfaces / primary text
- **Signal Teal** `#0F9D8C` — primary brand & "growth" accent
- **Amber Spark** `#F5A623` — achievement / score highlight
- **Slate** `#667085` — secondary text · **Line** `#E4E7EC` — borders

Type: **Space Grotesk** (display/headings) + **Inter** (body/UI) + **IBM Plex Mono** (scores, stats, data).

Signature element: `TrajectoryMark` (`src/components/ui/TrajectoryMark.jsx`) — a rising, animated
skill-growth curve reused across the splash screen, auth side panel and dashboard, tying visually
back to the product name "SkillTrace."

## Module status

### Module 1 — Authentication (`pages/auth`) — done
- `SplashScreen.jsx` — animated logo + trajectory reveal, auto-redirects to Welcome
- `WelcomePage.jsx` — marketing hero with stats + CTA
- `LoginPage.jsx` — email/password, show/hide password, Remember me, Google button (UI only), validation via React Hook Form
- `RegisterPage.jsx` — full name, email, password + confirm, terms checkbox, validation
- `ForgotPasswordPage.jsx` — email submit -> success confirmation state
- Shared: `layouts/AuthLayout.jsx` (split-screen brand panel), `components/common/PasswordField.jsx`, `components/common/GoogleAuthButton.jsx`

### Module 2 — Student Dashboard (`pages/dashboard`, `components/dashboard`) — done
- `DashboardHeader.jsx` — search, notifications dropdown, avatar
- `Sidebar.jsx` — primary nav (routes are stubbed for Modules 3-15)
- `WelcomeCard.jsx`, `ProfileSummaryCard.jsx`, `PortfolioScoreCard.jsx` (radar chart),
  `SkillLevelCard.jsx` (progress bars), `PlacementProbabilityCard.jsx` (circular gauge),
  `CareerRecommendationCard.jsx`, `AITipsCard.jsx`, `RecentActivityTimeline.jsx`,
  `NotificationsMenu.jsx`, `QuickActions.jsx`
- Assembled in `DashboardPage.jsx` behind `layouts/DashboardLayout.jsx`

All data on these pages is local mock/sample data — no API calls are wired yet.

### Module 3 — Portfolio Management (`pages/portfolio`, `components/portfolio`) — done
Tabbed page (`PortfolioPage.jsx`) at `/portfolio`:
- `ResumeUpload.jsx` — drag & drop, click-to-browse, simulated upload progress, uploaded-file card
- `ProjectsSection.jsx` + `ProjectDialog.jsx` — gallery grid, add/edit/delete via dialog
- `CertificationsSection.jsx` — upload list, remove certificate
- `SkillsSection.jsx` — add-on-Enter skill chips with delete
- `SocialLinksSection.jsx` — GitHub + LinkedIn profile fields with save state

All data is local component state (no persistence/API yet).

### Module 4 — AI Portfolio Analysis (`pages/portfolio/AIPortfolioAnalysis.jsx`, `components/portfolio`) — done
Score breakdown (Technical Depth, Documentation Quality, Innovation, Industry Readiness), skill
extraction, technology grid, resume keywords, strengths/weaknesses, and recommendations — backed by
`services/portfolioAnalysisService.js` and `utils/portfolioAnalysisData.js`. Route: `/dashboard/portfolio-analysis`.

### Module 5 — Online Skill Assessment (`pages/assessment`, `components/assessment`) — done
Full assessment flow (`AssessmentPageFlow.jsx`): home/category picker, instructions, timed question
flow with palette/navigation, submission, results with pie/radar charts, and review — backed by
`services/assessmentService.js` and `utils/assessmentDummyData.js`. Route: `/assessment`.

### Module 6 — Skill Analysis Dashboard (`pages/skills`, `components/skills`) — done
`SkillAnalysisDashboard.jsx` at `/skills`:
- `OverallSkillCard.jsx` — weighted overall score with circular gauge + level tag
- `SkillRadarCard.jsx` — radar across all five tracked dimensions
- `SkillDistributionCard.jsx` — pie chart of skill-weight composition
- `SkillBreakdownGrid.jsx` + `SkillProgressCard.jsx` — one card each for Programming, Communication,
  Problem Solving, Database Knowledge, and System Design, with progress bar + level chip
- Mock data centralized in `utils/skillAnalysisData.js`

### Module 7 — Career Recommendation (`pages/career`, `components/career`) — done
`CareerRecommendationPage.jsx` at `/career`:
- `CareerCard.jsx` — description, required skills, salary range, growth outlook, and career match %
  for each of the 8 roles from the roadmap (ML Engineer, Data Scientist, Backend/Full Stack Developer,
  Cloud Engineer, DevOps Engineer, Cybersecurity Analyst, QA Engineer)
- `CareerSortControl.jsx` — sort by best match, salary, or growth
- Mock data centralized in `utils/careerRecommendationData.js`

### Module 8 — Placement Prediction (`pages/placement`, `components/placement`) — done
`PlacementPredictionPage.jsx` at `/placement`:
- `PlacementScoreCard.jsx` — half-circle gauge (new `charts/GaugeChart.jsx`) for the composite score
- `ProbabilityConfidenceCard.jsx` — placement probability + confidence, reusing `CircularScoreChart`
- `ExpectedOutcomesCard.jsx` — expected salary range and expected company tier
- `PlacementTrendCard.jsx` — 6-month probability trend (new `charts/TrendLineChart.jsx`)
- `PredictionExplanationCard.jsx` — weighted factors behind the prediction, most influential first
- Mock data centralized in `utils/placementPredictionData.js`

### Module 9 — Skill Gap Analysis (`pages/skillgap`, `components/skillgap`) — done
`SkillGapAnalysisPage.jsx` at `/skill-gap`:
- `CurrentSkillsCard.jsx` / `MissingSkillsCard.jsx` — what you have vs. what's missing, as chip sets
- `RecommendedSkillsCard.jsx` — priority-tagged skills with the reasoning behind each
- `LearningRoadmapCard.jsx` — ordered step timeline with current-step highlight
- `ProjectSuggestionsCard.jsx` — project ideas mapped to the specific skills they'd close
- `LearningResourcesCard.jsx` — curated resources tagged free/paid per skill
- `ImprovementTimelineCard.jsx` — horizontal milestone timeline over the next 8 weeks
- Mock data centralized in `utils/skillGapData.js`

### Modules 10-15 — not started
Folder scaffolding exists (`components/`, `pages/`) per the roadmap, but not yet implemented.
Sidebar links to `/companies`, `/reports`, `/profile`, `/settings` are present but have no
routes/pages yet — add them to `routes/AppRoutes.jsx` as each module is built.

## Notes for next modules
- Wire `LoginPage` / `RegisterPage` submit handlers to a real `services/authService.js` once the
  backend is ready — they currently just simulate a network call and redirect.
- Reuse `DashboardCard` (`components/ui/DashboardCard.jsx`) as the base wrapper for any new
  dashboard-style card so spacing/typography stay consistent.
- Chart.js elements are registered once in `components/charts/chartSetup.js` — import it (side-effect
  only) in any new chart component instead of re-registering.
