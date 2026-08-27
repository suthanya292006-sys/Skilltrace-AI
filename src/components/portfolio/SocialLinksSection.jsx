import { useState, useEffect, useCallback } from 'react';
import { Box, TextField, Stack, Typography, Chip, Button, InputAdornment, Skeleton } from '@mui/material';
import { FiGithub, FiLinkedin, FiCheck } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import { getStudentProfile, updateStudentProfile } from '../../services/profileService';
import { tokens } from '../../styles/theme';

export default function SocialLinksSection() {
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [savedGithub, setSavedGithub] = useState(true);
  const [savedLinkedin, setSavedLinkedin] = useState(true);
  const [loading, setLoading] = useState(true);

  const loadLinks = useCallback(async () => {
    setLoading(true);
    try {
      const { profile } = await getStudentProfile();
      setGithub(profile.links?.github || '');
      setLinkedin(profile.links?.linkedin || '');
      setSavedGithub(true);
      setSavedLinkedin(true);
    } catch (err) {
      console.error('Error loading social links:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLinks();
  }, [loadLinks]);

  const handleSaveGithub = async () => {
    await updateStudentProfile({
      links: {
        github: github.trim(),
        linkedin: linkedin.trim(),
      },
    });
    setSavedGithub(true);
  };

  const handleSaveLinkedin = async () => {
    await updateStudentProfile({
      links: {
        github: github.trim(),
        linkedin: linkedin.trim(),
      },
    });
    setSavedLinkedin(true);
  };

  if (loading) {
    return (
      <DashboardCard title="GitHub & LinkedIn" subtitle="Used to enrich your AI portfolio analysis">
        <Stack spacing={2.4}>
          <Skeleton variant="rounded" height={40} />
          <Skeleton variant="rounded" height={40} />
        </Stack>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard title="GitHub & LinkedIn" subtitle="Used to enrich your AI portfolio analysis">
      <Stack spacing={2.4}>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
            GitHub Profile URL
          </Typography>
          <Stack direction="row" spacing={1}>
            <TextField
              fullWidth
              size="small"
              placeholder="https://github.com/your-username"
              value={github}
              onChange={(e) => {
                setGithub(e.target.value);
                setSavedGithub(false);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FiGithub size={16} />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant={savedGithub ? 'outlined' : 'contained'}
              disableElevation
              onClick={handleSaveGithub}
              startIcon={savedGithub ? <FiCheck size={14} /> : null}
              sx={{ fontWeight: 700, minWidth: 90 }}
            >
              {savedGithub ? 'Saved' : 'Save'}
            </Button>
          </Stack>
        </Box>

        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
            LinkedIn Profile URL
          </Typography>
          <Stack direction="row" spacing={1}>
            <TextField
              fullWidth
              size="small"
              placeholder="https://linkedin.com/in/your-profile"
              value={linkedin}
              onChange={(e) => {
                setLinkedin(e.target.value);
                setSavedLinkedin(false);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FiLinkedin size={16} color="#0A66C2" />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant={savedLinkedin ? 'outlined' : 'contained'}
              disableElevation
              onClick={handleSaveLinkedin}
              startIcon={savedLinkedin ? <FiCheck size={14} /> : null}
              sx={{ fontWeight: 700, minWidth: 90 }}
            >
              {savedLinkedin ? 'Saved' : 'Save'}
            </Button>
          </Stack>
        </Box>

        <Stack direction="row" spacing={1}>
          <Chip
            size="small"
            label={github && savedGithub ? 'GitHub linked' : 'GitHub unsaved / empty'}
            sx={{
              bgcolor: github && savedGithub ? 'rgba(15,157,140,0.1)' : 'action.hover',
              color: github && savedGithub ? tokens.tealDark : 'text.secondary',
              fontSize: 11,
              fontWeight: 600,
            }}
          />
          <Chip
            size="small"
            label={linkedin && savedLinkedin ? 'LinkedIn linked' : 'LinkedIn unsaved / empty'}
            sx={{
              bgcolor: linkedin && savedLinkedin ? 'rgba(15,157,140,0.1)' : 'action.hover',
              color: linkedin && savedLinkedin ? tokens.tealDark : 'text.secondary',
              fontSize: 11,
              fontWeight: 600,
            }}
          />
        </Stack>
      </Stack>
    </DashboardCard>
  );
}
