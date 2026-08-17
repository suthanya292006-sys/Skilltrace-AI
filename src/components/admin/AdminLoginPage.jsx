import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  Chip,
  InputAdornment,
  IconButton,
  Divider,
} from '@mui/material';
import {
  FiShield,
  FiLock,
  FiUser,
  FiKey,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
  FiArrowLeft,
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { tokens } from '../../styles/theme';

export default function AdminLoginPage({ onSuccess }) {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login({ email: username, password });
      if (user.role !== 'admin') {
        setError('Access Denied: Account does not possess System Administrator privileges.');
      } else {
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      setError(err.message || 'Invalid admin credentials. Please verify username and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ width: '100%', maxWidth: 520 }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4.5 },
            borderRadius: 4,
            border: `1px solid ${tokens.line}`,
            bgcolor: '#ffffff',
            boxShadow: '0 16px 40px rgba(15,23,42,0.08)',
          }}
        >
          {/* Header Badge & Title */}
          <Stack alignItems="center" textAlign="center" spacing={1.5} sx={{ mb: 3.5 }}>
            <Box
              sx={{
                width: 54,
                height: 54,
                borderRadius: '16px',
                bgcolor: tokens.ink,
                color: '#ffffff',
                display: 'grid',
                placeItems: 'center',
                boxShadow: '0 8px 20px rgba(29,53,87,0.3)',
              }}
            >
              <FiShield size={28} />
            </Box>

            <Box>
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mb: 0.5 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: tokens.ink, fontSize: 22 }}>
                  Admin Security Gateway
                </Typography>
                <Chip
                  label="RESTRICTED"
                  size="small"
                  sx={{
                    bgcolor: 'rgba(231,111,81,0.12)',
                    color: tokens.danger,
                    fontWeight: 800,
                    fontSize: 10,
                    height: 20,
                  }}
                />
              </Stack>
              <Typography variant="body2" sx={{ color: tokens.slate, fontSize: 13.5 }}>
                Authorized System Management & Institution Control Panel
              </Typography>
            </Box>
          </Stack>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2.5, fontWeight: 600 }}>
              {error}
            </Alert>
          )}

          {/* Login Form */}
          <Box component="form" onSubmit={handleAdminSubmit} noValidate>
            <TextField
              label="Admin Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              sx={{ mb: 2.5 }}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FiUser size={18} color={tokens.slate} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Admin Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              sx={{ mb: 3 }}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FiLock size={18} color={tokens.slate} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                      {showPassword ? <FiEyeOff size={18} color={tokens.slate} /> : <FiEye size={18} color={tokens.slate} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              startIcon={<FiKey size={18} />}
              sx={{
                bgcolor: tokens.ink,
                '&:hover': { bgcolor: '#0D1B2A' },
                py: 1.4,
                fontWeight: 700,
                fontSize: 15,
                borderRadius: 2.5,
                boxShadow: '0 4px 14px rgba(29,53,87,0.25)',
              }}
            >
              {loading ? 'Authenticating Admin Session…' : 'Unlock Admin Dashboard'}
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Security Protocols Footer */}
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <FiCheckCircle size={14} color={tokens.teal} />
              <Typography variant="caption" sx={{ color: tokens.slate, fontWeight: 500 }}>
                Protected with 256-bit Session Security & System Audit Trail
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <FiCheckCircle size={14} color={tokens.teal} />
              <Typography variant="caption" sx={{ color: tokens.slate, fontWeight: 500 }}>
                Role-Based Access Control (RBAC) enforced for FastAPI + MongoDB endpoints
              </Typography>
            </Stack>
          </Stack>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button
              startIcon={<FiArrowLeft size={14} />}
              onClick={() => navigate('/dashboard')}
              sx={{ color: tokens.slate, textTransform: 'none', fontWeight: 600, fontSize: 13 }}
            >
              Return to Student Dashboard
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
}
