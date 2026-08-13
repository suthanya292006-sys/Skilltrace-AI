import { useEffect, useState } from 'react';
import { Box, Grid, Skeleton, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { FiPlayCircle } from 'react-icons/fi';
import AssessmentCard from '../../components/assessment/AssessmentCard';
import { getAssessmentCatalog } from '../../services/assessmentService';
import { tokens } from '../../styles/theme';

export default function AssessmentHome({ navigateToAssessment }) {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await getAssessmentCatalog();
      setAssessments(data);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <Box>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.4 }}>
            Online Skill Assessment
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Choose a category and begin a structured assessment aligned with your growth path.
          </Typography>
        </Box>
      </motion.div>

      {loading ? (
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid key={item} size={{ xs: 12, md: 6 }}>
              <Skeleton variant="rounded" height={220} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={3}>
          {assessments.map((assessment) => (
            <Grid key={assessment.id} size={{ xs: 12, md: 6 }}>
              <AssessmentCard assessment={assessment} onStart={navigateToAssessment} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
