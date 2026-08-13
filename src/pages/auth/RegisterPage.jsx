import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Link,
  FormControlLabel,
  Checkbox,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import PasswordField from '../../components/common/PasswordField';
import GoogleAuthButton from '../../components/common/GoogleAuthButton';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterPage() {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const password = watch('password');

  const onSubmit = async (data) => {
    setSubmitError('');
    setLoading(true);
    try {
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
        Create your account
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 4 }}>
        Start tracing your career trajectory in minutes.
      </Typography>

      {submitError && (
        <Alert severity="error" sx={{ mb: 2.5 }}>
          {submitError}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="Full name"
          fullWidth
          sx={{ mb: 2.5 }}
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Full name is required' })}
        />

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
            minLength: { value: 8, message: 'Use at least 8 characters' },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
              message: 'Include at least one letter and one number',
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          sx={{ mb: 2.5 }}
        />

        <PasswordField
          label="Confirm password"
          registration={register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) => value === password || 'Passwords do not match',
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          sx={{ mb: 2 }}
        />

        <FormControlLabel
          sx={{ mb: 2 }}
          control={
            <Checkbox
              size="small"
              {...register('agree', { required: 'Please accept the terms to continue' })}
            />
          }
          label={
            <Typography variant="body2" color={errors.agree ? 'error' : 'text.secondary'}>
              I agree to the Terms of Service and Privacy Policy
            </Typography>
          }
        />

        <Button type="submit" variant="contained" fullWidth size="large" disableElevation disabled={loading}>
          {loading ? 'Creating account…' : 'Create account'}
        </Button>

        <Divider sx={{ my: 3 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            OR
          </Typography>
        </Divider>

        <GoogleAuthButton label="Sign up with Google" />

        <Typography variant="body2" sx={{ textAlign: 'center', mt: 3, color: 'text.secondary' }}>
          Already have an account?{' '}
          <Link component={RouterLink} to="/login" underline="hover">
            Log in
          </Link>
        </Typography>
      </Box>
    </motion.div>
  );
}
