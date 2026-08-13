import { Box, Chip, Stack, Typography } from '@mui/material';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import { tokens } from '../../styles/theme';

export default function ReviewQuestionCard({ question, userAnswer, status }) {
  return (
    <DashboardCard title={`Q${question.id}`} subtitle={question.question} icon={status === 'correct' ? FiCheckCircle : FiAlertCircle}>
      <Stack spacing={1.3}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>Your answer</Typography>
          <Chip label={userAnswer || 'Skipped'} size="small" sx={{ bgcolor: 'rgba(102,112,133,0.08)', color: 'text.secondary' }} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>Correct answer</Typography>
          <Chip label={question.correctAnswer} size="small" sx={{ bgcolor: 'rgba(15,157,140,0.08)', color: tokens.tealDark, fontWeight: 600 }} />
        </Box>
        <Chip label={status === 'correct' ? 'Correct' : status === 'incorrect' ? 'Incorrect' : 'Skipped'} sx={{ bgcolor: status === 'correct' ? 'rgba(15,157,140,0.1)' : status === 'incorrect' ? 'rgba(228,87,46,0.12)' : 'rgba(102,112,133,0.1)', color: status === 'correct' ? tokens.tealDark : status === 'incorrect' ? tokens.danger : 'text.secondary', alignSelf: 'flex-start', fontWeight: 700 }} />
        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
          {question.explanation}
        </Typography>
      </Stack>
    </DashboardCard>
  );
}
