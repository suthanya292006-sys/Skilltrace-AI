import { useCallback, useRef, useState } from 'react';
import { Box, Typography, Button, LinearProgress, Stack, IconButton, Paper } from '@mui/material';
import { FiUploadCloud, FiFileText, FiX, FiCheckCircle } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import { tokens } from '../../styles/theme';

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle'); // idle | uploading | done
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);
  const progressTimer = useRef(null);

  const startUpload = useCallback((f) => {
    if (!f) return;
    setFile(f);
    setStatus('uploading');
    setProgress(0);
    clearInterval(progressTimer.current);
    progressTimer.current = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + Math.random() * 22, 100);
        if (next >= 100) {
          clearInterval(progressTimer.current);
          setStatus('done');
        }
        return next;
      });
    }, 260);
  }, []);

  const handleFiles = (fileList) => {
    const f = fileList?.[0];
    if (f && f.type === 'application/pdf') startUpload(f);
  };

  const removeFile = () => {
    clearInterval(progressTimer.current);
    setFile(null);
    setProgress(0);
    setStatus('idle');
  };

  return (
    <DashboardCard title="Resume Upload" subtitle="PDF only, up to 10 MB" icon={FiFileText}>
      {!file && (
        <Box
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            handleFiles(e.dataTransfer.files);
          }}
          onClick={() => inputRef.current?.click()}
          sx={{
            border: `1.5px dashed ${dragActive ? tokens.teal : tokens.line}`,
            bgcolor: dragActive ? 'rgba(15,157,140,0.05)' : 'background.default',
            borderRadius: 3,
            py: 5,
            px: 3,
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            hidden
            onChange={(e) => handleFiles(e.target.files)}
          />
          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: '50%',
              bgcolor: 'rgba(15,157,140,0.1)',
              color: tokens.tealDark,
              display: 'grid',
              placeItems: 'center',
              mx: 'auto',
              mb: 1.5,
            }}
          >
            <FiUploadCloud size={20} />
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.4 }}>
            Drag & drop your resume here
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            or click to browse files
          </Typography>
        </Box>
      )}

      {file && (
        <Paper
          variant="outlined"
          sx={{ p: 2, borderRadius: 2.5, borderColor: tokens.line, display: 'flex', gap: 1.6 }}
        >
          <Box
            sx={{
              width: 42,
              height: 52,
              borderRadius: '6px',
              bgcolor: tokens.ink,
              color: '#fff',
              display: 'grid',
              placeItems: 'center',
              flexShrink: 0,
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: 10,
            }}
          >
            PDF
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="body2" noWrap sx={{ fontWeight: 600, maxWidth: 220 }}>
                  {file.name}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {formatSize(file.size)}
                </Typography>
              </Box>
              <IconButton size="small" onClick={removeFile}>
                <FiX size={15} />
              </IconButton>
            </Stack>

            {status === 'uploading' && (
              <Box sx={{ mt: 1.2 }}>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{ height: 6, borderRadius: 3, bgcolor: 'action.hover' }}
                />
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Uploading… {Math.round(progress)}%
                </Typography>
              </Box>
            )}

            {status === 'done' && (
              <Stack direction="row" spacing={0.6} alignItems="center" sx={{ mt: 1 }}>
                <FiCheckCircle size={14} color={tokens.teal} />
                <Typography variant="caption" sx={{ color: tokens.tealDark, fontWeight: 600 }}>
                  Uploaded — queued for AI analysis
                </Typography>
              </Stack>
            )}
          </Box>
        </Paper>
      )}

      {file && status === 'done' && (
        <Button
          fullWidth
          variant="outlined"
          size="small"
          sx={{ mt: 2 }}
          onClick={() => inputRef.current?.click()}
        >
          Replace file
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            hidden
            onChange={(e) => handleFiles(e.target.files)}
          />
        </Button>
      )}
    </DashboardCard>
  );
}
