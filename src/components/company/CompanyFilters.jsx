import { Box, Stack, Chip, Button, Typography, Badge } from '@mui/material';
import {
  FiBriefcase,
  FiBox,
  FiZap,
  FiGlobe,
  FiLayers,
  FiHome,
  FiAward,
  FiBookmark,
  FiRotateCcw,
} from 'react-icons/fi';
import { tokens } from '../../styles/theme';

const filterOptions = [
  { id: 'All', label: 'All', icon: FiBriefcase },
  { id: 'Product', label: 'Product', icon: FiBox },
  { id: 'Startup', label: 'Startup', icon: FiZap },
  { id: 'MNC', label: 'MNC', icon: FiGlobe },
  { id: 'Service', label: 'Service', icon: FiLayers },
  { id: 'Remote', label: 'Remote', icon: FiHome },
  { id: 'Government', label: 'Government', icon: FiAward },
];

export default function CompanyFilters({
  activeFilter,
  onFilterChange,
  savedOnly,
  onToggleSavedOnly,
  savedCount,
  onResetFilters,
  isFiltered,
}) {
  return (
    <Box
      sx={{
        mb: 3,
        p: 1.5,
        bgcolor: 'background.paper',
        borderRadius: 3,
        border: `1px solid ${tokens.line}`,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'stretch', md: 'center' },
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{
          overflowX: 'auto',
          pb: { xs: 1, md: 0 },
          '&::-webkit-scrollbar': { height: 4 },
          '&::-webkit-scrollbar-thumb': { bgcolor: tokens.line, borderRadius: 2 },
        }}
      >
        {filterOptions.map((opt) => {
          const Icon = opt.icon;
          const isActive = !savedOnly && activeFilter === opt.id;
          return (
            <Chip
              key={opt.id}
              icon={<Icon size={14} style={{ color: isActive ? '#FFFFFF' : tokens.slate }} />}
              label={opt.label}
              onClick={() => {
                if (savedOnly) onToggleSavedOnly(false);
                onFilterChange(opt.id);
              }}
              sx={{
                bgcolor: isActive ? tokens.teal : 'transparent',
                color: isActive ? '#FFFFFF' : 'text.primary',
                fontWeight: isActive ? 700 : 500,
                borderRadius: 2.5,
                px: 1,
                py: 2.2,
                border: `1px solid ${isActive ? tokens.teal : tokens.line}`,
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: isActive ? tokens.tealDark : 'rgba(15, 157, 140, 0.08)',
                  borderColor: tokens.teal,
                },
                '& .MuiChip-icon': {
                  color: isActive ? '#FFFFFF !important' : `${tokens.slate} !important`,
                },
              }}
            />
          );
        })}
      </Stack>

      <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="flex-end">
        {/* Saved Companies Toggle */}
        <Badge badgeContent={savedCount} color="secondary" max={99}>
          <Button
            variant={savedOnly ? 'contained' : 'outlined'}
            color="primary"
            size="small"
            startIcon={<FiBookmark size={15} />}
            onClick={() => onToggleSavedOnly(!savedOnly)}
            sx={{
              borderRadius: 2.5,
              textTransform: 'none',
              fontWeight: 600,
              px: 2,
              py: 0.8,
              bgcolor: savedOnly ? tokens.teal : 'background.paper',
              borderColor: savedOnly ? tokens.teal : tokens.line,
              color: savedOnly ? '#FFFFFF' : tokens.ink,
              '&:hover': {
                bgcolor: savedOnly ? tokens.tealDark : 'rgba(15, 157, 140, 0.08)',
                borderColor: tokens.teal,
              },
            }}
          >
            Saved Companies
          </Button>
        </Badge>

        {/* Clear Filters Button */}
        {isFiltered && (
          <Button
            variant="text"
            size="small"
            startIcon={<FiRotateCcw size={14} />}
            onClick={onResetFilters}
            sx={{
              color: tokens.slate,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: 13,
              '&:hover': { color: tokens.danger, bgcolor: 'rgba(228, 87, 46, 0.08)' },
            }}
          >
            Reset
          </Button>
        )}
      </Stack>
    </Box>
  );
}
