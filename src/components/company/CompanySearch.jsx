import { Box, TextField, InputAdornment, IconButton, Stack, Typography, Chip } from '@mui/material';
import { FiSearch, FiX } from 'react-icons/fi';
import { tokens } from '../../styles/theme';

const suggestionTags = ['React', 'Python', 'Full Stack', 'Bangalore', 'Remote', 'Product', 'FastAPI'];

export default function CompanySearch({ value, onChange, onSelectSuggestion }) {
  return (
    <Box sx={{ mb: 2.5 }}>
      <TextField
        fullWidth
        placeholder="Search companies by name, required skills (React, Python), location, or job role..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        variant="outlined"
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 3,
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
            borderColor: tokens.line,
            fontSize: '0.95rem',
            transition: 'all 0.2s ease',
            '&:hover fieldset': {
              borderColor: tokens.teal,
            },
            '&.Mui-focused fieldset': {
              borderColor: tokens.teal,
              borderWidth: 2,
            },
          },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <FiSearch size={20} color={tokens.slate} />
              </InputAdornment>
            ),
            endAdornment: value ? (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => onChange('')}
                  aria-label="clear search"
                  edge="end"
                >
                  <FiX size={18} color={tokens.slate} />
                </IconButton>
              </InputAdornment>
            ) : null,
          },
        }}
      />

      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap sx={{ mt: 1.5 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, mr: 0.5 }}>
          Quick Search:
        </Typography>
        {suggestionTags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            onClick={() => onSelectSuggestion(tag)}
            sx={{
              bgcolor: value.toLowerCase() === tag.toLowerCase() ? 'rgba(15, 157, 140, 0.15)' : 'background.paper',
              color: value.toLowerCase() === tag.toLowerCase() ? tokens.tealDark : tokens.slate,
              border: `1px solid ${value.toLowerCase() === tag.toLowerCase() ? tokens.teal : tokens.line}`,
              fontWeight: 500,
              fontSize: 12,
              cursor: 'pointer',
              '&:hover': {
                bgcolor: 'rgba(15, 157, 140, 0.08)',
                color: tokens.tealDark,
                borderColor: tokens.teal,
              },
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}
