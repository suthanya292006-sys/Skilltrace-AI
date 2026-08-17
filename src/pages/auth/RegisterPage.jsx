import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import RegisterForm from '../../components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
      <Typography variant="h4" sx={{ mb: 0.5, fontWeight: 700 }}>
        Create your account
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 3.5 }}>
        Start tracing your career trajectory and portfolio score in minutes.
      </Typography>

      <RegisterForm />
    </motion.div>
  );
}
