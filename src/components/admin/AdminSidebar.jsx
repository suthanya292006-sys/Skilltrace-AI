import { Box, Stack, Typography, Chip, Tabs, Tab } from '@mui/material';
import {
  FiGrid,
  FiUsers,
  FiCheckSquare,
  FiBriefcase,
  FiTrendingUp,
  FiBarChart2,
  FiShield,
} from 'react-icons/fi';
import { tokens } from '../../styles/theme';

const adminTabs = [
  { id: 'overview', label: 'Overview', icon: FiGrid },
  { id: 'students', label: 'Student Management', icon: FiUsers },
  { id: 'assessments', label: 'Assessment Management', icon: FiCheckSquare },
  { id: 'companies', label: 'Company Portal', icon: FiBriefcase },
  { id: 'careers', label: 'Career Paths', icon: FiTrendingUp },
  { id: 'analytics', label: 'Analytics & Reports', icon: FiBarChart2 },
];

export default function AdminSidebar({ currentTab, onTabChange }) {
  return (
    <Box
      sx={{
        bgcolor: '#ffffff',
        border: `1px solid ${tokens.line}`,
        borderRadius: 3,
        p: 2,
        mb: 4,
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-start', md: 'center' }}
        justifyContent="space-between"
        spacing={2}
        sx={{ pb: 1.5, mb: 1, borderBottom: `1px solid ${tokens.line}` }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              bgcolor: tokens.ink,
              color: '#ffffff',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <FiShield size={18} />
          </Box>
          <Box>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: tokens.ink, fontSize: 17 }}>
                Admin Control Center
              </Typography>
              <Chip
                label="SUPER ADMIN"
                size="small"
                sx={{
                  bgcolor: 'rgba(15,157,140,0.12)',
                  color: tokens.tealDark,
                  fontWeight: 800,
                  fontSize: 10,
                  height: 20,
                }}
              />
            </Stack>
            <Typography variant="caption" sx={{ color: tokens.slate }}>
              Manage university students, online assessments, hiring companies, and AI analytics
            </Typography>
          </Box>
        </Stack>
      </Stack>

      <Box sx={{ width: '100%' }}>
        <Tabs
          value={currentTab}
          onChange={(_, value) => onTabChange(value)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            minHeight: 40,
            '& .MuiTab-root': {
              minHeight: 40,
              py: 0.5,
              px: 2,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: 13.5,
              textTransform: 'none',
              color: tokens.slate,
              mr: 0.5,
              '&.Mui-selected': {
                bgcolor: tokens.teal,
                color: '#ffffff',
                '& .MuiSvgIcon-root, & svg': { color: '#ffffff' },
              },
            },
            '& .MuiTabs-indicator': { display: 'none' },
          }}
        >
          {adminTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Tab
                key={tab.id}
                value={tab.id}
                icon={<Icon size={16} />}
                iconPosition="start"
                label={tab.label}
              />
            );
          })}
        </Tabs>
      </Box>
    </Box>
  );
}
