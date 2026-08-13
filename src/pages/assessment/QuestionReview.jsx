import { Box, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import ReviewQuestionCard from '../../components/assessment/ReviewQuestionCard';

export default function QuestionReview({ questions, answers }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.4 }}>
          Question Review
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Walk through each response with the correct explanation and your submitted answer.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {questions.map((question) => {
          const userAnswer = answers[question.id];
          const status = userAnswer === question.correctAnswer ? 'correct' : userAnswer ? 'incorrect' : 'skipped';
          return (
            <Grid key={question.id} size={{ xs: 12, md: 6 }}>
              <ReviewQuestionCard question={question} userAnswer={userAnswer} status={status} />
            </Grid>
          );
        })}
      </Grid>
    </motion.div>
  );
}
