import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { tokens } from '../../styles/theme';

const options = [
  { value: 'match', label: 'Best match' },
  { value: 'salary', label: 'Salary' },
  { value: 'growth', label: 'Growth' },
];

export default function CareerSortControl({ value, onChange }) {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      size="small"
      onChange={(_, v) => v && onChange(v)}
      sx={{
        '& .MuiToggleButton-root': {
          textTransform: 'none',
          fontSize: 12.5,
          fontWeight: 500,
          px: 1.6,
          border: `1px solid ${tokens.line}`,
          color: 'text.secondary',
          '&.Mui-selected': {
            bgcolor: 'rgba(15,157,140,0.1)',
            color: tokens.tealDark,
            '&:hover': { bgcolor: 'rgba(15,157,140,0.16)' },
          },
        },
      }}
    >
      {options.map((o) => (
        <ToggleButton key={o.value} value={o.value}>
          {o.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
