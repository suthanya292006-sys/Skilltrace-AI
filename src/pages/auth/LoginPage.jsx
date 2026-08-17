import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import LoginForm from '../../components/auth/LoginForm';

export default function LoginPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
      <Typography variant="h4" sx={{ mb: 0.5, fontWeight: 700 }}>
        Welcome back
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 3.5 }}>
        Log in to access your personalized career intelligence workspace.
      </Typography>

      <LoginForm />
    </motion.div>
  );
}
