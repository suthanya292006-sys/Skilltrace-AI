import { useEffect, useMemo, useState } from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import AssessmentHeader from '../../components/assessment/AssessmentHeader';
import QuestionCard from '../../components/assessment/QuestionCard';
import QuestionPalette from '../../components/assessment/QuestionPalette';
import NavigationButtons from '../../components/assessment/NavigationButtons';
import ProgressTracker from '../../components/assessment/ProgressTracker';
import Timer from '../../components/assessment/Timer';
import { getAssessment } from '../../services/assessmentService';

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export default function AssessmentPage({ assessmentId, onSubmit, onReview }) {
  const [assessment, setAssessment] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState([]);
  const [timeLeft, setTimeLeft] = useState(1800);
  const [status, setStatus] = useState('In Progress');

  useEffect(() => {
    const load = async () => {
      const data = await getAssessment(assessmentId);
      setAssessment(data);
      setTimeLeft(data.duration);
    };
    load();
  }, [assessmentId]);

  useEffect(() => {
    if (!assessment) return;
    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          onSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [assessment, onSubmit]);

  const currentQuestion = assessment?.questions[currentIndex];
  const answeredCount = useMemo(() => Object.keys(answers).filter((key) => answers[key] !== undefined).length, [answers]);

  const selectAnswer = (value) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleMark = () => {
    if (!currentQuestion) return;
    setMarkedForReview((prev) => (prev.includes(currentQuestion.id) ? prev : [...prev, currentQuestion.id]));
  };

  const handleClear = () => {
    if (!currentQuestion) return;
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[currentQuestion.id];
      return next;
    });
    setMarkedForReview((prev) => prev.filter((id) => id !== currentQuestion.id));
  };

  const handleNext = () => {
    if (assessment && currentIndex < assessment.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (!assessment) {
    return <Typography variant="body2">Loading assessment…</Typography>;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Stack spacing={2.4}>
        <AssessmentHeader title={assessment.title} questionNumber={currentIndex + 1} totalQuestions={assessment.questions.length} timeLeft={formatTime(timeLeft)} status={status} />
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <Stack spacing={2.2}>
              <QuestionCard question={currentQuestion} selectedValue={answers[currentQuestion.id]} onSelect={selectAnswer} />
              <NavigationButtons
                onPrevious={handlePrevious}
                onNext={handleNext}
                onMark={handleMark}
                onClear={handleClear}
                onSubmit={() => onSubmit({ answers, markedForReview })}
                isFirst={currentIndex === 0}
                isLast={currentIndex === assessment.questions.length - 1}
              />
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, lg: 4 }}>
            <Stack spacing={2.2}>
              <Timer timeLeft={formatTime(timeLeft)} />
              <ProgressTracker completed={answeredCount} total={assessment.questions.length} />
              <QuestionPalette questions={assessment.questions} answers={answers} markedForReview={markedForReview} currentIndex={currentIndex} onSelectQuestion={setCurrentIndex} />
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </motion.div>
  );
}
