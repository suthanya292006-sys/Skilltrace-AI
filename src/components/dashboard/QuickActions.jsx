import { Box, Typography, Stack, ButtonBase } from '@mui/material';
import { FiUploadCloud, FiPlusSquare, FiPlayCircle, FiFileText } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import { tokens } from '../../styles/theme';

const actions = [
  { icon: FiUploadCloud, label: 'Upload Resume' },
  { icon: FiPlusSquare, label: 'Add Project' },
  { icon: FiPlayCircle, label: 'Take Assessment' },
  { icon: FiFileText, label: 'Generate Report' },
];

export default function QuickActions() {
  return (
    <DashboardCard title="Quick Actions">
      <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
        {actions.map((a) => (
          <ButtonBase
            key={a.label}
            sx={{
              flex: '1 1 45%',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
              py: 2,
              borderRadius: 2.5,
              border: `1px solid ${tokens.line}`,
              transition: 'all 0.15s ease',
              '&:hover': { borderColor: tokens.teal, bgcolor: 'rgba(15,157,140,0.06)' },
            }}
          >
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: '10px',
                bgcolor: 'rgba(15,157,140,0.1)',
                color: tokens.tealDark,
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <a.icon size={16} />
            </Box>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              {a.label}
            </Typography>
          </ButtonBase>
        ))}
      </Stack>
    </DashboardCard>
  );
}
