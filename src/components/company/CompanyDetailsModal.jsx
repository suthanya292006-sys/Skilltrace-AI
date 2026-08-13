import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Stack,
  Chip,
  Button,
  IconButton,
  Tabs,
  Tab,
  Paper,
  Divider,
  Grid,
  Alert,
  Tooltip,
  LinearProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  FiX,
  FiBookmark,
  FiExternalLink,
  FiMapPin,
  FiDollarSign,
  FiCheckCircle,
  FiAlertCircle,
  FiUsers,
  FiCalendar,
  FiGlobe,
  FiAward,
  FiArrowRight,
  FiSend,
  FiClock,
  FiBriefcase,
  FiZap,
} from 'react-icons/fi';
import { tokens } from '../../styles/theme';

export default function CompanyDetailsModal({ company, open, onClose, isSaved, onToggleSave, onApply }) {
  const [activeTab, setActiveTab] = useState(0);
  const [applied, setApplied] = useState(false);
  const navigate = useNavigate();

  if (!company) return null;

  const {
    id,
    name,
    tagline,
    companyType,
    logoText,
    logoBg,
    matchPercentage,
    matchTier,
    packageLpa,
    location,
    workMode,
    eligibility,
    suitableRoles,
    requiredSkills,
    matchedSkills,
    missingSkills,
    about,
    employees,
    founded,
    headquarters,
    website,
    cultureHighlights,
    hiringProcess,
    openPositionsCount,
  } = company;

  const handleApply = () => {
    setApplied(true);
    if (onApply) onApply(company);
  };

  const handleNavigateToSkillGap = () => {
    onClose();
    navigate('/skill-gap');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
      PaperProps={{
        sx: {
          borderRadius: 4,
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
        },
      }}
    >
      {/* Header Banner */}
      <DialogTitle
        sx={{
          p: 3,
          background: `linear-gradient(135deg, ${tokens.ink} 0%, #1c2a3e 100%)`,
          color: '#FFFFFF',
          position: 'relative',
        }}
      >
        <IconButton
          onClick={onClose}
          aria-label="close modal"
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: 'rgba(255,255,255,0.7)',
            '&:hover': { color: '#FFFFFF', bgcolor: 'rgba(255,255,255,0.1)' },
          }}
        >
          <FiX size={20} />
        </IconButton>

        <Stack direction="row" spacing={2} alignItems="center" sx={{ pr: 5 }}>
          <Box
            sx={{
              width: 58,
              height: 58,
              borderRadius: '16px',
              bgcolor: logoBg || tokens.teal,
              color: '#FFFFFF',
              display: 'grid',
              placeItems: 'center',
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 800,
              fontSize: 16,
              letterSpacing: 0.5,
              flexShrink: 0,
              boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
            }}
          >
            {logoText}
          </Box>
          <Box flex={1}>
            <Stack direction="row" alignItems="center" spacing={1.2} flexWrap="wrap">
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#FFFFFF', fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                {name}
              </Typography>
              <Chip
                label={companyType}
                size="small"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.15)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: 11,
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              />
              <Chip
                label={`${matchPercentage}% AI Match`}
                size="small"
                sx={{
                  bgcolor: tokens.teal,
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: 11,
                }}
              />
            </Stack>

            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.75)', mt: 0.5 }}>
              {tagline}
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1.5 }} flexWrap="wrap">
              <Stack direction="row" spacing={0.5} alignItems="center">
                <FiMapPin size={14} color={tokens.teal} />
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  {location}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <FiDollarSign size={14} color={tokens.amber} />
                <Typography variant="caption" sx={{ color: tokens.amber, fontWeight: 700 }}>
                  {packageLpa.text}
                </Typography>
              </Stack>
              {website && (
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <FiGlobe size={14} color="rgba(255,255,255,0.7)" />
                  <Typography
                    component="a"
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="caption"
                    sx={{
                      color: tokens.teal,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.3,
                      fontWeight: 600,
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    Careers Portal <FiExternalLink size={12} />
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Box>
        </Stack>
      </DialogTitle>

      {/* Tabs Bar */}
      <Box sx={{ borderBottom: 1, borderColor: tokens.line, bgcolor: 'background.paper' }}>
        <Tabs
          value={activeTab}
          onChange={(e, val) => setActiveTab(val)}
          textColor="primary"
          indicatorColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          sx={{ px: 3 }}
        >
          <Tab label="Company Overview" sx={{ textTransform: 'none', fontWeight: 600 }} />
          <Tab
            label={
              <Stack direction="row" spacing={0.8} alignItems="center">
                <span>Skill Match</span>
                <Chip
                  label={`${matchedSkills.length}/${requiredSkills.length}`}
                  size="small"
                  sx={{ height: 18, fontSize: 10, bgcolor: 'rgba(15,157,140,0.1)', color: tokens.tealDark }}
                />
              </Stack>
            }
            sx={{ textTransform: 'none', fontWeight: 600 }}
          />
          <Tab label="Roles & Eligibility" sx={{ textTransform: 'none', fontWeight: 600 }} />
          <Tab label="Hiring Process" sx={{ textTransform: 'none', fontWeight: 600 }} />
        </Tabs>
      </Box>

      {/* Dialog Body Content */}
      <DialogContent sx={{ p: 3, bgcolor: tokens.paper }}>
        {applied && (
          <Alert
            severity="success"
            onClose={() => setApplied(false)}
            sx={{ mb: 2.5, borderRadius: 2.5, bgcolor: 'rgba(15, 157, 140, 0.1)', color: tokens.tealDark }}
          >
            Application submitted! SkillTrace AI has tracked your profile dispatch to {name}.
          </Alert>
        )}

        {/* Tab 0: Overview & Culture */}
        {activeTab === 0 && (
          <Stack spacing={3}>
            <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, bgcolor: 'background.paper', border: `1px solid ${tokens.line}` }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, color: tokens.ink }}>
                About {name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                {about}
              </Typography>
            </Paper>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Paper elevation={0} sx={{ p: 2, borderRadius: 3, bgcolor: 'background.paper', border: `1px solid ${tokens.line}` }}>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                    <FiUsers size={16} color={tokens.teal} />
                    <Typography variant="caption" sx={{ color: tokens.slate, fontWeight: 600 }}>
                      Company Size
                    </Typography>
                  </Stack>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: tokens.ink }}>
                    {employees}
                  </Typography>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <Paper elevation={0} sx={{ p: 2, borderRadius: 3, bgcolor: 'background.paper', border: `1px solid ${tokens.line}` }}>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                    <FiCalendar size={16} color={tokens.teal} />
                    <Typography variant="caption" sx={{ color: tokens.slate, fontWeight: 600 }}>
                      Founded Year
                    </Typography>
                  </Stack>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: tokens.ink }}>
                    {founded}
                  </Typography>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <Paper elevation={0} sx={{ p: 2, borderRadius: 3, bgcolor: 'background.paper', border: `1px solid ${tokens.line}` }}>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                    <FiBriefcase size={16} color={tokens.teal} />
                    <Typography variant="caption" sx={{ color: tokens.slate, fontWeight: 600 }}>
                      Open Roles
                    </Typography>
                  </Stack>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: tokens.ink }}>
                    {openPositionsCount} Positions
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            {cultureHighlights && (
              <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, bgcolor: 'background.paper', border: `1px solid ${tokens.line}` }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5, color: tokens.ink }}>
                  Work Culture & Perks
                </Typography>
                <Grid container spacing={1.5}>
                  {cultureHighlights.map((perk) => (
                    <Grid key={perk} size={{ xs: 12, sm: 6 }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Box sx={{ color: tokens.teal, display: 'grid', placeItems: 'center' }}>
                          <FiZap size={15} />
                        </Box>
                        <Typography variant="body2" sx={{ color: tokens.ink, fontWeight: 500 }}>
                          {perk}
                        </Typography>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            )}
          </Stack>
        )}

        {/* Tab 1: Skill Match & Gap Analysis */}
        {activeTab === 1 && (
          <Stack spacing={3}>
            {/* Match Overview Bar */}
            <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, bgcolor: 'background.paper', border: `1px solid ${tokens.line}` }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: tokens.ink }}>
                  AI Compatibility Score: {matchPercentage}%
                </Typography>
                <Chip
                  label={matchTier}
                  size="small"
                  sx={{ bgcolor: 'rgba(15,157,140,0.1)', color: tokens.tealDark, fontWeight: 700 }}
                />
              </Stack>
              <LinearProgress
                variant="determinate"
                value={matchPercentage}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: tokens.paper,
                  '& .MuiLinearProgress-bar': { bgcolor: tokens.teal, borderRadius: 4 },
                }}
              />
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 1 }}>
                You possess {matchedSkills.length} out of {requiredSkills.length} core required skills for {name}.
              </Typography>
            </Paper>

            {/* Matched Skills List */}
            <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, bgcolor: 'background.paper', border: `1px solid ${tokens.line}` }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                <FiCheckCircle size={18} color={tokens.teal} />
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: tokens.tealDark }}>
                  Matched Skills ({matchedSkills.length})
                </Typography>
              </Stack>
              <Grid container spacing={1.5}>
                {matchedSkills.map((skill) => (
                  <Grid key={skill} size={{ xs: 12, sm: 6 }}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: 'rgba(15,157,140,0.06)',
                        border: '1px solid rgba(15,157,140,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 600, color: tokens.ink }}>
                        {skill}
                      </Typography>
                      <Chip label="Verified" size="small" sx={{ bgcolor: tokens.teal, color: '#FFF', fontSize: 10, height: 18 }} />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>

            {/* Missing Skills & Gap Bridge */}
            {missingSkills.length > 0 ? (
              <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, bgcolor: 'background.paper', border: `1px solid ${tokens.line}` }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                  <FiAlertCircle size={18} color={tokens.amber} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#C47F00' }}>
                    Missing Skills ({missingSkills.length})
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                  Acquiring these remaining skills will boost your compatibility with {name} to 98%+.
                </Typography>
                <Grid container spacing={1.5} sx={{ mb: 2.5 }}>
                  {missingSkills.map((skill) => (
                    <Grid key={skill} size={{ xs: 12, sm: 6 }}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: 'rgba(245,166,35,0.08)',
                          border: '1px solid rgba(245,166,35,0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Typography variant="body2" sx={{ fontWeight: 600, color: tokens.ink }}>
                          {skill}
                        </Typography>
                        <Chip label="Gap Identified" size="small" sx={{ bgcolor: tokens.amber, color: tokens.ink, fontSize: 10, height: 18, fontWeight: 700 }} />
                      </Paper>
                    </Grid>
                  ))}
                </Grid>

                <Button
                  variant="outlined"
                  color="primary"
                  endIcon={<FiArrowRight size={16} />}
                  onClick={handleNavigateToSkillGap}
                  sx={{
                    borderRadius: 2.5,
                    textTransform: 'none',
                    fontWeight: 700,
                    borderColor: tokens.teal,
                    color: tokens.tealDark,
                    '&:hover': { bgcolor: 'rgba(15,157,140,0.08)' },
                  }}
                >
                  Bridge Skill Gap in Module 9
                </Button>
              </Paper>
            ) : (
              <Alert severity="success" sx={{ borderRadius: 2.5 }}>
                Perfect Match! You possess 100% of the required skills for this role.
              </Alert>
            )}
          </Stack>
        )}

        {/* Tab 2: Roles & Eligibility */}
        {activeTab === 2 && (
          <Stack spacing={3}>
            {/* Suitable Roles */}
            <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, bgcolor: 'background.paper', border: `1px solid ${tokens.line}` }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5, color: tokens.ink }}>
                Recommended Open Positions
              </Typography>
              <Stack spacing={1.5}>
                {suitableRoles.map((role, idx) => (
                  <Paper
                    key={role}
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2.5,
                      bgcolor: tokens.paper,
                      border: `1px solid ${tokens.line}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: tokens.ink }}>
                        {role}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Track: {companyType} &bull; Expected Package: {packageLpa.text}
                      </Typography>
                    </Box>
                    <Chip label="Hiring" size="small" sx={{ bgcolor: tokens.teal, color: '#FFF', fontWeight: 700, fontSize: 10 }} />
                  </Paper>
                ))}
              </Stack>
            </Paper>

            {/* Academic Eligibility Criteria */}
            <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, bgcolor: 'background.paper', border: `1px solid ${tokens.line}` }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: tokens.ink }}>
                Academic & Cutoff Criteria
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" sx={{ color: tokens.slate, fontWeight: 700 }}>
                    MINIMUM CGPA / PERCENTAGE
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700, color: tokens.ink, mt: 0.3 }}>
                    CGPA &ge; {eligibility.minCgpa} (No active backlogs)
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" sx={{ color: tokens.slate, fontWeight: 700 }}>
                    ELIGIBLE BATCHES
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700, color: tokens.ink, mt: 0.3 }}>
                    {eligibility.batch}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" sx={{ color: tokens.slate, fontWeight: 700 }}>
                    ALLOWED DEGREES & STREAMS
                  </Typography>
                  <Stack direction="row" spacing={0.8} flexWrap="wrap" useFlexGap sx={{ mt: 0.5 }}>
                    {eligibility.degrees.map((deg) => (
                      <Chip key={deg} label={deg} size="small" sx={{ bgcolor: 'action.hover', fontWeight: 600, fontSize: 11 }} />
                    ))}
                  </Stack>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" sx={{ color: tokens.slate, fontWeight: 700 }}>
                    ACTIVE BACKLOG POLICY
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700, color: tokens.ink, mt: 0.3 }}>
                    {eligibility.backlogsAllowed === 0 ? 'Strictly 0 Active Backlogs' : `Max ${eligibility.backlogsAllowed} Backlog Allowed`}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Stack>
        )}

        {/* Tab 3: Hiring Process Timeline */}
        {activeTab === 3 && (
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, bgcolor: 'background.paper', border: `1px solid ${tokens.line}` }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: tokens.ink }}>
              Interview & Selection Process Roadmap
            </Typography>
            <Stack spacing={2}>
              {hiringProcess.map((step, idx) => (
                <Stack key={step.step} direction="row" spacing={2} alignItems="flex-start">
                  <Box
                    sx={{
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      bgcolor: tokens.teal,
                      color: '#FFFFFF',
                      display: 'grid',
                      placeItems: 'center',
                      fontWeight: 800,
                      fontSize: 14,
                      flexShrink: 0,
                    }}
                  >
                    {step.step}
                  </Box>
                  <Box flex={1} sx={{ pt: 0.3 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: tokens.ink }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.3, lineHeight: 1.5 }}>
                      {step.desc}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Paper>
        )}
      </DialogContent>

      {/* Sticky Action Footer */}
      <DialogActions
        sx={{
          p: 2.5,
          bgcolor: 'background.paper',
          borderTop: `1px solid ${tokens.line}`,
          justify: 'space-between',
        }}
      >
        <Button
          variant="outlined"
          startIcon={<FiBookmark fill={isSaved ? tokens.teal : 'none'} size={16} />}
          onClick={() => onToggleSave(id)}
          sx={{
            borderRadius: 2.5,
            textTransform: 'none',
            fontWeight: 700,
            borderColor: isSaved ? tokens.teal : tokens.line,
            color: isSaved ? tokens.tealDark : tokens.ink,
          }}
        >
          {isSaved ? 'Saved' : 'Save Company'}
        </Button>

        <Box sx={{ ml: 'auto', display: 'flex', gap: 1.5 }}>
          <Button
            variant="text"
            onClick={onClose}
            sx={{ color: tokens.slate, textTransform: 'none', fontWeight: 600 }}
          >
            Close
          </Button>

          <Button
            variant="contained"
            color="primary"
            disabled={applied}
            startIcon={<FiSend size={16} />}
            onClick={handleApply}
            sx={{
              borderRadius: 2.5,
              px: 3,
              py: 1,
              fontWeight: 700,
              bgcolor: tokens.teal,
              '&:hover': { bgcolor: tokens.tealDark },
            }}
          >
            {applied ? 'Application Sent' : 'Apply via SkillTrace'}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
