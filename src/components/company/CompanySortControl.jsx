import { Stack, Typography, FormControl, Select, MenuItem } from '@mui/material';
import { FiSliders } from 'react-icons/fi';
import { tokens } from '../../styles/theme';

export default function CompanySortControl({ value, onChange }) {
  return (
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <Stack direction="row" alignItems="center" spacing={0.6}>
        <FiSliders size={16} color={tokens.slate} />
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, fontSize: 13 }}>
          Sort by:
        </Typography>
      </Stack>
      <FormControl size="small">
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          sx={{
            borderRadius: 2.5,
            bgcolor: 'background.paper',
            fontSize: 13,
            fontWeight: 600,
            color: tokens.ink,
            height: 38,
            minWidth: 165,
            border: `1px solid ${tokens.line}`,
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
            '&:hover': { bgcolor: 'rgba(15, 157, 140, 0.04)' },
          }}
        >
          <MenuItem value="recommended">Recommended Fit</MenuItem>
          <MenuItem value="match">Match % (High to Low)</MenuItem>
          <MenuItem value="package">Package (Highest LPA)</MenuItem>
          <MenuItem value="name">Company Name (A-Z)</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}
