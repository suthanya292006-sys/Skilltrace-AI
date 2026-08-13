import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';

export default function DashboardLayout() {
  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
      <Sidebar />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <DashboardHeader />
        <Box sx={{ px: { xs: 2, md: 4 }, py: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
