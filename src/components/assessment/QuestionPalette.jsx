import { Box, Stack, Typography } from '@mui/material';
import { tokens } from '../../styles/theme';

const paletteColors = {
  answered: tokens.teal,
  unanswered: 'rgba(102,112,133,0.22)',
  marked: tokens.amber,
  current: tokens.tealDark,
};

export default function QuestionPalette({ questions, answers, markedForReview, currentIndex, onSelectQuestion }) {
  return (
    <Box sx={{ border: `1px solid ${tokens.line}`, borderRadius: 3, p: 2, bgcolor: 'background.paper', position: 'sticky', top: 90 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.2 }}>
        Question Palette
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 1 }}>
        {questions.map((question, index) => {
          const status = markedForReview.includes(question.id) ? 'marked' : answers[question.id] !== undefined ? 'answered' : 'unanswered';
          const isCurrent = index === currentIndex;
          return (
            <Box
              key={question.id}
              onClick={() => onSelectQuestion(index)}
              sx={{
                borderRadius: 1.8,
                border: `1px solid ${tokens.line}`,
                p: 1,
                textAlign: 'center',
                cursor: 'pointer',
                bgcolor: isCurrent ? 'rgba(15,157,140,0.1)' : 'transparent',
                color: isCurrent ? tokens.tealDark : 'text.primary',
              }}
            >
              <Box sx={{ width: '100%', height: 8, borderRadius: 999, bgcolor: paletteColors[status], mb: 0.8 }} />
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {index + 1}
              </Typography>
            </Box>
          );
        })}
      </Box>
      <Stack spacing={1.2} sx={{ mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: tokens.teal }} /> <Typography variant="caption">Answered</Typography></Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'rgba(102,112,133,0.22)' }} /> <Typography variant="caption">Unanswered</Typography></Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: tokens.amber }} /> <Typography variant="caption">Marked</Typography></Box>
      </Stack>
    </Box>
  );
}
