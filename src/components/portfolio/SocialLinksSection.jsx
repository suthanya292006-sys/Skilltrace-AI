import { useState } from 'react';
import { Box, TextField, Stack, Typography, Chip, Button, InputAdornment } from '@mui/material';
import { FiGithub, FiLinkedin, FiCheck } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import { tokens } from '../../styles/theme';

export default function SocialLinksSection() {
  const [github, setGithub] = useState('github.com/aditi-sharma');
  const [linkedin, setLinkedin] = useState('linkedin.com/in/aditi-sharma');
  const [savedGithub, setSavedGithub] = useState(true);
  const [savedLinkedin, setSavedLinkedin] = useState(true);

  return (
    <DashboardCard title="GitHub & LinkedIn" subtitle="Used to enrich your AI portfolio analysis">
      <Stack spacing={2.4}>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
            GitHub profile
          </Typography>
          <Stack direction="row" spacing={1}>
            <TextField
              fullWidth
              size="small"
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
              onClick={() => setSavedGithub(true)}
              startIcon={savedGithub ? <FiCheck size={14} /> : null}
            >
              {savedGithub ? 'Saved' : 'Save'}
            </Button>
          </Stack>
        </Box>

        <Box>
          <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
            LinkedIn profile
          </Typography>
          <Stack direction="row" spacing={1}>
            <TextField
              fullWidth
              size="small"
              value={linkedin}
              onChange={(e) => {
                setLinkedin(e.target.value);
                setSavedLinkedin(false);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FiLinkedin size={16} />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant={savedLinkedin ? 'outlined' : 'contained'}
              disableElevation
              onClick={() => setSavedLinkedin(true)}
              startIcon={savedLinkedin ? <FiCheck size={14} /> : null}
            >
              {savedLinkedin ? 'Saved' : 'Save'}
            </Button>
          </Stack>
        </Box>

        <Stack direction="row" spacing={1}>
          <Chip
            size="small"
            label={savedGithub ? 'GitHub linked' : 'GitHub unsaved'}
            sx={{
              bgcolor: savedGithub ? 'rgba(15,157,140,0.1)' : 'action.hover',
              color: savedGithub ? tokens.tealDark : 'text.secondary',
              fontSize: 11,
            }}
          />
          <Chip
            size="small"
            label={savedLinkedin ? 'LinkedIn linked' : 'LinkedIn unsaved'}
            sx={{
              bgcolor: savedLinkedin ? 'rgba(15,157,140,0.1)' : 'action.hover',
              color: savedLinkedin ? tokens.tealDark : 'text.secondary',
              fontSize: 11,
            }}
          />
        </Stack>
      </Stack>
    </DashboardCard>
  );
}
