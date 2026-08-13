import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Stack,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Alert,
} from '@mui/material';
import { FiX, FiShare2, FiCopy, FiCheck, FiMail, FiGlobe } from 'react-icons/fi';
import { tokens } from '../../styles/theme';

export default function ShareReportModal({ open, onClose, report }) {
  const [copied, setCopied] = useState(false);

  if (!report) return null;

  const shareUrl = `https://skilltrace.ai/reports/shared/${report.id || 'rep-demo-001'}?key=st_verify_89`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3, p: 1 } }}>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <FiShare2 size={20} color={tokens.teal} />
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 18, color: tokens.ink }}>
            Share Career Report
          </Typography>
        </Stack>
        <IconButton size="small" onClick={onClose}>
          <FiX size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, color: tokens.ink }}>
            {report.title}
          </Typography>
          <Typography variant="caption" sx={{ color: tokens.slate }}>
            Share your verified skill rating & score breakdown with recruiters or mentors.
          </Typography>
        </Box>

        {copied && (
          <Alert severity="success" icon={<FiCheck size={16} />} sx={{ mb: 2, borderRadius: 2, fontSize: 13 }}>
            Link copied to clipboard successfully!
          </Alert>
        )}

        <Typography variant="caption" sx={{ fontWeight: 700, color: tokens.ink, display: 'block', mb: 0.8 }}>
          Public Verification URL
        </Typography>
        <TextField
          fullWidth
          size="small"
          value={shareUrl}
          readOnly
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FiGlobe size={16} color={tokens.slate} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  size="small"
                  onClick={handleCopy}
                  startIcon={copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
                  sx={{
                    bgcolor: copied ? 'success.main' : tokens.teal,
                    color: '#fff',
                    '&:hover': { bgcolor: copied ? 'success.dark' : tokens.tealDark },
                    borderRadius: 1.5,
                    fontSize: 11,
                    px: 1.2,
                  }}
                >
                  {copied ? 'Copied' : 'Copy'}
                </Button>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        <Stack direction="row" spacing={1.5}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<FiMail size={16} />}
            onClick={() => {
              window.open(`mailto:?subject=SkillTrace AI Report - ${report.title}&body=Check out my verified career intelligence report here: ${shareUrl}`);
            }}
            sx={{ borderColor: tokens.line, color: tokens.ink, fontSize: 12.5 }}
          >
            Email Recruiter
          </Button>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<FiShare2 size={16} />}
            onClick={handleCopy}
            sx={{ borderColor: tokens.line, color: tokens.ink, fontSize: 12.5 }}
          >
            Copy Link
          </Button>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} sx={{ color: tokens.slate }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
