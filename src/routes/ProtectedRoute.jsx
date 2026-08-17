import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { tokens } from '../styles/theme';

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          bgcolor: tokens.paper,
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={36} sx={{ color: tokens.teal, mb: 2 }} />
          <Typography variant="body2" sx={{ color: tokens.slate, fontWeight: 500 }}>
            Authenticating SkillTrace session…
          </Typography>
        </Box>
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
