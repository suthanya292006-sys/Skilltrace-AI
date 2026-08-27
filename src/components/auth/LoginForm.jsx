import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Divider,
  Alert,
  Link,
  Stack,
  Chip,
} from '@mui/material';
import PasswordField from '../common/PasswordField';
import GoogleAuthButton from '../common/GoogleAuthButton';
import { useAuth } from '../../context/AuthContext';
import { tokens } from '../../styles/theme';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const onSubmit = async (data) => {
    setSubmitError('');
    setLoading(true);
    try {
      const user = await login({ email: data.email, password: data.password });
      if (user.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      }
    } catch (err) {
      setSubmitError(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {submitError && (
        <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2, fontWeight: 500 }}>
          {submitError}
        </Alert>
      )}

      <TextField
        label="Username or Email Address"
        type="text"
        fullWidth
        sx={{ mb: 2.5 }}
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register('email', {
          required: 'Username or Email is required',
        })}
      />

      <PasswordField
        registration={register('password', {
          required: 'Password is required',
          minLength: { value: 6, message: 'Password must be at least 6 characters' },
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
        sx={{ mb: 1 }}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <FormControlLabel
          control={<Checkbox size="small" defaultChecked {...register('rememberMe')} />}
          label={<Typography variant="body2">Remember me on this browser</Typography>}
        />
        <Link component={RouterLink} to="/forgot-password" variant="body2" underline="hover">
          Forgot password?
        </Link>
      </Box>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        disableElevation
        disabled={loading}
        sx={{ bgcolor: tokens.teal, '&:hover': { bgcolor: tokens.tealDark }, py: 1.3, fontWeight: 700 }}
      >
        {loading ? 'Verifying Account…' : 'Log In to SkillTrace'}
      </Button>

      <Divider sx={{ my: 3 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          OR CONTINUING WITH
        </Typography>
      </Divider>

      <GoogleAuthButton />

      <Typography variant="body2" sx={{ textAlign: 'center', mt: 3, color: 'text.secondary' }}>
        New to SkillTrace AI?{' '}
        <Link component={RouterLink} to="/register" underline="hover" sx={{ fontWeight: 700, color: tokens.teal }}>
          Create an account
        </Link>
      </Typography>
    </Box>
  );
}
