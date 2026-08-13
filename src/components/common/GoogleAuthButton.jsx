import { Button } from '@mui/material';
import { FcGoogle } from 'react-icons/fc';

// UI only — not wired to a real OAuth flow yet.
export default function GoogleAuthButton({ label = 'Continue with Google', onClick }) {
  return (
    <Button
      fullWidth
      variant="outlined"
      color="inherit"
      startIcon={<FcGoogle size={18} />}
      onClick={onClick}
      sx={{ borderColor: 'divider', color: 'text.primary' }}
    >
      {label}
    </Button>
  );
}
