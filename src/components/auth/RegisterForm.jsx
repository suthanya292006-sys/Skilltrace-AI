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
import PasswordField from '../common/PasswordField';
import GoogleAuthButton from '../common/GoogleAuthButton';
import { useAuth } from '../../context/AuthContext';
import { tokens } from '../../styles/theme';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterForm() {
  const navigate = useNavigate();
  const { register: registerAuthUser } = useAuth();

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
      await registerAuthUser({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setSubmitError(err.message || 'Registration failed. Please try again.');
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
        label="Full Name"
        placeholder="e.g. Suthanya A"
        fullWidth
        sx={{ mb: 2.5 }}
        error={!!errors.fullName}
        helperText={errors.fullName?.message}
        {...register('fullName', { required: 'Full name is required' })}
      />

      <TextField
        label="Email Address"
        type="email"
        placeholder="e.g. suthanya@gmail.com"
        fullWidth
        sx={{ mb: 2.5 }}
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register('email', {
          required: 'Email address is required',
          pattern: { value: EMAIL_PATTERN, message: 'Please enter a valid email address' },
        })}
      />

      <PasswordField
        registration={register('password', {
          required: 'Password is required',
          minLength: { value: 6, message: 'Password must be at least 6 characters long' },
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
        sx={{ mb: 2.5 }}
      />

      <PasswordField
        label="Confirm Password"
        registration={register('confirmPassword', {
          required: 'Please confirm your password',
          validate: (value) => value === password || 'Passwords do not match. Please verify.',
        })}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        sx={{ mb: 2.5 }}
        control={
          <Checkbox
            size="small"
            defaultChecked
            {...register('agree', { required: 'Please accept the Terms of Service to continue' })}
          />
        }
        label={
          <Typography variant="body2" color={errors.agree ? 'error' : 'text.secondary'}>
            I agree to the SkillTrace AI Terms of Service and Privacy Policy
          </Typography>
        }
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        disableElevation
        disabled={loading}
        sx={{ bgcolor: tokens.teal, '&:hover': { bgcolor: tokens.tealDark }, py: 1.3, fontWeight: 700 }}
      >
        {loading ? 'Creating Your Account…' : 'Create Account & Access Dashboard'}
      </Button>

      <Divider sx={{ my: 3 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          OR REGISTER WITH
        </Typography>
      </Divider>

      <GoogleAuthButton label="Sign up with Google" />

      <Typography variant="body2" sx={{ textAlign: 'center', mt: 3, color: 'text.secondary' }}>
        Already have an account?{' '}
        <Link component={RouterLink} to="/login" underline="hover" sx={{ fontWeight: 700, color: tokens.teal }}>
          Log in here
        </Link>
      </Typography>
    </Box>
  );
}
