import { Box, Typography, Stack, Chip } from '@mui/material';
import { FiStar } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import { tokens } from '../../styles/theme';

function priorityColor(p) {
  if (p === 'High') return tokens.danger;
  if (p === 'Medium') return tokens.amber;
  return tokens.slate;
}

export default function RecommendedSkillsCard({ items }) {
  return (
    <DashboardCard title="Recommended Skills" subtitle="Prioritized by impact on your career matches" icon={FiStar}>
      <Stack spacing={1.6}>
        {items.map((item) => (
          <Stack
            key={item.skill}
            direction="row"
            spacing={1.4}
            alignItems="flex-start"
            sx={{ border: `1px solid ${tokens.line}`, borderRadius: 2.5, p: 1.6 }}
          >
            <Box sx={{ flex: 1 }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {item.skill}
                </Typography>
                <Chip
                  size="small"
                  label={item.priority}
                  sx={{
                    height: 20,
                    fontSize: 11,
                    fontWeight: 600,
                    color: priorityColor(item.priority),
                    bgcolor: `${priorityColor(item.priority)}1A`,
                  }}
                />
              </Stack>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.5 }}>
                {item.reason}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
    </DashboardCard>
  );
}
