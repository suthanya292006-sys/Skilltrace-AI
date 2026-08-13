import { Box, Typography, Stack, Chip, Button, Paper, IconButton, Tooltip, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';
import {
  FiBookmark,
  FiMapPin,
  FiDollarSign,
  FiCheckCircle,
  FiBriefcase,
  FiStar,
  FiChevronRight,
  FiCheck,
} from 'react-icons/fi';
import { tokens } from '../../styles/theme';

function getMatchColor(score) {
  if (score >= 90) return { main: tokens.teal, dark: tokens.tealDark, bg: 'rgba(15, 157, 140, 0.12)' };
  if (score >= 80) return { main: tokens.amber, dark: '#D98200', bg: 'rgba(245, 166, 35, 0.15)' };
  return { main: tokens.slate, dark: tokens.ink, bg: 'rgba(102, 112, 133, 0.12)' };
}

function getTypeBadgeColor(type) {
  switch (type) {
    case 'Product':
      return { bg: 'rgba(15, 157, 140, 0.1)', color: tokens.tealDark };
    case 'Startup':
      return { bg: 'rgba(245, 166, 35, 0.12)', color: '#C47F00' };
    case 'MNC':
      return { bg: 'rgba(66, 133, 244, 0.12)', color: '#1A73E8' };
    case 'Remote':
      return { bg: 'rgba(123, 44, 191, 0.12)', color: '#7B2CBF' };
    case 'Government':
      return { bg: 'rgba(15, 122, 96, 0.12)', color: '#0F7A60' };
    case 'Service':
    default:
      return { bg: 'rgba(102, 112, 133, 0.12)', color: tokens.slate };
  }
}

export default function CompanyCard({ company, isSaved, onToggleSave, onViewDetails }) {
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
    isFeatured,
  } = company;

  const matchColors = getMatchColor(matchPercentage);
  const typeColors = getTypeBadgeColor(companyType);

  return (
    <Paper
      component={motion.div}
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      elevation={0}
      sx={{
        borderRadius: 3.5,
        p: 2.6,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        border: `1px solid ${isFeatured ? 'rgba(15, 157, 140, 0.4)' : tokens.line}`,
        position: 'relative',
        transition: 'all 0.25 ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px rgba(16, 24, 40, 0.08)',
          borderColor: tokens.teal,
        },
      }}
    >
      {/* Featured AI Top Pick Ribbon */}
      {isFeatured && (
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            right: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            bgcolor: 'rgba(15, 157, 140, 0.1)',
            color: tokens.tealDark,
            px: 1.2,
            py: 0.4,
            borderRadius: 2,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 0.5,
            border: `1px solid rgba(15, 157, 140, 0.2)`,
          }}
        >
          <FiStar size={11} color={tokens.amber} /> AI TOP PICK
        </Box>
      )}

      {/* Top Header: Logo + Name + Save */}
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ mb: 2 }}>
        <Stack direction="row" spacing={1.6} alignItems="center">
          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: '12px',
              bgcolor: logoBg || tokens.ink,
              color: '#FFFFFF',
              display: 'grid',
              placeItems: 'center',
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 800,
              fontSize: 13,
              letterSpacing: 0.5,
              flexShrink: 0,
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            }}
          >
            {logoText}
          </Box>
          <Box>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 17, lineHeight: 1.2 }}>
                {name}
              </Typography>
              <Chip
                label={companyType}
                size="small"
                sx={{
                  bgcolor: typeColors.bg,
                  color: typeColors.color,
                  fontWeight: 700,
                  fontSize: 10,
                  height: 20,
                }}
              />
            </Stack>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 12, mt: 0.3, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {tagline}
            </Typography>
          </Box>
        </Stack>

        {!isFeatured && (
          <Tooltip title={isSaved ? 'Remove from Saved' : 'Save Company'}>
            <IconButton
              size="small"
              onClick={() => onToggleSave(id)}
              sx={{
                color: isSaved ? tokens.teal : tokens.slate,
                bgcolor: isSaved ? 'rgba(15,157,140,0.1)' : 'transparent',
                '&:hover': { bgcolor: 'rgba(15,157,140,0.15)', color: tokens.teal },
              }}
            >
              <FiBookmark size={18} fill={isSaved ? tokens.teal : 'none'} />
            </IconButton>
          </Tooltip>
        )}
      </Stack>

      {/* AI Match Gauge */}
      <Box
        sx={{
          mb: 2.2,
          p: 1.5,
          borderRadius: 2.5,
          bgcolor: matchColors.bg,
          border: `1px solid ${matchColors.main}30`,
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.8 }}>
          <Stack direction="row" alignItems="center" spacing={0.6}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: matchColors.dark, textTransform: 'uppercase', fontSize: 11 }}>
              AI Match Index
            </Typography>
            <Chip
              label={matchTier}
              size="small"
              sx={{
                bgcolor: '#FFFFFF',
                color: matchColors.dark,
                fontWeight: 700,
                fontSize: 10,
                height: 18,
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              }}
            />
          </Stack>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: matchColors.dark, fontSize: 16, fontFamily: '"Space Grotesk", sans-serif' }}>
            {matchPercentage}%
          </Typography>
        </Stack>

        <LinearProgress
          variant="determinate"
          value={matchPercentage}
          sx={{
            height: 6,
            borderRadius: 3,
            bgcolor: '#FFFFFF',
            '& .MuiLinearProgress-bar': { bgcolor: matchColors.main, borderRadius: 3 },
          }}
        />
      </Box>

      {/* Key Info: Salary LPA + Location + Eligibility */}
      <Stack spacing={1.2} sx={{ mb: 2.2 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box sx={{ minWidth: 22, color: tokens.teal }}>
            <FiDollarSign size={16} color={tokens.teal} />
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 700, color: tokens.ink, fontSize: 14 }}>
            {packageLpa.text}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Box sx={{ minWidth: 22, color: tokens.slate }}>
            <FiMapPin size={15} color={tokens.slate} />
          </Box>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
            {location} &bull; <Box component="span" sx={{ fontWeight: 600, color: tokens.ink }}>{workMode}</Box>
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Box sx={{ minWidth: 22, color: tokens.slate }}>
            <FiCheckCircle size={15} color={tokens.slate} />
          </Box>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
            {eligibility.text}
          </Typography>
        </Stack>
      </Stack>

      {/* Suitable Roles */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="caption" sx={{ color: tokens.slate, fontWeight: 700, display: 'block', mb: 0.8 }}>
          SUITABLE ROLES:
        </Typography>
        <Stack direction="row" spacing={0.6} flexWrap="wrap" useFlexGap>
          {suitableRoles.map((role) => (
            <Chip
              key={role}
              label={role}
              size="small"
              icon={<FiBriefcase size={10} style={{ color: tokens.tealDark }} />}
              sx={{
                bgcolor: 'rgba(15, 157, 140, 0.08)',
                color: tokens.tealDark,
                fontSize: 11,
                fontWeight: 600,
                height: 22,
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* Required & Matched Skills */}
      <Box sx={{ mb: 2.5 }}>
        <Typography variant="caption" sx={{ color: tokens.slate, fontWeight: 700, display: 'block', mb: 0.8 }}>
          REQUIRED SKILLS ({matchedSkills.length}/{requiredSkills.length} Matched):
        </Typography>
        <Stack direction="row" spacing={0.6} flexWrap="wrap" useFlexGap>
          {requiredSkills.map((skill) => {
            const isMatched = matchedSkills.includes(skill);
            return (
              <Chip
                key={skill}
                label={skill}
                size="small"
                icon={isMatched ? <FiCheck size={11} style={{ color: tokens.tealDark }} /> : undefined}
                sx={{
                  bgcolor: isMatched ? 'rgba(15, 157, 140, 0.12)' : 'action.hover',
                  color: isMatched ? tokens.tealDark : tokens.slate,
                  fontWeight: isMatched ? 700 : 500,
                  fontSize: 11,
                  border: `1px solid ${isMatched ? 'rgba(15, 157, 140, 0.3)' : 'transparent'}`,
                }}
              />
            );
          })}
        </Stack>
      </Box>

      {/* Footer Actions */}
      <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mt: 'auto' }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          endIcon={<FiChevronRight size={16} />}
          onClick={() => onViewDetails(company)}
          sx={{
            borderRadius: 2.5,
            py: 1,
            fontWeight: 700,
            fontSize: 13,
            bgcolor: tokens.teal,
            '&:hover': { bgcolor: tokens.tealDark },
          }}
        >
          View Details
        </Button>

        {isFeatured && (
          <Tooltip title={isSaved ? 'Remove from Saved' : 'Save Company'}>
            <IconButton
              onClick={() => onToggleSave(id)}
              sx={{
                border: `1px solid ${isSaved ? tokens.teal : tokens.line}`,
                color: isSaved ? tokens.teal : tokens.slate,
                bgcolor: isSaved ? 'rgba(15,157,140,0.1)' : 'transparent',
                borderRadius: 2.5,
                p: 1.1,
                '&:hover': { bgcolor: 'rgba(15,157,140,0.15)', borderColor: tokens.teal },
              }}
            >
              <FiBookmark size={18} fill={isSaved ? tokens.teal : 'none'} />
            </IconButton>
          </Tooltip>
        )}
      </Stack>
    </Paper>
  );
}
