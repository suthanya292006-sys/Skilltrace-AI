import { Box, Button, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import DashboardCard from '../../components/ui/DashboardCard';
import { tokens } from '../../styles/theme';

export default function AssessmentSubmitted({ onViewResults }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }}>
      <DashboardCard title="Assessment Submitted" subtitle="Your responses have been recorded successfully" icon={FiCheckCircle}>
        <Box sx={{ py: 2, textAlign: 'center' }}>
          <Box sx={{ width: 72, height: 72, borderRadius: '50%', bgcolor: 'rgba(15,157,140,0.1)', color: tokens.tealDark, display: 'grid', placeItems: 'center', mx: 'auto', mb: 2 }}>
            <FiCheckCircle size={34} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            Assessment Submitted
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
            Your responses are being evaluated. You can view your analytics and review your answers next.
          </Typography>
          <Button variant="contained" onClick={onViewResults}>
            View Results
          </Button>
        </Box>
      </DashboardCard>
    </motion.div>
  );
}
