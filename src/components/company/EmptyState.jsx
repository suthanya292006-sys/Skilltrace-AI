import { Box, Typography, Paper, Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { FiSearch, FiRotateCcw } from 'react-icons/fi';
import { tokens } from '../../styles/theme';

export default function EmptyState({ onReset, search, typeFilter, savedOnly }) {
  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      elevation={0}
      sx={{
        borderRadius: 4,
        p: { xs: 4, md: 6 },
        textAlign: 'center',
        bgcolor: 'background.paper',
        border: `1px dashed ${tokens.line}`,
        my: 4,
      }}
    >
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          bgcolor: 'rgba(15, 157, 140, 0.1)',
          color: tokens.teal,
          display: 'grid',
          placeItems: 'center',
          mx: 'auto',
          mb: 2,
        }}
      >
        <FiSearch size={30} />
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 700, color: tokens.ink, mb: 0.8 }}>
        No Companies Found
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 450, mx: 'auto', mb: 3 }}>
        {savedOnly
          ? 'You have not saved any companies yet. Click the bookmark icon on any company card to save it to your shortlist.'
          : search
          ? `No companies matched your query "${search}". Try searching for popular skills like React, Python, or role titles.`
          : `No companies found for category "${typeFilter}". Try clearing your filters to explore all options.`}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        startIcon={<FiRotateCcw size={16} />}
        onClick={onReset}
        sx={{
          borderRadius: 2.5,
          px: 3,
          py: 1,
          fontWeight: 700,
          bgcolor: tokens.teal,
          '&:hover': { bgcolor: tokens.tealDark },
        }}
      >
        Reset Filters & Search
      </Button>
    </Paper>
  );
}
