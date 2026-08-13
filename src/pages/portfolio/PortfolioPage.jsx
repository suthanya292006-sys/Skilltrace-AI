import { useState } from 'react';
import { Box, Tabs, Tab, Typography, Grid } from '@mui/material';
import ResumeUpload from '../../components/portfolio/ResumeUpload';
import ProjectsSection from '../../components/portfolio/ProjectsSection';
import CertificationsSection from '../../components/portfolio/CertificationsSection';
import SkillsSection from '../../components/portfolio/SkillsSection';
import SocialLinksSection from '../../components/portfolio/SocialLinksSection';
import { tokens } from '../../styles/theme';

const tabs = ['Resume', 'Projects', 'Certifications', 'Skills', 'GitHub & LinkedIn'];

export default function PortfolioPage() {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.4 }}>
          Portfolio Management
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Everything here feeds your AI Portfolio Analysis — keep it current.
        </Typography>
      </Box>

      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{
          mb: 3,
          borderBottom: `1px solid ${tokens.line}`,
          '& .MuiTab-root': { textTransform: 'none', fontWeight: 500, minHeight: 44 },
        }}
      >
        {tabs.map((t) => (
          <Tab key={t} label={t} />
        ))}
      </Tabs>

      {tab === 0 && (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 7 }}>
            <ResumeUpload />
          </Grid>
        </Grid>
      )}

      {tab === 1 && <ProjectsSection />}

      {tab === 2 && (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <CertificationsSection />
          </Grid>
        </Grid>
      )}

      {tab === 3 && (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <SkillsSection />
          </Grid>
        </Grid>
      )}

      {tab === 4 && (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 7 }}>
            <SocialLinksSection />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
