import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { FiPlayCircle } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import { tokens } from '../../styles/theme';

const difficultyColor = {
  Easy: tokens.teal,
  Intermediate: tokens.amber,
  Hard: tokens.danger,
};

export default function AssessmentCard({ assessment, onStart }) {
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} whileHover={{ y: -3, scale: 1.01 }}>
      <DashboardCard title={assessment.title} subtitle={assessment.description} icon={FiPlayCircle}>
        <Stack spacing={1.8} sx={{ pt: 0.2 }}>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip label={assessment.difficulty} size="small" sx={{ bgcolor: 'rgba(15,157,140,0.08)', color: tokens.tealDark, fontWeight: 600 }} />
            <Chip label={`${assessment.questionCount} questions`} size="small" sx={{ bgcolor: 'rgba(102,112,133,0.08)', color: 'text.secondary' }} />
          </Stack>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'text.secondary' }}>
            <Typography variant="body2">Duration</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
              {assessment.estimatedTime}
            </Typography>
          </Box>

          <Button variant="contained" onClick={() => onStart(assessment.id)} sx={{ alignSelf: 'flex-start', mt: 0.4 }}>
            Start Assessment
          </Button>
        </Stack>
      </DashboardCard>
    </motion.div>
  );
}
