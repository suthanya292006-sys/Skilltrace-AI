import { Box, Button, Chip, Grid, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { FiInfo } from 'react-icons/fi';
import DashboardCard from '../../components/ui/DashboardCard';
import { tokens } from '../../styles/theme';

const rules = [
  'Each assessment contains 6 carefully curated questions.',
  'You will have a fixed time window; the timer auto-submits when it reaches zero.',
  'There is no negative marking for unanswered questions.',
  'You can review and change answers before final submission.',
];

export default function AssessmentInstructions({ assessment, onStart }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.4 }}>
          Assessment Instructions
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Review the rules before you begin your {assessment.title} assessment.
        </Typography>
      </Box>

      <DashboardCard title="Before You Begin" subtitle="Please read these guidelines carefully" icon={FiInfo}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={1.8}>
              {rules.map((rule) => (
                <Box key={rule} sx={{ border: `1px solid ${tokens.line}`, borderRadius: 2.5, p: 1.6 }}>
                  <Typography variant="body2">{rule}</Typography>
                </Box>
              ))}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ border: `1px solid ${tokens.line}`, borderRadius: 3, p: 2.6, bgcolor: 'background.default' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                Assessment Details
              </Typography>
              <Stack spacing={1.2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography variant="body2" sx={{ color: 'text.secondary' }}>Category</Typography><Typography variant="body2" sx={{ fontWeight: 600 }}>{assessment.title}</Typography></Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography variant="body2" sx={{ color: 'text.secondary' }}>Passing Marks</Typography><Typography variant="body2" sx={{ fontWeight: 600 }}>60%</Typography></Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography variant="body2" sx={{ color: 'text.secondary' }}>Negative Marking</Typography><Typography variant="body2" sx={{ fontWeight: 600 }}>None</Typography></Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography variant="body2" sx={{ color: 'text.secondary' }}>Duration</Typography><Typography variant="body2" sx={{ fontWeight: 600 }}>{assessment.estimatedTime}</Typography></Box>
              </Stack>
              <Chip label="Navigation Rules: You can move between questions anytime" sx={{ mt: 2, bgcolor: 'rgba(15,157,140,0.08)', color: tokens.tealDark, fontWeight: 600 }} />
              <Button variant="contained" fullWidth onClick={onStart} sx={{ mt: 2.4 }}>
                Start Assessment
              </Button>
            </Box>
          </Grid>
        </Grid>
      </DashboardCard>
    </motion.div>
  );
}
