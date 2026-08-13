import { Box, Stack, Typography, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';
import {
  FiGrid,
  FiFolder,
  FiCheckSquare,
  FiTrendingUp,
  FiBriefcase,
  FiFileText,
  FiUser,
  FiSettings,
  FiBarChart2,
  FiTarget,
  FiCompass,
} from 'react-icons/fi';
import { tokens } from '../../styles/theme';

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: FiGrid },
  { label: 'Portfolio', to: '/portfolio', icon: FiFolder },
  { label: 'AI Analysis', to: '/dashboard/portfolio-analysis', icon: FiTrendingUp },
  { label: 'Assessments', to: '/assessment', icon: FiCheckSquare },
  { label: 'Skill Analysis', to: '/skills', icon: FiBarChart2 },
  { label: 'Career Path', to: '/career', icon: FiTrendingUp },
  { label: 'Placement', to: '/placement', icon: FiTarget },
  { label: 'Skill Gap', to: '/skill-gap', icon: FiCompass },
  { label: 'Companies', to: '/companies', icon: FiBriefcase },
  { label: 'Reports', to: '/reports', icon: FiFileText },
  { label: 'Profile', to: '/profile', icon: FiUser },
  { label: 'Settings', to: '/settings', icon: FiSettings },
];

export default function Sidebar() {
  return (
    <Box
      component="nav"
      sx={{
        width: 260,
        flexShrink: 0,
        height: '100vh',
        position: 'sticky',
        top: 0,
        borderRight: `1px solid ${tokens.line}`,
        bgcolor: 'background.paper',
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        py: 3,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1.2} sx={{ px: 3, mb: 4 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '8px',
            bgcolor: tokens.teal,
            display: 'grid',
            placeItems: 'center',
            color: '#fff',
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 700,
          }}
        >
          S
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 17 }}>
          SkillTrace <Box component="span" sx={{ color: tokens.teal }}>AI</Box>
        </Typography>
      </Stack>

      <List sx={{ px: 1.5, flex: 1 }}>
        {navItems.map(({ label, to, icon: Icon }) => (
          <ListItemButton
            key={to}
            component={NavLink}
            to={to}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              color: 'text.secondary',
              '&.active': {
                bgcolor: 'rgba(15,157,140,0.1)',
                color: tokens.tealDark,
                '& .MuiListItemIcon-root': { color: tokens.tealDark },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
              <Icon size={18} />
            </ListItemIcon>
            <ListItemText primary={label} primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }} />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ px: 3 }}>
        <Box
          sx={{
            bgcolor: tokens.ink,
            color: '#fff',
            borderRadius: 3,
            p: 2.2,
          }}
        >
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
            AI TIP
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5, lineHeight: 1.4 }}>
            Add 1 more project with a live demo link to boost your score by ~6 pts.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
