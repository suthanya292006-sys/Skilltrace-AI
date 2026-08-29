import { useEffect, useMemo, useState } from 'react';
import { Box, Typography, Grid, Alert, CircularProgress } from '@mui/material';

import CareerCard from '../../components/career/CareerCard';
import CareerSortControl from '../../components/career/CareerSortControl';
import { careerRecommendations } from '../../utils/careerRecommendationData';

const API_URL = 'http://127.0.0.1:8000';

function parseSalaryUpper(range) {
  if (!range) return 0;

  const matches = range.match(/₹(\d+)L/g) || [];

  const nums = matches.map((m) =>
    parseInt(m.replace(/[₹L]/g, ''), 10)
  );

  return nums.length ? Math.max(...nums) : 0;
}

function parseGrowth(growth) {
  if (!growth) return 0;

  const match = growth.match(/(\d+)%/);

  return match ? parseInt(match[1], 10) : 0;
}

/*
  Convert different possible skill formats into
  the 0/1 values required by the ML model.
*/

function hasSkill(skills, possibleNames) {
  if (!Array.isArray(skills)) return false;

  return skills.some((skill) => {
    const value =
      typeof skill === 'string'
        ? skill
        : skill?.name || skill?.skill || skill?.title || '';

    const normalized = value.toLowerCase().trim();

    return possibleNames.some(
      (name) => normalized === name || normalized.includes(name)
    );
  });
}

function getStoredUserData() {
  /*
    We try common localStorage keys used by the project.

    If your project already stores the logged-in user's
    information in localStorage, this will pick it up.
  */

  const possibleKeys = [
    'user',
    'currentUser',
    'loggedInUser',
    'profile',
    'portfolio',
    'portfolioData',
    'userData',
  ];

  let combinedData = {};

  possibleKeys.forEach((key) => {
    try {
      const value = localStorage.getItem(key);

      if (value) {
        const parsed = JSON.parse(value);

        if (parsed && typeof parsed === 'object') {
          combinedData = {
            ...combinedData,
            ...parsed,
          };
        }
      }
    } catch (error) {
      console.warn(`Unable to read ${key} from localStorage`);
    }
  });

  /*
    Try to retrieve skills from separate storage.
  */

  const skillKeys = [
    'skills',
    'userSkills',
    'selectedSkills',
    'portfolioSkills',
  ];

  let allSkills = [];

  skillKeys.forEach((key) => {
    try {
      const value = localStorage.getItem(key);

      if (value) {
        const parsed = JSON.parse(value);

        if (Array.isArray(parsed)) {
          allSkills = [...allSkills, ...parsed];
        }
      }
    } catch (error) {
      console.warn(`Unable to read ${key}`);
    }
  });

  /*
    Also check if skills already exist inside the user object.
  */

  if (Array.isArray(combinedData.skills)) {
    allSkills = [...allSkills, ...combinedData.skills];
  }

  if (Array.isArray(combinedData.userSkills)) {
    allSkills = [...allSkills, ...combinedData.userSkills];
  }

  return {
    ...combinedData,
    skills: allSkills,
  };
}

/*
  Convert user's actual skills into ML model features.
*/

function createModelInput(userData) {
  const skills = userData.skills || [];

  const assessmentScore =
    Number(
      userData.assessmentScore ??
        userData.Assessment_Score ??
        userData.assessment_score ??
        userData.score ??
        userData.totalAssessmentScore ??
        0
    ) || 0;

  const portfolioScore =
    Number(
      userData.portfolioScore ??
        userData.Portfolio_Score ??
        userData.portfolio_score ??
        userData.portfolioAnalysisScore ??
        0
    ) || 0;

  const numberOfProjects =
    Number(
      userData.numberOfProjects ??
        userData.Number_of_Projects ??
        userData.projectCount ??
        userData.projectsCount ??
        (Array.isArray(userData.projects)
          ? userData.projects.length
          : 0)
    ) || 0;

  return {
    Python: hasSkill(skills, ['python']) ? 1 : 0,

    Java: hasSkill(skills, ['java']) ? 1 : 0,

    JavaScript: hasSkill(skills, [
      'javascript',
      'js',
    ])
      ? 1
      : 0,

    SQL: hasSkill(skills, [
      'sql',
      'mysql',
      'postgresql',
      'database',
    ])
      ? 1
      : 0,

    Machine_Learning: hasSkill(skills, [
      'machine learning',
      'machine-learning',
      'ml',
      'tensorflow',
      'scikit-learn',
      'sklearn',
    ])
      ? 1
      : 0,

    Data_Analysis: hasSkill(skills, [
      'data analysis',
      'data-analysis',
      'data analytics',
      'pandas',
      'numpy',
    ])
      ? 1
      : 0,

    Web_Development: hasSkill(skills, [
      'web development',
      'web-development',
      'html',
      'css',
      'react',
      'node.js',
      'nodejs',
      'express',
    ])
      ? 1
      : 0,

    Cybersecurity: hasSkill(skills, [
      'cybersecurity',
      'cyber security',
      'ethical hacking',
      'network security',
    ])
      ? 1
      : 0,

    Cloud: hasSkill(skills, [
      'cloud',
      'aws',
      'azure',
      'google cloud',
      'gcp',
    ])
      ? 1
      : 0,

    DevOps: hasSkill(skills, [
      'devops',
      'docker',
      'kubernetes',
      'jenkins',
      'ci/cd',
      'cicd',
    ])
      ? 1
      : 0,

    UI_UX: hasSkill(skills, [
      'ui/ux',
      'ui ux',
      'ui',
      'ux',
      'figma',
      'user interface',
      'user experience',
    ])
      ? 1
      : 0,

    Number_of_Projects: numberOfProjects,

    Assessment_Score: assessmentScore,

    Portfolio_Score: portfolioScore,
  };
}

