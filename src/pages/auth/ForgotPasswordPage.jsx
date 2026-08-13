import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, TextField, Button, Link, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiMail } from 'react-icons/fi';
import { tokens } from '../../styles/theme';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const onSubmit = async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 700));
    setLoading(false);
    setSent(true);
  };

  if (sent) {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: '14px',
            bgcolor: 'rgba(15,157,140,0.12)',
            display: 'grid',
            placeItems: 'center',
            mb: 3,
          }}
        >
          <FiMail size={22} color={tokens.teal} />
        </Box>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Check your inbox
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 4 }}>
          We sent a reset link to <strong>{getValues('email')}</strong>. It expires in 30 minutes.
        </Typography>
        <Button component={RouterLink} to="/login" variant="contained" fullWidth size="large" disableElevation>
          Back to log in
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
        <Link
          component={RouterLink}
          to="/login"
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}
        >
          <FiArrowLeft size={16} /> Back to log in
        </Link>
      </Stack>
      <Typography variant="h4" sx={{ mb: 0.5 }}>
        Forgot your password?
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 4 }}>
        Enter the email tied to your account and we&apos;ll send you a reset link.
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="Email"
          type="email"
          fullWidth
          sx={{ mb: 3 }}
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: { value: EMAIL_PATTERN, message: 'Enter a valid email address' },
          })}
        />
        <Button type="submit" variant="contained" fullWidth size="large" disableElevation disabled={loading}>
          {loading ? 'Sending link…' : 'Send reset link'}
        </Button>
      </Box>
    </motion.div>
  );
}
