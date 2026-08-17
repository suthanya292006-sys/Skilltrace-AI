import { Chip, Box, Stack, Typography, List, ListItemButton, ListItemIcon, ListItemText, Avatar } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
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
  FiShield,
  FiLogOut,
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
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
  { label: 'Admin Portal', to: '/admin', icon: FiShield, badge: 'ADMIN' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const displayName = user?.fullName || 'Suthanya';
  const displayInitials = user?.initials || 'S';

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

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
      <Stack direction="row" alignItems="center" spacing={1.2} sx={{ px: 3, mb: 3 }}>
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

      <List sx={{ px: 1.5, flex: 1, overflowY: 'auto' }}>
        {navItems.map(({ label, to, icon: Icon, badge }) => (
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
            {badge && (
              <Chip
                label={badge}
                size="small"
                sx={{
                  bgcolor: 'rgba(15,157,140,0.15)',
                  color: tokens.tealDark,
                  fontWeight: 800,
                  fontSize: 9,
                  height: 18,
                }}
              />
            )}
          </ListItemButton>
        ))}
      </List>

      {/* User Identity Card Footer */}
      <Box sx={{ px: 2, pt: 1.5 }}>
        <Box
          sx={{
            bgcolor: tokens.ink,
            color: '#fff',
            borderRadius: 3,
            p: 2,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
            <Avatar sx={{ width: 34, height: 34, bgcolor: tokens.teal, fontSize: 13, fontWeight: 800 }}>
              {displayInitials}
            </Avatar>
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography variant="body2" noWrap sx={{ fontWeight: 700, fontSize: 13, lineHeight: 1.2 }}>
                {displayName}
              </Typography>
              <Typography variant="caption" noWrap sx={{ color: 'rgba(255,255,255,0.6)', display: 'block', fontSize: 11 }}>
                {user?.email || 'suthanya@gmail.com'}
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="caption" sx={{ color: tokens.teal, fontWeight: 700, cursor: 'pointer' }} onClick={() => navigate('/profile')}>
              View Profile →
            </Typography>
            <FiLogOut size={14} color="rgba(255,255,255,0.7)" style={{ cursor: 'pointer' }} onClick={handleLogout} />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
