import { useCallback, useRef, useState, useEffect } from 'react';
import { Box, Typography, Button, LinearProgress, Stack, IconButton, Paper, Chip, Alert } from '@mui/material';
import { FiUploadCloud, FiFileText, FiX, FiCheckCircle, FiAlertCircle, FiRefreshCw } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import { getStudentProfile, saveStudentResume, removeStudentResume } from '../../services/profileService';
import { tokens } from '../../styles/theme';

function formatSize(bytes) {
  if (!bytes) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  if (bytes < (1024 * 1024 * 1024)) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

// Client-side text parsing helper for PDF text streams & keywords
async function parseResumeFile(file) {
  return new Promise((resolve) => {
    let completed = false;
    const timeout = setTimeout(() => {
      if (!completed) {
        completed = true;
        resolve({
          name: file ? file.name.replace(/\.[^.]+$/, '') : 'Resume',
          skills: [],
          hasEducation: false,
          hasExperience: false,
          extractedCount: 0,
          parsedSuccessfully: false,
        });
      }
    }, 4000);

    const finish = (result) => {
      if (!completed) {
        completed = true;
        clearTimeout(timeout);
        resolve(result);
      }
    };

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = (typeof e.target?.result === 'string') ? e.target.result : '';

          // Known tech keyword dictionary for matching
          const techKeywords = [
            'React', 'React.js', 'JavaScript', 'JS', 'TypeScript', 'TS', 'Python', 'Java', 'C++', 'C#',
            'Node.js', 'Node', 'Express', 'Express.js', 'FastAPI', 'Django', 'Flask', 'HTML', 'HTML5', 'CSS', 'CSS3',
            'SQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Git', 'GitHub', 'Docker', 'Kubernetes',
            'AWS', 'GCP', 'Azure', 'REST', 'GraphQL', 'Data Structures', 'Algorithms', 'System Design'
          ];

          const foundSkills = [];
          const lowerText = text.toLowerCase();

          techKeywords.forEach((keyword) => {
            const regex = new RegExp(`\\b${keyword.replace('.', '\\.')}\\b`, 'i');
            if (regex.test(text) || lowerText.includes(keyword.toLowerCase())) {
              if (!foundSkills.includes(keyword)) {
                foundSkills.push(keyword);
              }
            }
          });

          // Simple heuristic for education & experience presence
          const hasEducation = /b\.?tech|b\.?e|b\.?sc|master|bachelor|degree|university|college|institute/i.test(text);
          const hasExperience = /experience|intern|internship|developer|engineer|project|role/i.test(text);

          const parsedData = {
            name: file ? file.name.replace(/\.[^.]+$/, '') : 'Resume',
            skills: foundSkills,
            hasEducation,
            hasExperience,
            extractedCount: foundSkills.length,
            parsedSuccessfully: text.length > 50 || foundSkills.length > 0,
          };

          finish(parsedData);
        } catch (err) {
          finish({
            name: file ? file.name.replace(/\.[^.]+$/, '') : 'Resume',
            skills: [],
            hasEducation: false,
            hasExperience: false,
            extractedCount: 0,
            parsedSuccessfully: false,
          });
        }
      };

      reader.onerror = () => {
        finish({
          name: file ? file.name.replace(/\.[^.]+$/, '') : 'Resume',
          skills: [],
          hasEducation: false,
          hasExperience: false,
          extractedCount: 0,
          parsedSuccessfully: false,
        });
      };

      reader.readAsText(file);
    } catch (err) {
      finish({
        name: file ? file.name.replace(/\.[^.]+$/, '') : 'Resume',
        skills: [],
        hasEducation: false,
        hasExperience: false,
        extractedCount: 0,
        parsedSuccessfully: false,
      });
    }
  });
}

