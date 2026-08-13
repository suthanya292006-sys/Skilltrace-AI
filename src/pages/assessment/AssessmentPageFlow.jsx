import { useMemo, useState } from 'react';
import AssessmentHome from './AssessmentHome';
import AssessmentInstructions from './AssessmentInstructions';
import AssessmentPage from './AssessmentPage';
import AssessmentSubmitted from './AssessmentSubmitted';
import AssessmentResult from './AssessmentResult';
import QuestionReview from './QuestionReview';
import { getAssessmentById } from '../../utils/assessmentDummyData';

export default function AssessmentPageFlow() {
  const [view, setView] = useState('home');
  const [selectedAssessmentId, setSelectedAssessmentId] = useState(null);
  const [assessment, setAssessment] = useState(null);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState([]);
  const [result, setResult] = useState(null);

  const handleStart = (assessmentId) => {
    const selected = getAssessmentById(assessmentId);
    setSelectedAssessmentId(assessmentId);
    setAssessment(selected);
    setView('instructions');
  };

  const handleBegin = () => {
    setView('assessment');
  };

  const handleSubmit = (payload) => {
    const submittedAnswers = payload?.answers || {};
    const submittedMarked = payload?.markedForReview || [];
    setAnswers(submittedAnswers);
    setMarkedForReview(submittedMarked);

    const questions = assessment?.questions || [];
    const correct = questions.filter((question) => submittedAnswers[question.id] === question.correctAnswer).length;
    const attempted = Object.keys(submittedAnswers).length;
    const wrong = attempted - correct;
    const skipped = questions.length - attempted;
    const percentage = Math.round((correct / questions.length) * 100);
    const passed = percentage >= 60;

    setResult({
      score: percentage,
      attempted,
      correct,
      wrong,
      skipped,
      percentage,
      timeTaken: '24 min',
      passed,
      summary: passed ? 'Strong grasp of core concepts with room to sharpen advanced topics.' : 'Your result shows promising foundation skills, but a bit more practice will improve consistency.',
      weakTopics: 'Focus on recursion, memory management, and query optimization to improve confidence in higher-difficulty questions.',
      improvementSuggestions: 'Practice timed problem solving and revisit practical examples from your strongest and weakest categories.',
      recommendedCourses: 'Take a short refresher on DSA patterns, SQL joins, and OS scheduling fundamentals.',
      suggestedProjects: 'Build a mini dashboard app, a SQL-backed reporting tool, and a system design exercise.',
      radarLabels: ['Programming', 'DSA', 'SQL', 'DBMS', 'OS', 'CN'],
      radarValues: [82, 74, 79, 81, 76, 73],
      categoryLabels: ['Programming', 'DSA', 'DBMS', 'OS', 'CN', 'SQL'],
      categoryValues: [84, 76, 80, 78, 74, 82],
    });

    setView('submitted');
  };

  const handleViewResults = () => {
    setView('result');
  };

  const handleReview = () => {
    setView('review');
  };

  const handleRetake = () => {
    setAnswers({});
    setMarkedForReview([]);
    setView('assessment');
  };

  const currentView = useMemo(() => {
    switch (view) {
      case 'instructions':
        return <AssessmentInstructions assessment={assessment} onStart={handleBegin} />;
      case 'assessment':
        return <AssessmentPage assessmentId={selectedAssessmentId} onSubmit={handleSubmit} onReview={handleReview} />;
      case 'submitted':
        return <AssessmentSubmitted onViewResults={handleViewResults} />;
      case 'result':
        return result ? <AssessmentResult result={result} onRetake={handleRetake} onReview={handleReview} /> : null;
      case 'review':
        return assessment ? <QuestionReview questions={assessment.questions} answers={answers} /> : null;
      default:
        return <AssessmentHome navigateToAssessment={handleStart} />;
    }
  }, [view, assessment, selectedAssessmentId, answers, markedForReview, result]);

  return currentView;
}
