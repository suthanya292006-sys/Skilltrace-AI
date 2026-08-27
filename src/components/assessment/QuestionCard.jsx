import { Box, FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import DashboardCard from '../ui/DashboardCard';
import { tokens } from '../../styles/theme';

export default function QuestionCard({ question, selectedValue, onSelect }) {
  return (
    <DashboardCard title="Question" subtitle="Choose the best answer" icon={null}>
      <Stack spacing={2.2}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
          {question.question}
        </Typography>
        <Box sx={{ border: `1px solid ${tokens.line}`, borderRadius: 2.5, p: 1.2 }}>
          <RadioGroup value={selectedValue || ''} onChange={(e) => onSelect(e.target.value)}>
            {question.options.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio sx={{ color: tokens.teal, '&.Mui-checked': { color: tokens.teal } }} />}
                label={option}
                sx={{ py: 0.4, mx: 0, borderRadius: 1.5, '&:hover': { bgcolor: 'rgba(15,157,140,0.05)' } }}
              />
            ))}
          </RadioGroup>
        </Box>
      </Stack>
    </DashboardCard>
  );
}
