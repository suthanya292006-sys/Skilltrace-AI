import { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { FiEye, FiEyeOff, FiLock } from 'react-icons/fi';

export default function PasswordField({ label = 'Password', registration, error, helperText, ...rest }) {
  const [visible, setVisible] = useState(false);

  return (
    <TextField
      label={label}
      type={visible ? 'text' : 'password'}
      fullWidth
      error={!!error}
      helperText={helperText}
      {...registration}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <FiLock size={16} />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label={visible ? 'Hide password' : 'Show password'}
              onClick={() => setVisible((v) => !v)}
              edge="end"
              size="small"
            >
              {visible ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...rest}
    />
  );
}
