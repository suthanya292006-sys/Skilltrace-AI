import { useState } from 'react';
import {
  Box,
  InputBase,
  Avatar,
  Typography,
  Stack,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiUser, FiSettings, FiLogOut, FiShield } from 'react-icons/fi';
import NotificationsMenu from './NotificationsMenu';
import { useAuth } from '../../context/AuthContext';
import { tokens } from '../../styles/theme';

export default function DashboardHeader() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const displayName = user?.fullName || 'Suthanya';
  const displayInitials = user?.initials || 'S';
  const department = user?.department || 'Computer Science & Engineering';

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    handleMenuClose();
    navigate(path);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 5,
        bgcolor: 'background.paper',
        borderBottom: `1px solid ${tokens.line}`,
        px: { xs: 2, md: 4 },
        py: 1.6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          bgcolor: 'background.default',
          border: `1px solid ${tokens.line}`,
          borderRadius: 2,
          px: 1.5,
          py: 0.7,
          width: { xs: '100%', sm: 320 },
        }}
      >
        <FiSearch size={16} color={tokens.slate} />
        <InputBase placeholder="Search skills, companies, reports…" fullWidth sx={{ fontSize: 14 }} />
      </Box>

      <Stack direction="row" alignItems="center" spacing={2}>
        <NotificationsMenu />

        {/* User Identity Avatar Dropdown */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.2}
          onClick={handleMenuOpen}
          sx={{ cursor: 'pointer', p: 0.5, borderRadius: 2, '&:hover': { bgcolor: 'rgba(15,157,140,0.06)' } }}
        >
          <Avatar sx={{ width: 36, height: 36, bgcolor: tokens.teal, fontSize: 14, fontWeight: 700 }}>
            {displayInitials}
          </Avatar>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.1, color: tokens.ink }}>
              {displayName}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: 11 }}>
              {department}
            </Typography>
          </Box>
        </Stack>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 0,
            sx: {
              mt: 1.5,
              minWidth: 200,
              borderRadius: 3,
              border: `1px solid ${tokens.line}`,
              boxShadow: '0 10px 25px rgba(16,24,40,0.08)',
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: tokens.ink }}>
              {displayName}
            </Typography>
            <Typography variant="caption" sx={{ color: tokens.slate, display: 'block' }}>
              {user?.email || 'suthanya@gmail.com'}
            </Typography>
          </Box>

          <Divider sx={{ my: 0.5 }} />

          <MenuItem onClick={() => handleNavigate('/profile')}>
            <ListItemIcon>
              <FiUser size={16} color={tokens.teal} />
            </ListItemIcon>
            Profile Control Center
          </MenuItem>

          <MenuItem onClick={() => handleNavigate('/settings')}>
            <ListItemIcon>
              <FiSettings size={16} color={tokens.teal} />
            </ListItemIcon>
            Account Settings
          </MenuItem>

          <MenuItem onClick={() => handleNavigate('/admin')}>
            <ListItemIcon>
              <FiShield size={16} color={tokens.teal} />
            </ListItemIcon>
            Admin Portal
          </MenuItem>

          <Divider sx={{ my: 0.5 }} />

          <MenuItem onClick={handleLogout} sx={{ color: tokens.danger }}>
            <ListItemIcon>
              <FiLogOut size={16} color={tokens.danger} />
            </ListItemIcon>
            Sign Out
          </MenuItem>
        </Menu>
      </Stack>
    </Box>
  );
}
