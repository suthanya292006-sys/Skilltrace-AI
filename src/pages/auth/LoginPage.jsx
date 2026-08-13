import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import { motion } from 'framer-motion';
import PasswordField from '../../components/common/PasswordField';
import GoogleAuthButton from '../../components/common/GoogleAuthButton';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const onSubmit = async (data) => {
    setSubmitError('');
    setLoading(true);
    try {
      // Frontend-only stub: wire this up to services/authService once the
      // backend auth endpoint is available.
      await new Promise((res) => setTimeout(res, 700));
      navigate('/dashboard');
    } catch {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
      <Typography variant="h4" sx={{ mb: 0.5 }}>
        Welcome back
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 4 }}>
        Log in to keep your trajectory moving.
      </Typography>

      {submitError && (
        <Alert severity="error" sx={{ mb: 2.5 }}>
          {submitError}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="Email"
          type="email"
          fullWidth
          sx={{ mb: 2.5 }}
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: { value: EMAIL_PATTERN, message: 'Enter a valid email address' },
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
            control={<Checkbox size="small" {...register('rememberMe')} />}
            label={<Typography variant="body2">Remember me</Typography>}
          />
          <Link component={RouterLink} to="/forgot-password" variant="body2" underline="hover">
            Forgot password?
          </Link>
        </Box>

        <Button type="submit" variant="contained" fullWidth size="large" disableElevation disabled={loading}>
          {loading ? 'Logging in…' : 'Log in'}
        </Button>

        <Divider sx={{ my: 3 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            OR
          </Typography>
        </Divider>

        <GoogleAuthButton />

        <Typography variant="body2" sx={{ textAlign: 'center', mt: 3, color: 'text.secondary' }}>
          New to SkillTrace AI?{' '}
          <Link component={RouterLink} to="/register" underline="hover">
            Create an account
          </Link>
        </Typography>
      </Box>
    </motion.div>
  );
}