export default function ResumeUpload() {
  const [fileData, setFileData] = useState(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle'); // idle | uploading | done | error
  const [errorMessage, setErrorMessage] = useState('');
  const [parseResult, setParseResult] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);
  const progressTimer = useRef(null);
  const isUploadingRef = useRef(false);

  // Load saved resume on mount
  useEffect(() => {
    getStudentProfile().then(({ profile }) => {
      if (profile && profile.resume) {
        setFileData(profile.resume);
        setParseResult(profile.resume.parsedData);
        setStatus('done');
      }
    });
  }, []);

  const startUpload = useCallback(async (f) => {
    if (!f) return;
    if (isUploadingRef.current) return; // Prevent duplicate uploads

    isUploadingRef.current = true;
    setStatus('uploading');
    setErrorMessage('');
    setProgress(0);
    if (progressTimer.current) {
      clearInterval(progressTimer.current);
    }

    progressTimer.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) {
          return 90;
        }
        return Math.min(p + Math.random() * 20 + 5, 90);
      });
    }, 150);

    try {
      const parsed = await parseResumeFile(f);

      const resumePayload = {
        fileName: f.name,
        fileSize: f.size,
        fileType: f.type || 'application/pdf',
        uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        parsedData: parsed,
      };

      await saveStudentResume(resumePayload);

      // Clean up interval and force progress to 100% on complete
      if (progressTimer.current) {
        clearInterval(progressTimer.current);
      }
      setProgress(100);
      setFileData(resumePayload);
      setParseResult(parsed);
      setStatus('done');
    } catch (err) {
      if (progressTimer.current) {
        clearInterval(progressTimer.current);
      }
      setProgress(0);
      setErrorMessage('Failed to process resume. Please try again.');
      setStatus('error');
    } finally {
      isUploadingRef.current = false;
    }
  }, []);

  const handleFiles = (fileList) => {
    const f = fileList?.[0];
    if (isUploadingRef.current) return;

    if (f && (f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'))) {
      startUpload(f);
    } else {
      setErrorMessage('Invalid file type. Please upload a valid PDF resume file.');
      setStatus('error');
    }
  };

  const removeFile = async () => {
    if (progressTimer.current) {
      clearInterval(progressTimer.current);
    }
    isUploadingRef.current = false;
    await removeStudentResume();
    setFileData(null);
    setParseResult(null);
    setProgress(0);
    setErrorMessage('');
    setStatus('idle');
  };

  return (
    <DashboardCard title="Resume Upload" subtitle="PDF only, up to 10 MB" icon={FiFileText}>
      {!fileData && status !== 'uploading' && (
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
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.value = '';
              inputRef.current.click();
            }
          }}
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
            accept="application/pdf,.pdf"
            hidden
            onChange={(e) => {
              handleFiles(e.target.files);
              e.target.value = '';
            }}
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
            or click to browse files (PDF format)
          </Typography>
        </Box>
      )}

      {status === 'error' && !fileData && (
        <Box sx={{ mt: 2 }}>
          <Alert
            severity="error"
            sx={{ borderRadius: 2, mb: 1.5 }}
            onClose={() => setStatus('idle')}
          >
            {errorMessage || 'Invalid file type. Please upload a valid PDF resume file.'}
          </Alert>
          <Button
            variant="outlined"
            size="small"
            startIcon={<FiRefreshCw size={14} />}
            onClick={() => {
              setStatus('idle');
              if (inputRef.current) {
                inputRef.current.value = '';
                inputRef.current.click();
              }
            }}
            sx={{ fontWeight: 600 }}
          >
            Retry Upload
          </Button>
        </Box>
      )}

      {status === 'uploading' && (
        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2.5, borderColor: tokens.line }}>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
            Processing resume & analyzing contents...
          </Typography>
          <LinearProgress variant="determinate" value={progress} sx={{ height: 7, borderRadius: 3, mb: 1 }} />
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {Math.round(progress)}% completed
          </Typography>
        </Paper>
      )}

      {fileData && status === 'done' && (
        <Stack spacing={2}>
          <Paper
            variant="outlined"
            sx={{ p: 2, borderRadius: 2.5, borderColor: tokens.line, display: 'flex', gap: 1.6, alignItems: 'flex-start' }}
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
                fontWeight: 700,
              }}
            >
              PDF
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="body2" noWrap sx={{ fontWeight: 700, maxWidth: 240 }}>
                    {fileData.fileName}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                    {formatSize(fileData.fileSize)} &bull; Uploaded {fileData.uploadDate}
                  </Typography>
                </Box>
                <IconButton size="small" onClick={removeFile}>
                  <FiX size={15} />
                </IconButton>
              </Stack>

              <Stack direction="row" spacing={0.6} alignItems="center" sx={{ mt: 1 }}>
                <FiCheckCircle size={14} color={tokens.teal} />
                <Typography variant="caption" sx={{ color: tokens.tealDark, fontWeight: 700 }}>
                  Resume Analyzed & Saved
                </Typography>
              </Stack>
            </Box>
          </Paper>

          {/* Extracted Information Preview */}
          {parseResult && (
            <Box sx={{ p: 2, bgcolor: 'rgba(15,157,140,0.06)', borderRadius: 2.5, border: `1px solid ${tokens.line}` }}>
              {parseResult.parsedSuccessfully ? (
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: tokens.tealDark, display: 'block', mb: 1 }}>
                    EXTRACTED RESUME INSIGHTS ({parseResult.extractedCount} Skills Found):
                  </Typography>
                  {parseResult.skills && parseResult.skills.length > 0 ? (
                    <Stack direction="row" spacing={0.6} flexWrap="wrap" useFlexGap sx={{ mb: 1 }}>
                      {parseResult.skills.map((s) => (
                        <Chip key={s} label={s} size="small" sx={{ bgcolor: '#ffffff', fontSize: 11, fontWeight: 600 }} />
                      ))}
                    </Stack>
                  ) : (
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      No technology keywords automatically identified, but text structure processed.
                    </Typography>
                  )}
                </Box>
              ) : (
                <Stack direction="row" spacing={1} alignItems="center">
                  <FiAlertCircle color={tokens.amber} size={16} />
                  <Typography variant="caption" sx={{ color: tokens.amber, fontWeight: 600 }}>
                    Resume text could not be parsed automatically. Please manually add your skills and projects below.
                  </Typography>
                </Stack>
              )}
            </Box>
          )}

          <Button
            fullWidth
            variant="outlined"
            size="small"
            onClick={() => {
              if (inputRef.current) {
                inputRef.current.value = '';
                inputRef.current.click();
              }
            }}
            sx={{ fontWeight: 600 }}
          >
            Replace Resume File
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf,.pdf"
              hidden
              onChange={(e) => {
                handleFiles(e.target.files);
                e.target.value = '';
              }}
            />
          </Button>
        </Stack>
      )}
    </DashboardCard>
  );
}
