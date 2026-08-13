import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Stack,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  LinearProgress,
  IconButton,
  Alert,
} from '@mui/material';
import { FiX, FiZap, FiCheckCircle } from 'react-icons/fi';
import { tokens } from '../../styles/theme';

const generationSteps = [
  'Connecting to SkillTrace AI Analysis Engine…',
  'Analyzing GitHub repositories & commit history…',
  'Processing diagnostic skill assessment scores…',
  'Evaluating career role match & placement probability models…',
  'Synthesizing personalized AI recommendations…',
  'Finalizing career intelligence report…',
];

export default function GenerateReportModal({ open, onClose, onGenerate }) {
  const [reportType, setReportType] = useState('portfolio-analysis');
  const [depth, setDepth] = useState('Standard');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (isGenerating) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          const next = prev + 15;
          const stepIndex = Math.min(
            generationSteps.length - 1,
            Math.floor((next / 100) * generationSteps.length)
          );
          setCurrentStepIdx(stepIndex);
          return next;
        });
      }, 250);
    } else {
      setProgress(0);
      setCurrentStepIdx(0);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setProgress(10);

    // Trigger parent async generation
    setTimeout(async () => {
      await onGenerate({ reportType, depth });
      setIsGenerating(false);
      onClose();
    }, 1800);
  };

  return (
    <Dialog
      open={open}
      onClose={isGenerating ? undefined : onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <FiZap size={20} color={tokens.teal} />
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 18, color: tokens.ink }}>
            Generate AI Report
          </Typography>
        </Stack>
        {!isGenerating && (
          <IconButton size="small" onClick={onClose}>
            <FiX size={20} />
          </IconButton>
        )}
      </DialogTitle>

      <DialogContent>
        {isGenerating ? (
          <Box sx={{ py: 3, textAlign: 'center' }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                bgcolor: 'rgba(15,157,140,0.1)',
                color: tokens.teal,
                display: 'grid',
                placeItems: 'center',
                mx: 'auto',
                mb: 2,
              }}
            >
              <FiZap size={28} className="animate-spin" />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: tokens.ink, mb: 1 }}>
              Synthesizing Intelligence Report
            </Typography>
            <Typography variant="body2" sx={{ color: tokens.slate, mb: 3, minHeight: 40, px: 2 }}>
              {generationSteps[currentStepIdx]}
            </Typography>

            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: tokens.line,
                '& .MuiLinearProgress-bar': { bgcolor: tokens.teal, borderRadius: 4 },
              }}
            />
            <Typography variant="caption" sx={{ color: tokens.slate, mt: 1, display: 'block', fontWeight: 600 }}>
              {progress}% Completed
            </Typography>
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit} sx={{ pt: 1 }}>
            <Alert severity="info" icon={<FiCheckCircle size={16} />} sx={{ mb: 2.5, borderRadius: 2, fontSize: 13 }}>
              Select the report type and depth to run our real-time AI diagnostic pipeline.
            </Alert>

            <FormControl component="fieldset" fullWidth sx={{ mb: 2.5 }}>
              <FormLabel sx={{ fontWeight: 700, color: tokens.ink, fontSize: 14, mb: 1 }}>
                1. Select Report Type
              </FormLabel>
              <RadioGroup value={reportType} onChange={(e) => setReportType(e.target.value)}>
                <FormControlLabel
                  value="portfolio-analysis"
                  control={<Radio size="small" sx={{ color: tokens.teal, '&.Mui-checked': { color: tokens.teal } }} />}
                  label={<Typography variant="body2" sx={{ fontWeight: 600 }}>Portfolio Analysis</Typography>}
                />
                <FormControlLabel
                  value="skill-assessment"
                  control={<Radio size="small" sx={{ color: tokens.teal, '&.Mui-checked': { color: tokens.teal } }} />}
                  label={<Typography variant="body2" sx={{ fontWeight: 600 }}>Skill Assessment</Typography>}
                />
                <FormControlLabel
                  value="career-recommendation"
                  control={<Radio size="small" sx={{ color: tokens.teal, '&.Mui-checked': { color: tokens.teal } }} />}
                  label={<Typography variant="body2" sx={{ fontWeight: 600 }}>Career Recommendation</Typography>}
                />
                <FormControlLabel
                  value="placement-prediction"
                  control={<Radio size="small" sx={{ color: tokens.teal, '&.Mui-checked': { color: tokens.teal } }} />}
                  label={<Typography variant="body2" sx={{ fontWeight: 600 }}>Placement Prediction</Typography>}
                />
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset" fullWidth sx={{ mb: 1 }}>
              <FormLabel sx={{ fontWeight: 700, color: tokens.ink, fontSize: 14, mb: 1 }}>
                2. Analysis Depth
              </FormLabel>
              <RadioGroup row value={depth} onChange={(e) => setDepth(e.target.value)}>
                <FormControlLabel
                  value="Standard"
                  control={<Radio size="small" sx={{ color: tokens.teal, '&.Mui-checked': { color: tokens.teal } }} />}
                  label={<Typography variant="body2" sx={{ fontSize: 13, fontWeight: 500 }}>Standard Audit</Typography>}
                />
                <FormControlLabel
                  value="Deep Dive"
                  control={<Radio size="small" sx={{ color: tokens.teal, '&.Mui-checked': { color: tokens.teal } }} />}
                  label={<Typography variant="body2" sx={{ fontSize: 13, fontWeight: 500 }}>Deep-Dive ML</Typography>}
                />
              </RadioGroup>
            </FormControl>

            <DialogActions sx={{ px: 0, pt: 2 }}>
              <Button onClick={onClose} sx={{ color: tokens.slate }}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<FiZap size={16} />}
                sx={{ bgcolor: tokens.teal, '&:hover': { bgcolor: tokens.tealDark }, fontWeight: 700, px: 3 }}
              >
                Start Generation
              </Button>
            </DialogActions>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
