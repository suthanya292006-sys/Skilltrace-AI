import {
  Card,
  CardContent,
  Box,
  Typography,
  Stack,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  FiSearch,
  FiFileText,
  FiEye,
  FiDownload,
  FiTrash2,
  FiPlusCircle,
  FiFilter,
} from 'react-icons/fi';
import { tokens } from '../../styles/theme';

export default function ReportHistory({
  historyItems = [],
  search = '',
  onSearchChange,
  typeFilter = 'All',
  onTypeFilterChange,
  statusFilter = 'All',
  onStatusFilterChange,
  onViewHistoryItem,
  onDownloadHistoryItem,
  onDeleteHistoryItem,
  onOpenGenerateModal,
}) {
  return (
    <Card sx={{ borderRadius: 3, borderColor: tokens.line }}>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        {/* Header & Controls Bar */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'stretch', md: 'center' }}
          justifyContent="space-between"
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 18, color: tokens.ink }}>
              Report Audit Trail & History
            </Typography>
            <Typography variant="body2" sx={{ color: tokens.slate, fontSize: 13 }}>
              View, search, download, or manage previously generated AI career intelligence reports.
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            startIcon={<FiPlusCircle size={18} />}
            onClick={onOpenGenerateModal}
            sx={{ fontWeight: 700, py: 1.1, px: 2.2, borderRadius: 2, alignSelf: { xs: 'flex-start', md: 'auto' } }}
          >
            Generate New Report
          </Button>
        </Stack>

        {/* Filter Controls Row */}
        <GridFilterControls
          search={search}
          onSearchChange={onSearchChange}
          typeFilter={typeFilter}
          onTypeFilterChange={onTypeFilterChange}
          statusFilter={statusFilter}
          onStatusFilterChange={onStatusFilterChange}
        />

        {/* Table or Empty State */}
        {historyItems.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              py: 6,
              px: 2,
              bgcolor: 'background.default',
              borderRadius: 3,
              border: `1px dashed ${tokens.line}`,
              mt: 2,
            }}
          >
            <FiFileText size={42} color={tokens.slate} style={{ opacity: 0.5, marginBottom: 12 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: tokens.ink, mb: 0.5 }}>
              No Reports Match Your Search
            </Typography>
            <Typography variant="body2" sx={{ color: tokens.slate, maxWidth: 400, mx: 'auto', mb: 2 }}>
              Try adjusting your search keywords or filter settings to find historical reports.
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                onSearchChange('');
                onTypeFilterChange('All');
                onStatusFilterChange('All');
              }}
              sx={{ borderColor: tokens.line, color: tokens.ink }}
            >
              Reset Filters
            </Button>
          </Box>
        ) : (
          <TableContainer sx={{ border: `1px solid ${tokens.line}`, borderRadius: 2 }}>
            <Table size="medium">
              <TableHead sx={{ bgcolor: 'background.default' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, color: tokens.slate }}>Report Title</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: tokens.slate }}>Report Type</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: tokens.slate }}>Generated Date</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: tokens.slate }}>Score</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: tokens.slate }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: tokens.slate }} align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historyItems.map((item) => (
                  <TableRow key={item.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell sx={{ fontWeight: 600, color: tokens.ink, maxWidth: 300 }}>
                      <Stack direction="row" alignItems="center" spacing={1.2}>
                        <FiFileText size={18} color={tokens.teal} />
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                            {item.title}
                          </Typography>
                          <Typography variant="caption" sx={{ color: tokens.slate, fontSize: 11 }}>
                            {item.size || '2.4 MB'}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={item.typeName}
                        size="small"
                        sx={{
                          bgcolor: 'background.default',
                          border: `1px solid ${tokens.line}`,
                          fontSize: 11,
                          fontWeight: 600,
                        }}
                      />
                    </TableCell>

                    <TableCell sx={{ color: tokens.slate, fontSize: 13 }}>
                      {item.formattedDate}
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={`${item.score}${item.type === 'placement-prediction' || item.type === 'career-recommendation' ? '%' : '/100'}`}
                        size="small"
                        color={item.score >= 90 ? 'primary' : 'warning'}
                        sx={{ fontWeight: 700, fontSize: 11 }}
                      />
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={item.status}
                        size="small"
                        variant={item.status === 'Completed' ? 'filled' : 'outlined'}
                        color={item.status === 'Completed' ? 'success' : 'default'}
                        sx={{ height: 22, fontSize: 10, fontWeight: 700 }}
                      />
                    </TableCell>

                    <TableCell align="right">
                      <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={0.5}>
                        <Tooltip title="View Report Details">
                          <IconButton size="small" onClick={() => onViewHistoryItem(item)}>
                            <FiEye size={16} color={tokens.teal} />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Download PDF">
                          <IconButton size="small" onClick={() => onDownloadHistoryItem(item)}>
                            <FiDownload size={16} color={tokens.ink} />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete Report">
                          <IconButton size="small" onClick={() => onDeleteHistoryItem(item.id)}>
                            <FiTrash2 size={16} color={tokens.danger} />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
}

function GridFilterControls({
  search,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  statusFilter,
  onStatusFilterChange,
}) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      alignItems="center"
      spacing={2}
      sx={{ mb: 2.5 }}
    >
      <TextField
        fullWidth
        size="small"
        placeholder="Search history by title, type, date, or score…"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FiSearch size={16} color={tokens.slate} />
            </InputAdornment>
          ),
        }}
        sx={{ flex: 2 }}
      />

      <FormControl size="small" sx={{ minWidth: 160, flex: 1 }}>
        <InputLabel id="history-type-label">Report Type</InputLabel>
        <Select
          labelId="history-type-label"
          value={typeFilter}
          label="Report Type"
          onChange={(e) => onTypeFilterChange(e.target.value)}
        >
          <MenuItem value="All">All Types</MenuItem>
          <MenuItem value="portfolio-analysis">Portfolio Analysis</MenuItem>
          <MenuItem value="skill-assessment">Skill Assessment</MenuItem>
          <MenuItem value="career-recommendation">Career Recommendation</MenuItem>
          <MenuItem value="placement-prediction">Placement Prediction</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 140, flex: 1 }}>
        <InputLabel id="history-status-label">Status</InputLabel>
        <Select
          labelId="history-status-label"
          value={statusFilter}
          label="Status"
          onChange={(e) => onStatusFilterChange(e.target.value)}
        >
          <MenuItem value="All">All Statuses</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Archived">Archived</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}
