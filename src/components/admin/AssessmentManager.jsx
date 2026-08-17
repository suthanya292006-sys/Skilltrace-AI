import { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Button,
  Grid,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from '@mui/material';
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiCheckCircle,
  FiClock,
  FiHelpCircle,
  FiBarChart2,
  FiChevronDown,
  FiLayers,
  FiSearch,
} from 'react-icons/fi';
import { tokens } from '../../styles/theme';

export default function AssessmentManager({
  assessments = [],
  onSaveAssessment,
  onDeleteAssessment,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  // Modal states
  const [assessmentModalOpen, setAssessmentModalOpen] = useState(false);
  const [editingAssessment, setEditingAssessment] = useState(null);

  // Question bank modal
  const [questionModalOpen, setQuestionModalOpen] = useState(false);
  const [targetAssessmentId, setTargetAssessmentId] = useState(null);
  const [questionForm, setQuestionForm] = useState({
    id: '',
    question: '',
    options: ['', '', '', ''],
    correctOption: 0,
    points: 5,
  });

  // Delete confirm modal
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Assessment form state
  const [assessmentForm, setAssessmentForm] = useState({
    id: '',
    title: '',
    category: 'Technical',
    timeLimitMinutes: 45,
    difficulty: 'Intermediate',
    questionCount: 20,
    questions: [],
  });

  const filteredAssessments = assessments.filter((a) => {
    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || a.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAddAssessment = () => {
    setEditingAssessment(null);
    setAssessmentForm({
      id: '',
      title: '',
      category: 'Technical',
      timeLimitMinutes: 45,
      difficulty: 'Intermediate',
      questionCount: 20,
      questions: [],
    });
    setAssessmentModalOpen(true);
  };

  const handleOpenEditAssessment = (assessment) => {
    setEditingAssessment(assessment);
    setAssessmentForm({
      id: assessment.id,
      title: assessment.title,
      category: assessment.category,
      timeLimitMinutes: assessment.timeLimitMinutes,
      difficulty: assessment.difficulty,
      questionCount: assessment.questionCount || assessment.questions?.length || 20,
      questions: assessment.questions || [],
    });
    setAssessmentModalOpen(true);
  };

  const handleSaveAssessmentForm = (e) => {
    e.preventDefault();
    onSaveAssessment(assessmentForm);
    setAssessmentModalOpen(false);
  };

  const handleOpenDeleteConfirm = (id) => {
    setDeleteId(id);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      onDeleteAssessment(deleteId);
    }
    setDeleteConfirmOpen(false);
    setDeleteId(null);
  };

  // Question handlers
  const handleOpenAddQuestion = (assessmentId) => {
    setTargetAssessmentId(assessmentId);
    setQuestionForm({
      id: `Q-${Date.now()}`,
      question: '',
      options: ['', '', '', ''],
      correctOption: 0,
      points: 5,
    });
    setQuestionModalOpen(true);
  };

  const handleSaveQuestion = (e) => {
    e.preventDefault();
    const ass = assessments.find((a) => a.id === targetAssessmentId);
    if (ass) {
      const updatedQuestions = [...(ass.questions || []), questionForm];
      onSaveAssessment({
        ...ass,
        questions: updatedQuestions,
        questionCount: updatedQuestions.length,
      });
    }
    setQuestionModalOpen(false);
  };

  const handleDeleteQuestion = (assessment, questionId) => {
    const updatedQuestions = (assessment.questions || []).filter((q) => q.id !== questionId);
    onSaveAssessment({
      ...assessment,
      questions: updatedQuestions,
      questionCount: updatedQuestions.length,
    });
  };

  return (
    <Box>
      {/* Header Bar */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: tokens.ink, fontSize: 19 }}>
              Skill Assessment Management
            </Typography>
            <Chip
              label={`${filteredAssessments.length} Tests`}
              size="small"
              sx={{ bgcolor: 'rgba(15,157,140,0.1)', color: tokens.tealDark, fontWeight: 700, fontSize: 11 }}
            />
          </Stack>
          <Typography variant="caption" sx={{ color: tokens.slate, mt: 0.3, display: 'block' }}>
            Configure technical & aptitude tests, question banks, category scoring weights, and attempt statistics
          </Typography>
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Category</InputLabel>
            <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} label="Category">
              <MenuItem value="ALL">All Categories</MenuItem>
              <MenuItem value="Technical">Technical</MenuItem>
              <MenuItem value="Aptitude">Aptitude</MenuItem>
              <MenuItem value="Domain">Domain</MenuItem>
              <MenuItem value="Soft Skills">Soft Skills</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            startIcon={<FiPlus size={16} />}
            onClick={handleOpenAddAssessment}
            sx={{ bgcolor: tokens.teal, '&:hover': { bgcolor: tokens.tealDark }, borderRadius: 2.5, fontWeight: 700 }}
          >
            Create New Assessment
          </Button>
        </Stack>
      </Stack>

      {/* Assessment Cards Grid */}
      <Grid container spacing={3}>
        {filteredAssessments.map((ass) => (
          <Grid item xs={12} md={6} key={ass.id}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3.5,
                border: `1px solid ${tokens.line}`,
                bgcolor: '#ffffff',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ mb: 1.5 }}>
                  <Box sx={{ pr: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                      <Chip
                        label={ass.category}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(15,157,140,0.12)',
                          color: tokens.tealDark,
                          fontWeight: 800,
                          fontSize: 10.5,
                          height: 20,
                        }}
                      />
                      <Chip
                        label={ass.difficulty}
                        size="small"
                        variant="outlined"
                        sx={{ height: 20, fontSize: 10.5, fontWeight: 600 }}
                      />
                    </Stack>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: tokens.ink, fontSize: 18 }}>
                      {ass.title}
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={0.5}>
                    <Tooltip title="Edit Assessment">
                      <IconButton size="small" onClick={() => handleOpenEditAssessment(ass)}>
                        <FiEdit size={16} color={tokens.teal} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Assessment">
                      <IconButton size="small" onClick={() => handleOpenDeleteConfirm(ass.id)}>
                        <FiTrash2 size={16} color={tokens.danger} />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Stack>

                {/* Stats Summary Row */}
                <Grid container spacing={1} sx={{ my: 2, py: 1.8, px: 1, bgcolor: 'background.default', borderRadius: 2.5, border: `1px solid ${tokens.line}` }}>
                  <Grid item xs={4}>
                    <Typography variant="caption" sx={{ color: tokens.slate, display: 'block' }}>Attempts</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 800, color: tokens.ink }}>{ass.attempts}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="caption" sx={{ color: tokens.slate, display: 'block' }}>Avg Score</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 800, color: tokens.tealDark }}>{ass.avgScore}%</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="caption" sx={{ color: tokens.slate, display: 'block' }}>Pass Rate</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 800, color: tokens.amber }}>{ass.passRate}%</Typography>
                  </Grid>
                </Grid>

                {/* Questions Bank Accordion */}
                <Accordion
                  elevation={0}
                  sx={{ border: `1px solid ${tokens.line}`, '&:before': { display: 'none' }, borderRadius: '12px !important' }}
                >
                  <AccordionSummary expandIcon={<FiChevronDown />}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <FiHelpCircle size={15} color={tokens.teal} />
                      <Typography variant="caption" sx={{ fontWeight: 800, color: tokens.ink }}>
                        Question Bank ({ass.questions?.length || 0} Questions Configured)
                      </Typography>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack spacing={1.5}>
                      {ass.questions && ass.questions.length > 0 ? (
                        ass.questions.map((q, idx) => (
                          <Box key={q.id || idx} sx={{ p: 1.8, borderRadius: 2.5, bgcolor: 'background.default', border: `1px solid ${tokens.line}` }}>
                            <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
                              <Typography variant="caption" sx={{ fontWeight: 700, color: tokens.ink, pr: 1, fontSize: 12.5 }}>
                                Q{idx + 1}: {q.question}
                              </Typography>
                              <IconButton size="small" onClick={() => handleDeleteQuestion(ass, q.id)}>
                                <FiTrash2 size={13} color={tokens.danger} />
                              </IconButton>
                            </Stack>
                            <Box sx={{ mt: 1 }}>
                              {q.options?.map((opt, oIdx) => (
                                <Typography
                                  key={oIdx}
                                  variant="caption"
                                  sx={{
                                    display: 'block',
                                    fontSize: 11,
                                    color: oIdx === q.correctOption ? tokens.tealDark : tokens.slate,
                                    fontWeight: oIdx === q.correctOption ? 800 : 400,
                                  }}
                                >
                                  {oIdx === q.correctOption ? '✓ ' : '• '} Option {oIdx + 1}: {opt}
                                </Typography>
                              ))}
                            </Box>
                            <Typography variant="caption" sx={{ color: tokens.slate, fontSize: 10.5, display: 'block', mt: 0.8 }}>
                              Points: <strong>{q.points || 5}</strong>
                            </Typography>
                          </Box>
                        ))
                      ) : (
                        <Typography variant="caption" sx={{ color: tokens.slate, display: 'block', py: 1 }}>
                          No questions configured yet for this assessment module.
                        </Typography>
                      )}
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<FiPlus size={14} />}
                        onClick={() => handleOpenAddQuestion(ass.id)}
                        sx={{ mt: 1, borderColor: tokens.line, textTransform: 'none', fontWeight: 700 }}
                      >
                        Add Question to Bank
                      </Button>
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              </Box>

              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 2.5, pt: 1.5, borderTop: `1px solid ${tokens.line}` }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <FiClock size={14} color={tokens.slate} />
                  <Typography variant="caption" sx={{ color: tokens.slate, fontWeight: 500 }}>
                    {ass.timeLimitMinutes} Mins Duration
                  </Typography>
                </Stack>
                <Chip label={`ID: ${ass.id}`} size="small" variant="outlined" sx={{ height: 20, fontSize: 10, fontFamily: '"IBM Plex Mono", monospace' }} />
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* DIALOG 1: Create / Edit Assessment */}
      <Dialog open={assessmentModalOpen} onClose={() => setAssessmentModalOpen(false)} maxWidth="sm" fullWidth>
        <Box component="form" onSubmit={handleSaveAssessmentForm}>
          <DialogTitle sx={{ fontWeight: 800 }}>
            {editingAssessment ? 'Edit Skill Assessment' : 'Create New Skill Assessment'}
          </DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2.5}>
              <TextField
                label="Assessment Title"
                value={assessmentForm.title}
                onChange={(e) => setAssessmentForm((p) => ({ ...p, title: e.target.value }))}
                fullWidth
                size="small"
                required
              />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={assessmentForm.category}
                      onChange={(e) => setAssessmentForm((p) => ({ ...p, category: e.target.value }))}
                      label="Category"
                    >
                      <MenuItem value="Technical">Technical</MenuItem>
                      <MenuItem value="Aptitude">Aptitude</MenuItem>
                      <MenuItem value="Domain">Domain</MenuItem>
                      <MenuItem value="Soft Skills">Soft Skills</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Difficulty</InputLabel>
                    <Select
                      value={assessmentForm.difficulty}
                      onChange={(e) => setAssessmentForm((p) => ({ ...p, difficulty: e.target.value }))}
                      label="Difficulty"
                    >
                      <MenuItem value="Beginner">Beginner</MenuItem>
                      <MenuItem value="Intermediate">Intermediate</MenuItem>
                      <MenuItem value="Advanced">Advanced</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Time Limit (Minutes)"
                    type="number"
                    value={assessmentForm.timeLimitMinutes}
                    onChange={(e) => setAssessmentForm((p) => ({ ...p, timeLimitMinutes: Number(e.target.value) }))}
                    fullWidth
                    size="small"
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Target Question Count"
                    type="number"
                    value={assessmentForm.questionCount}
                    onChange={(e) => setAssessmentForm((p) => ({ ...p, questionCount: Number(e.target.value) }))}
                    fullWidth
                    size="small"
                  />
                </Grid>
              </Grid>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={() => setAssessmentModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: tokens.teal, fontWeight: 700 }}>
              Save Assessment
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* DIALOG 2: Add Question Modal */}
      <Dialog open={questionModalOpen} onClose={() => setQuestionModalOpen(false)} maxWidth="sm" fullWidth>
        <Box component="form" onSubmit={handleSaveQuestion}>
          <DialogTitle sx={{ fontWeight: 800 }}>Add Question to Assessment Bank</DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2.5}>
              <TextField
                label="Question Prompt"
                value={questionForm.question}
                onChange={(e) => setQuestionForm((p) => ({ ...p, question: e.target.value }))}
                fullWidth
                multiline
                rows={2}
                size="small"
                required
              />

              <Typography variant="caption" sx={{ fontWeight: 800, color: tokens.slate }}>
                ANSWER OPTIONS
              </Typography>
              {questionForm.options.map((opt, idx) => (
                <TextField
                  key={idx}
                  label={`Option ${idx + 1}`}
                  value={opt}
                  onChange={(e) => {
                    const newOpts = [...questionForm.options];
                    newOpts[idx] = e.target.value;
                    setQuestionForm((p) => ({ ...p, options: newOpts }));
                  }}
                  fullWidth
                  size="small"
                  required
                />
              ))}

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Correct Answer Option</InputLabel>
                    <Select
                      value={questionForm.correctOption}
                      onChange={(e) => setQuestionForm((p) => ({ ...p, correctOption: Number(e.target.value) }))}
                      label="Correct Answer Option"
                    >
                      {questionForm.options.map((_, i) => (
                        <MenuItem key={i} value={i}>
                          Option {i + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Score Points"
                    type="number"
                    value={questionForm.points}
                    onChange={(e) => setQuestionForm((p) => ({ ...p, points: Number(e.target.value) }))}
                    fullWidth
                    size="small"
                  />
                </Grid>
              </Grid>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={() => setQuestionModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: tokens.teal, fontWeight: 700 }}>
              Save Question
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* DIALOG 3: Confirm Delete */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle sx={{ fontWeight: 800 }}>Delete Assessment?</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: tokens.slate }}>
            Are you sure you want to delete this skill assessment? Student progress history for this test will be cleared.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleConfirmDelete} sx={{ fontWeight: 700 }}>
            Delete Assessment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