export default function CareerRecommendationPage() {
  const [sortBy, setSortBy] = useState('match');

  const [recommendedCareer, setRecommendedCareer] =
    useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  const [modelInput, setModelInput] = useState(null);

  useEffect(() => {
    fetchCareerRecommendation();
  }, []);

  async function fetchCareerRecommendation() {
    try {
      setLoading(true);
      setError('');

      /*
        Get the currently logged-in user's data.
      */

      const userData = getStoredUserData();

      console.log(
        'Current user data:',
        userData
      );

      /*
        Convert the user's data into the
        format expected by the trained ML model.
      */

      const input = createModelInput(userData);

      console.log(
        'ML model input:',
        input
      );

      setModelInput(input);

      /*
        Send data to FastAPI.
      */

      const response = await fetch(
        `${API_URL}/predict`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },

          body: JSON.stringify(input),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Backend returned ${response.status}`
        );
      }

      const result = await response.json();

      console.log(
        'ML recommendation:',
        result
      );

      if (result.error) {
        throw new Error(result.error);
      }

      if (!result.recommended_career) {
        throw new Error(
          'No career recommendation was returned by the AI model.'
        );
      }

      setRecommendedCareer(
        result.recommended_career
      );
    } catch (err) {
      console.error(
        'Career recommendation error:',
        err
      );

      setError(
        err.message ||
          'Failed to fetch career recommendation.'
      );
    } finally {
      setLoading(false);
    }
  }

  /*
    Find the matching career from your existing
    career recommendation data.

    This keeps your existing CareerCard design.
  */

  const recommendationList = useMemo(() => {
    if (!recommendedCareer) {
      return [];
    }

    const normalizedPrediction =
      recommendedCareer
        .toLowerCase()
        .trim();

    const matchingCareer =
      careerRecommendations.find(
        (career) => {
          const title =
            career.title ||
            career.name ||
            career.role ||
            '';

          const normalizedTitle =
            title.toLowerCase().trim();

          return (
            normalizedTitle ===
              normalizedPrediction ||
            normalizedTitle.includes(
              normalizedPrediction
            ) ||
            normalizedPrediction.includes(
              normalizedTitle
            )
          );
        }
      );

    if (matchingCareer) {
      return [
        {
          ...matchingCareer,

          /*
            Mark this as the AI recommendation.
          */

          match: 100,

          aiRecommended: true,
        },
      ];
    }

    /*
      If the ML model returns a career that isn't
      present in careerRecommendationData.js,
      create a basic card instead of showing nothing.
    */

    return [
      {
        key: recommendedCareer
          .toLowerCase()
          .replace(/\s+/g, '-'),

        title: recommendedCareer,

        name: recommendedCareer,

        description:
          'AI-recommended career based on your skills, assessment performance, and portfolio.',

        match: 100,

        growth: 'AI matched',

        salaryRange: 'Based on current market',

        aiRecommended: true,
      },
    ];
  }, [recommendedCareer]);

  /*
    Sorting is kept from your existing page.
  */

  const sorted = useMemo(() => {
    const list = [
      ...recommendationList,
    ];

    if (sortBy === 'match') {
      return list.sort(
        (a, b) =>
          (b.match || 0) -
          (a.match || 0)
      );
    }

    if (sortBy === 'salary') {
      return list.sort(
        (a, b) =>
          parseSalaryUpper(
            b.salaryRange
          ) -
          parseSalaryUpper(
            a.salaryRange
          )
      );
    }

    if (sortBy === 'growth') {
      return list.sort(
        (a, b) =>
          parseGrowth(b.growth) -
          parseGrowth(a.growth)
      );
    }

    return list;
  }, [
    recommendationList,
    sortBy,
  ]);

  return (
    <Box>
      {/* Header */}

      <Box
        sx={{
          mb: 3,

          display: 'flex',

          flexDirection: {
            xs: 'column',
            sm: 'row',
          },

          alignItems: {
            sm: 'flex-end',
          },

          justifyContent:
            'space-between',

          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              mb: 0.4,
            }}
          >
            Career Recommendation
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
            }}
          >
            AI-matched roles based on
            your skills, projects, and
            assessments.
          </Typography>
        </Box>

        <CareerSortControl
          value={sortBy}
          onChange={setSortBy}
        />
      </Box>

      {/* Error */}

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
        >
          {error}
        </Alert>
      )}

      {/* Loading */}

      {loading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            py: 8,
            gap: 2,
          }}
        >
          <CircularProgress
            size={28}
          />

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Analyzing your skills,
            assessments and portfolio...
          </Typography>
        </Box>
      )}

      {/* Recommendation */}

      {!loading &&
        !error &&
        sorted.length > 0 && (
          <>
            <Grid
              container
              spacing={2.5}
            >
              {sorted.map((career) => (
                <Grid
                  key={career.key}
                  size={{
                    xs: 12,
                    sm: 6,
                    lg: 4,
                  }}
                >
                  <CareerCard
                    career={career}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}

      {/* No recommendation */}

      {!loading &&
        !error &&
        sorted.length === 0 && (
          <Alert severity="info">
            Complete your skills,
            assessment and portfolio
            information to get an AI
            career recommendation.
          </Alert>
        )}

      {/* Debug information - remove later if not needed */}

      {modelInput && !loading && (
        <Box
          sx={{
            mt: 3,
            display: 'none',
          }}
        >
          <pre>
            {JSON.stringify(
              modelInput,
              null,
              2
            )}
          </pre>
        </Box>
      )}
    </Box>
  );
}
