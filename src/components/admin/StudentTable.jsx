import { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Button,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  LinearProgress,
  Pagination,
  Link,
  Divider,
} from '@mui/material';
import {
  FiSearch,
  FiEye,
  FiUserCheck,
  FiUserX,
  FiCheckCircle,
  FiClock,
  FiGlobe,
  FiAward,
  FiBookOpen,
  FiRefreshCw,
  FiFilter,
  FiArrowUpRight,
  FiAlertTriangle,
} from 'react-icons/fi';
import { tokens } from '../../styles/theme';

export default function StudentTable({ students = [], onToggleStatus }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [portfolioFilter, setPortfolioFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('readinessScore');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Selected student for Profile Modal
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Status Action Confirmation Dialog
  const [confirmStudent, setConfirmStudent] = useState(null);
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  // Filter students logic
  const filteredStudents = students.filter((s) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      s.name.toLowerCase().includes(searchLower) ||
      s.email.toLowerCase().includes(searchLower) ||
      s.id.toLowerCase().includes(searchLower);
    const matchesDept = deptFilter === 'ALL' || s.department === deptFilter;
    const matchesStatus = statusFilter === 'ALL' || s.status === statusFilter;
    const matchesPortfolio = portfolioFilter === 'ALL' || s.portfolioStatus === portfolioFilter;
    return matchesSearch && matchesDept && matchesStatus && matchesPortfolio;
  });

  // Sort logic
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortBy === 'cgpa') return b.cgpa - a.cgpa;
    if (sortBy === 'placementProbability') return b.placementProbability - a.placementProbability;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return b.readinessScore - a.readinessScore;
  });

  const totalPages = Math.ceil(sortedStudents.length / rowsPerPage) || 1;
  const paginatedStudents = sortedStudents.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleResetFilters = () => {
    setSearchTerm('');
    setDeptFilter('ALL');
    setStatusFilter('ALL');
    setPortfolioFilter('ALL');
    setSortBy('readinessScore');
    setPage(1);
  };

  const handleOpenProfile = (student) => {
    setSelectedStudent(student);
    setProfileModalOpen(true);
  };

  const handleOpenStatusConfirm = (student) => {
    setConfirmStudent(student);
    setStatusModalOpen(true);
  };

  const handleConfirmStatusChange = () => {
    if (confirmStudent) {
      onToggleStatus(confirmStudent.id);
    }
    setStatusModalOpen(false);
    setConfirmStudent(null);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 3.5 },
        borderRadius: 4,
        border: `1px solid ${tokens.line}`,
        bgcolor: '#ffffff',
      }}
    >
      {/* Header Bar */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'stretch', md: 'center' }}
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: tokens.ink, fontSize: 19 }}>
              Student Management Roster
            </Typography>
            <Chip
              label={`${filteredStudents.length} Students`}
              size="small"
              sx={{
                bgcolor: 'rgba(15,157,140,0.1)',
                color: tokens.tealDark,
                fontWeight: 700,
                fontSize: 11,
              }}
            />
          </Stack>
          <Typography variant="caption" sx={{ color: tokens.slate, mt: 0.3, display: 'block' }}>
            Filter cohort by academic major, readiness index, portfolio analysis state, and manage account statuses
          </Typography>
        </Box>

        <Button
          variant="outlined"
          size="small"
          startIcon={<FiRefreshCw size={14} />}
          onClick={handleResetFilters}
          sx={{ borderColor: tokens.line, color: tokens.slate, textTransform: 'none', borderRadius: 2 }}
        >
          Reset Filters
        </Button>
      </Stack>

      {/* Filter Controls Row */}
      <Grid container spacing={1.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            placeholder="Search student by name, ID or email..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FiSearch size={16} color={tokens.slate} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={6} sm={3} md={2}>
          <FormControl size="small" fullWidth>
            <InputLabel>Department</InputLabel>
            <Select
              value={deptFilter}
              onChange={(e) => {
                setDeptFilter(e.target.value);
                setPage(1);
              }}
              label="Department"
            >
              <MenuItem value="ALL">All Depts</MenuItem>
              <MenuItem value="CSE">CSE</MenuItem>
              <MenuItem value="ECE">ECE</MenuItem>
              <MenuItem value="IT">IT</MenuItem>
              <MenuItem value="EEE">EEE</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={3} md={2}>
          <FormControl size="small" fullWidth>
            <InputLabel>Account Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              label="Account Status"
            >
              <MenuItem value="ALL">All Statuses</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
              <MenuItem value="Suspended">Suspended</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={3} md={2}>
          <FormControl size="small" fullWidth>
            <InputLabel>Portfolio</InputLabel>
            <Select
              value={portfolioFilter}
              onChange={(e) => {
                setPortfolioFilter(e.target.value);
                setPage(1);
              }}
              label="Portfolio"
            >
              <MenuItem value="ALL">All Portfolios</MenuItem>
              <MenuItem value="Analyzed">Analyzed</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={3} md={2}>
          <FormControl size="small" fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              label="Sort By"
            >
              <MenuItem value="readinessScore">Skill Score ↓</MenuItem>
              <MenuItem value="cgpa">CGPA ↓</MenuItem>
              <MenuItem value="placementProbability">Placement % ↓</MenuItem>
              <MenuItem value="name">Name (A-Z)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Table Content */}
      <TableContainer sx={{ border: `1px solid ${tokens.line}`, borderRadius: 3 }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead sx={{ bgcolor: 'background.default' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: tokens.ink }}>Student Details</TableCell>
              <TableCell sx={{ fontWeight: 700, color: tokens.ink }}>ID & Department</TableCell>
              <TableCell sx={{ fontWeight: 700, color: tokens.ink }}>Academic CGPA</TableCell>
              <TableCell sx={{ fontWeight: 700, color: tokens.ink }}>Skill Index</TableCell>
              <TableCell sx={{ fontWeight: 700, color: tokens.ink }}>Placement Odds</TableCell>
              <TableCell sx={{ fontWeight: 700, color: tokens.ink }}>Portfolio Status</TableCell>
              <TableCell sx={{ fontWeight: 700, color: tokens.ink }}>Account Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, color: tokens.ink }}>
                Manage
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 6 }}>
                  <Box sx={{ maxWidth: 360, mx: 'auto', textAlign: 'center' }}>
                    <FiFilter size={32} color={tokens.slate} style={{ marginBottom: 8 }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: tokens.ink }}>
                      No Students Found
                    </Typography>
                    <Typography variant="caption" sx={{ color: tokens.slate, display: 'block', mb: 2 }}>
                      No student records matched your search query or active filter settings.
                    </Typography>
                    <Button variant="contained" size="small" onClick={handleResetFilters} sx={{ bgcolor: tokens.teal }}>
                      Clear All Filters
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              paginatedStudents.map((s) => (
                <TableRow key={s.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <Avatar sx={{ width: 36, height: 36, bgcolor: tokens.teal, fontSize: 13, fontWeight: 800 }}>
                        {s.name
                          .split(' ')
                          .map((w) => w[0])
                          .join('')}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: tokens.ink, lineHeight: 1.2 }}>
                          {s.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: tokens.slate }}>
                          {s.email}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace', fontSize: 12.5 }}>
                      {s.id}
                    </Typography>
                    <Chip label={s.department} size="small" variant="outlined" sx={{ height: 18, fontSize: 10, mt: 0.3 }} />
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: tokens.ink }}>
                      {s.cgpa} <Typography component="span" variant="caption" sx={{ color: tokens.slate }}>/ 10</Typography>
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ width: 130 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 0.3 }}>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: tokens.tealDark }}>
                        {s.readinessScore}/100
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={s.readinessScore}
                      sx={{ height: 6, borderRadius: 3, bgcolor: tokens.line, '& .MuiLinearProgress-bar': { bgcolor: tokens.teal } }}
                    />
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={`${s.placementProbability}% Match`}
                      size="small"
                      sx={{
                        bgcolor: s.placementProbability >= 85 ? 'rgba(15,157,140,0.12)' : 'rgba(245,166,35,0.12)',
                        color: s.placementProbability >= 85 ? tokens.tealDark : tokens.amber,
                        fontWeight: 800,
                        fontSize: 11,
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={s.portfolioStatus || 'Analyzed'}
                      size="small"
                      variant="outlined"
                      sx={{
                        height: 22,
                        fontSize: 11,
                        fontWeight: 600,
                        borderColor: s.portfolioStatus === 'Analyzed' ? tokens.teal : tokens.line,
                        color: s.portfolioStatus === 'Analyzed' ? tokens.tealDark : tokens.slate,
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={s.status}
                      size="small"
                      color={
                        s.status === 'Active'
                          ? 'success'
                          : s.status === 'Inactive'
                          ? 'default'
                          : 'error'
                      }
                      sx={{ fontWeight: 800, height: 22, fontSize: 11 }}
                    />
                  </TableCell>

                  <TableCell align="right">
                    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                      <Tooltip title="View Profile Matrix">
                        <IconButton size="small" onClick={() => handleOpenProfile(s)} sx={{ bgcolor: 'rgba(15,157,140,0.08)' }}>
                          <FiEye size={16} color={tokens.teal} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title={s.status === 'Active' ? 'Deactivate Account' : 'Activate Account'}>
                        <IconButton
                          size="small"
                          onClick={() => handleOpenStatusConfirm(s)}
                          sx={{ bgcolor: s.status === 'Active' ? 'rgba(231,111,81,0.08)' : 'rgba(15,157,140,0.08)' }}
                        >
                          {s.status === 'Active' ? (
                            <FiUserX size={16} color={tokens.danger} />
                          ) : (
                            <FiUserCheck size={16} color={tokens.teal} />
                          )}
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Footer */}
      {sortedStudents.length > 0 && (
        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" spacing={2} sx={{ mt: 3, pt: 2, borderTop: `1px solid ${tokens.line}` }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="caption" sx={{ color: tokens.slate }}>
              Showing {Math.min((page - 1) * rowsPerPage + 1, sortedStudents.length)} to{' '}
              {Math.min(page * rowsPerPage, sortedStudents.length)} of {sortedStudents.length} records
            </Typography>
            <FormControl size="small" sx={{ minWidth: 70, ml: 1 }}>
              <Select value={rowsPerPage} onChange={(e) => { setRowsPerPage(Number(e.target.value)); setPage(1); }}>
                <MenuItem value={5}>5 / pg</MenuItem>
                <MenuItem value={10}>10 / pg</MenuItem>
                <MenuItem value={20}>20 / pg</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, p) => setPage(p)}
            color="primary"
            size="small"
          />
        </Stack>
      )}

      {/* MODAL 1: View Detailed Student Profile Matrix */}
      <Dialog open={profileModalOpen} onClose={() => setProfileModalOpen(false)} maxWidth="md" fullWidth>
        {selectedStudent && (
          <Box sx={{ p: 1 }}>
            <DialogTitle sx={{ fontWeight: 800, pb: 1 }}>
              Student Intelligence Matrix — {selectedStudent.name}
            </DialogTitle>
            <DialogContent dividers>
              <Stack spacing={3}>
                {/* Header Info */}
                <Stack direction="row" alignItems="center" spacing={2.5}>
                  <Avatar sx={{ width: 64, height: 64, bgcolor: tokens.teal, fontSize: 22, fontWeight: 800 }}>
                    {selectedStudent.name
                      .split(' ')
                      .map((w) => w[0])
                      .join('')}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: tokens.ink }}>
                        {selectedStudent.name}
                      </Typography>
                      <Chip
                        label={selectedStudent.status}
                        size="small"
                        color={selectedStudent.status === 'Active' ? 'success' : 'default'}
                        sx={{ fontWeight: 800, height: 20, fontSize: 10 }}
                      />
                    </Stack>
                    <Typography variant="body2" sx={{ color: tokens.slate }}>
                      {selectedStudent.email}
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" gap={0.5} sx={{ mt: 1 }}>
                      <Chip label={`ID: ${selectedStudent.id}`} size="small" variant="outlined" sx={{ height: 20, fontSize: 11 }} />
                      <Chip label={`Dept: ${selectedStudent.department}`} size="small" color="primary" sx={{ height: 20, fontSize: 11 }} />
                      <Chip label={`Enrolled: ${selectedStudent.joinedDate}`} size="small" variant="outlined" sx={{ height: 20, fontSize: 11 }} />
                    </Stack>
                  </Box>
                </Stack>

                <Divider />

                {/* Performance Metrics Cards */}
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', border: `1px solid ${tokens.line}`, bgcolor: 'background.default', borderRadius: 2.5 }}>
                      <Typography variant="caption" sx={{ color: tokens.slate, display: 'block' }}>Academic CGPA</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 800, color: tokens.ink, mt: 0.5 }}>{selectedStudent.cgpa}</Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', border: `1px solid ${tokens.line}`, bgcolor: 'background.default', borderRadius: 2.5 }}>
                      <Typography variant="caption" sx={{ color: tokens.slate, display: 'block' }}>Skill Index</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 800, color: tokens.tealDark, mt: 0.5 }}>{selectedStudent.readinessScore}/100</Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', border: `1px solid ${tokens.line}`, bgcolor: 'background.default', borderRadius: 2.5 }}>
                      <Typography variant="caption" sx={{ color: tokens.slate, display: 'block' }}>Placement Odds</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 800, color: tokens.amber, mt: 0.5 }}>{selectedStudent.placementProbability}%</Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', border: `1px solid ${tokens.line}`, bgcolor: 'background.default', borderRadius: 2.5 }}>
                      <Typography variant="caption" sx={{ color: tokens.slate, display: 'block' }}>Tests Completed</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 800, color: tokens.ink, mt: 0.5 }}>{selectedStudent.completedTestsCount || 4}</Typography>
                    </Paper>
                  </Grid>
                </Grid>

                {/* Portfolio & Career Target */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Paper sx={{ p: 2, border: `1px solid ${tokens.line}`, borderRadius: 2.5 }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: tokens.slate, display: 'block', mb: 1 }}>
                        PORTFOLIO ANALYSIS STATUS
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <FiCheckCircle size={18} color={tokens.teal} />
                        <Typography variant="body2" sx={{ fontWeight: 700, color: tokens.ink }}>
                          State: {selectedStudent.portfolioStatus || 'Analyzed'}
                        </Typography>
                      </Stack>
                      {selectedStudent.githubUrl && (
                        <Link href={selectedStudent.githubUrl} target="_blank" rel="noreferrer" underline="hover" sx={{ fontSize: 12, mt: 1, display: 'inline-flex', alignItems: 'center', gap: 0.5, color: tokens.teal }}>
                          <FiGlobe size={12} /> View GitHub Repository <FiArrowUpRight size={12} />
                        </Link>
                      )}
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Paper sx={{ p: 2, border: `1px solid ${tokens.line}`, borderRadius: 2.5 }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: tokens.slate, display: 'block', mb: 1 }}>
                        TOP RECOMMENDED CAREER PATH
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <FiAward size={18} color={tokens.amber} />
                        <Typography variant="body2" sx={{ fontWeight: 700, color: tokens.ink }}>
                          {selectedStudent.topCareerMatch || 'Full-Stack Software Engineer'}
                        </Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                </Grid>

                {/* Assessed Skills */}
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: tokens.ink, mb: 1 }}>
                    Verified Technical Skills & Stack
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" gap={0.8}>
                    {selectedStudent.assessedSkills?.map((skill) => (
                      <Chip key={skill} label={skill} size="small" sx={{ bgcolor: 'rgba(15,157,140,0.1)', color: tokens.tealDark, fontWeight: 700 }} />
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 2.5 }}>
              <Button variant="contained" onClick={() => setProfileModalOpen(false)} sx={{ bgcolor: tokens.teal }}>
                Close Profile Matrix
              </Button>
            </DialogActions>
          </Box>
        )}
      </Dialog>

      {/* MODAL 2: Confirm Account Status Activation / Deactivation */}
      <Dialog open={statusModalOpen} onClose={() => setStatusModalOpen(false)}>
        {confirmStudent && (
          <Box sx={{ p: 1 }}>
            <DialogTitle sx={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: 1 }}>
              <FiAlertTriangle color={confirmStudent.status === 'Active' ? tokens.danger : tokens.teal} />
              {confirmStudent.status === 'Active' ? 'Deactivate' : 'Activate'} Student Account?
            </DialogTitle>
            <DialogContent>
              <Typography variant="body2" sx={{ color: tokens.slate, mt: 1 }}>
                Are you sure you want to change the access status of <strong>{confirmStudent.name}</strong> ({confirmStudent.id}) to{' '}
                <strong style={{ color: confirmStudent.status === 'Active' ? tokens.danger : tokens.teal }}>
                  {confirmStudent.status === 'Active' ? 'Inactive' : 'Active'}
                </strong>?
              </Typography>
              <Typography variant="caption" sx={{ color: tokens.slate, display: 'block', mt: 1.5, bgcolor: 'background.default', p: 1.5, borderRadius: 2 }}>
                {confirmStudent.status === 'Active'
                  ? 'Deactivating will prevent this student from taking new assessments and submitting portfolio updates until reactivated.'
                  : 'Activating will restore full platform access for this student account.'}
              </Typography>
            </DialogContent>
            <DialogActions sx={{ p: 2.5 }}>
              <Button onClick={() => setStatusModalOpen(false)}>Cancel</Button>
              <Button
                variant="contained"
                color={confirmStudent.status === 'Active' ? 'error' : 'success'}
                onClick={handleConfirmStatusChange}
                sx={{ fontWeight: 700 }}
              >
                Confirm {confirmStudent.status === 'Active' ? 'Deactivation' : 'Activation'}
              </Button>
            </DialogActions>
          </Box>
        )}
      </Dialog>
    </Paper>
  );
}
