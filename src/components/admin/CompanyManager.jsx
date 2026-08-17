import { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Button,
  Grid,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
  InputAdornment,
  Divider,
} from '@mui/material';
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiBriefcase,
  FiDollarSign,
  FiCheckCircle,
  FiSearch,
  FiLayers,
  FiEye,
  FiUsers,
  FiAward,
} from 'react-icons/fi';
import { tokens } from '../../styles/theme';

export default function CompanyManager({
  companies = [],
  onSaveCompany,
  onDeleteCompany,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modals
  const [companyModalOpen, setCompanyModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);

  // View Modal
  const [viewCompanyModalOpen, setViewCompanyModalOpen] = useState(false);
  const [viewingCompany, setViewingCompany] = useState(null);

  // Delete modal
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [companyForm, setCompanyForm] = useState({
    id: '',
    name: '',
    industry: '',
    companyType: 'Product',
    minCgpa: 7.5,
    packageLpa: 15.0,
    requiredSkills: '',
    status: 'Hiring Active',
  });

  const filteredCompanies = companies.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'ALL' || c.companyType === typeFilter;
    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleOpenAddCompany = () => {
    setEditingCompany(null);
    setCompanyForm({
      id: '',
      name: '',
      industry: '',
      companyType: 'Product',
      minCgpa: 7.5,
      packageLpa: 15.0,
      requiredSkills: 'React, Node.js, SQL, System Design',
      status: 'Hiring Active',
    });
    setCompanyModalOpen(true);
  };

  const handleOpenEditCompany = (comp) => {
    setEditingCompany(comp);
    setCompanyForm({
      id: comp.id,
      name: comp.name,
      industry: comp.industry,
      companyType: comp.companyType,
      minCgpa: comp.minCgpa,
      packageLpa: comp.packageLpa,
      requiredSkills: Array.isArray(comp.requiredSkills) ? comp.requiredSkills.join(', ') : comp.requiredSkills,
      status: comp.status,
    });
    setCompanyModalOpen(true);
  };

  const handleOpenViewCompany = (comp) => {
    setViewingCompany(comp);
    setViewCompanyModalOpen(true);
  };

  const handleSaveCompanySubmit = (e) => {
    e.preventDefault();
    const skillsArray = typeof companyForm.requiredSkills === 'string'
      ? companyForm.requiredSkills.split(',').map((s) => s.trim()).filter(Boolean)
      : companyForm.requiredSkills;

    onSaveCompany({
      ...companyForm,
      requiredSkills: skillsArray,
      minCgpa: Number(companyForm.minCgpa),
      packageLpa: Number(companyForm.packageLpa),
    });
    setCompanyModalOpen(false);
  };

  const handleOpenDeleteConfirm = (id) => {
    setDeleteId(id);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      onDeleteCompany(deleteId);
    }
    setDeleteConfirmOpen(false);
    setDeleteId(null);
  };

  return (
    <Box>
      {/* Header & Filter Controls */}
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
              Hiring Companies & Recruitment Drives
            </Typography>
            <Chip
              label={`${filteredCompanies.length} Partners`}
              size="small"
              sx={{ bgcolor: 'rgba(15,157,140,0.1)', color: tokens.tealDark, fontWeight: 700, fontSize: 11 }}
            />
          </Stack>
          <Typography variant="caption" sx={{ color: tokens.slate, mt: 0.3, display: 'block' }}>
            Manage campus hiring partners, eligibility criteria (CGPA), offered packages, and skill requirements
          </Typography>
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          <TextField
            placeholder="Search company or sector..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            sx={{ minWidth: 200 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FiSearch size={16} color={tokens.slate} />
                </InputAdornment>
              ),
            }}
          />

          <FormControl size="small" sx={{ minWidth: 130 }}>
            <InputLabel>Company Type</InputLabel>
            <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} label="Company Type">
              <MenuItem value="ALL">All Types</MenuItem>
              <MenuItem value="MNC">MNC</MenuItem>
              <MenuItem value="Product">Product</MenuItem>
              <MenuItem value="Startup">Startup</MenuItem>
              <MenuItem value="Service">Service</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 130 }}>
            <InputLabel>Hiring Status</InputLabel>
            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} label="Hiring Status">
              <MenuItem value="ALL">All Statuses</MenuItem>
              <MenuItem value="Hiring Active">Hiring Active</MenuItem>
              <MenuItem value="Upcoming Drive">Upcoming Drive</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            startIcon={<FiPlus size={16} />}
            onClick={handleOpenAddCompany}
            sx={{ bgcolor: tokens.teal, '&:hover': { bgcolor: tokens.tealDark }, borderRadius: 2.5, fontWeight: 700 }}
          >
            Add Company
          </Button>
        </Stack>
      </Stack>

      {/* Grid of Companies */}
      {filteredCompanies.length === 0 ? (
        <Paper elevation={0} sx={{ p: 6, borderRadius: 3, border: `1px solid ${tokens.line}`, textAlign: 'center' }}>
          <FiBriefcase size={36} color={tokens.slate} style={{ marginBottom: 12 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: tokens.ink }}>
            No Hiring Partners Found
          </Typography>
          <Typography variant="body2" sx={{ color: tokens.slate, mt: 0.5, mb: 2 }}>
            Try adjusting search terms or resetting active filter selections.
          </Typography>
          <Button variant="contained" size="small" onClick={handleOpenAddCompany} sx={{ bgcolor: tokens.teal }}>
            Add New Hiring Company
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredCompanies.map((comp) => (
            <Grid item xs={12} md={6} key={comp.id}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3.5,
                  border: `1px solid ${tokens.line}`,
                  bgcolor: '#ffffff',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 24px rgba(15,23,42,0.06)',
                  },
                }}
              >
                <Box>
                  {/* Top Row: Name & Actions */}
                  <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ mb: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <Box
                        sx={{
                          width: 46,
                          height: 46,
                          borderRadius: 2.5,
                          bgcolor: 'rgba(15,157,140,0.12)',
                          color: tokens.tealDark,
                          display: 'grid',
                          placeItems: 'center',
                          fontWeight: 800,
                          fontSize: 20,
                        }}
                      >
                        {comp.name[0]}
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: tokens.ink, fontSize: 18 }}>
                          {comp.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: tokens.slate }}>
                          {comp.industry} · <strong>{comp.companyType}</strong>
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack direction="row" spacing={0.5}>
                      <Tooltip title="View Company Profile">
                        <IconButton size="small" onClick={() => handleOpenViewCompany(comp)}>
                          <FiEye size={16} color={tokens.teal} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Company Details">
                        <IconButton size="small" onClick={() => handleOpenEditCompany(comp)}>
                          <FiEdit size={16} color={tokens.teal} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Remove Company">
                        <IconButton size="small" onClick={() => handleOpenDeleteConfirm(comp.id)}>
                          <FiTrash2 size={16} color={tokens.danger} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Stack>

                  {/* Summary Metric Box */}
                  <Grid container spacing={1.5} sx={{ mb: 2, p: 2, bgcolor: 'background.default', borderRadius: 2.5, border: `1px solid ${tokens.line}` }}>
                    <Grid item xs={4}>
                      <Typography variant="caption" sx={{ color: tokens.slate, display: 'block' }}>Package CTC</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 800, color: tokens.amber }}>₹{comp.packageLpa} LPA</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="caption" sx={{ color: tokens.slate, display: 'block' }}>Min CGPA</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 800, color: tokens.ink }}>{comp.minCgpa} Cutoff</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="caption" sx={{ color: tokens.slate, display: 'block' }}>Status</Typography>
                      <Chip
                        label={comp.status}
                        size="small"
                        color={comp.status === 'Hiring Active' ? 'success' : comp.status === 'Upcoming Drive' ? 'warning' : 'default'}
                        sx={{ height: 20, fontSize: 10, fontWeight: 800 }}
                      />
                    </Grid>
                  </Grid>

                  {/* Skills tags */}
                  <Typography variant="caption" sx={{ fontWeight: 700, color: tokens.slate, display: 'block', mb: 1 }}>
                    Required Technical Competencies
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" gap={0.8}>
                    {comp.requiredSkills?.map((skill) => (
                      <Chip key={skill} label={skill} size="small" variant="outlined" sx={{ height: 22, fontSize: 11, borderColor: tokens.line, bgcolor: '#fff' }} />
                    ))}
                  </Stack>
                </Box>

                {/* Footer Bar */}
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 3, pt: 1.5, borderTop: `1px solid ${tokens.line}` }}>
                  <Typography variant="caption" sx={{ color: tokens.slate, fontWeight: 500 }}>
                    Applications: <strong style={{ color: tokens.ink }}>{comp.applicationsCount || 0}</strong> candidates
                  </Typography>
                  <Chip label={`ID: ${comp.id}`} size="small" variant="outlined" sx={{ height: 20, fontSize: 10, fontFamily: '"IBM Plex Mono", monospace' }} />
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* DIALOG 1: Add / Edit Company */}
      <Dialog open={companyModalOpen} onClose={() => setCompanyModalOpen(false)} maxWidth="sm" fullWidth>
        <Box component="form" onSubmit={handleSaveCompanySubmit}>
          <DialogTitle sx={{ fontWeight: 800 }}>
            {editingCompany ? 'Edit Hiring Partner Details' : 'Add New Hiring Partner'}
          </DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2.5}>
              <TextField
                label="Company Name"
                value={companyForm.name}
                onChange={(e) => setCompanyForm((p) => ({ ...p, name: e.target.value }))}
                fullWidth
                size="small"
                required
              />

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Industry Sector"
                    value={companyForm.industry}
                    onChange={(e) => setCompanyForm((p) => ({ ...p, industry: e.target.value }))}
                    fullWidth
                    size="small"
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Company Type</InputLabel>
                    <Select
                      value={companyForm.companyType}
                      onChange={(e) => setCompanyForm((p) => ({ ...p, companyType: e.target.value }))}
                      label="Company Type"
                    >
                      <MenuItem value="MNC">MNC</MenuItem>
                      <MenuItem value="Product">Product</MenuItem>
                      <MenuItem value="Startup">Startup</MenuItem>
                      <MenuItem value="Service">Service</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Min CGPA Cutoff"
                    type="number"
                    inputProps={{ step: '0.1', min: '0', max: '10' }}
                    value={companyForm.minCgpa}
                    onChange={(e) => setCompanyForm((p) => ({ ...p, minCgpa: e.target.value }))}
                    fullWidth
                    size="small"
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Annual CTC Package (LPA)"
                    type="number"
                    inputProps={{ step: '0.5', min: '0' }}
                    value={companyForm.packageLpa}
                    onChange={(e) => setCompanyForm((p) => ({ ...p, packageLpa: e.target.value }))}
                    fullWidth
                    size="small"
                    required
                  />
                </Grid>
              </Grid>

              <TextField
                label="Required Technical Skills (Comma separated)"
                value={companyForm.requiredSkills}
                onChange={(e) => setCompanyForm((p) => ({ ...p, requiredSkills: e.target.value }))}
                fullWidth
                size="small"
                helperText="e.g. React, Node.js, System Design, SQL"
                required
              />

              <FormControl fullWidth size="small">
                <InputLabel>Hiring Status</InputLabel>
                <Select
                  value={companyForm.status}
                  onChange={(e) => setCompanyForm((p) => ({ ...p, status: e.target.value }))}
                  label="Hiring Status"
                >
                  <MenuItem value="Hiring Active">Hiring Active</MenuItem>
                  <MenuItem value="Upcoming Drive">Upcoming Drive</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={() => setCompanyModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: tokens.teal, fontWeight: 700 }}>
              Save Company Partner
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* DIALOG 2: View Company Details Modal */}
      <Dialog open={viewCompanyModalOpen} onClose={() => setViewCompanyModalOpen(false)} maxWidth="sm" fullWidth>
        {viewingCompany && (
          <Box>
            <DialogTitle sx={{ fontWeight: 800 }}>
              Hiring Partner Profile — {viewingCompany.name}
            </DialogTitle>
            <DialogContent dividers>
              <Stack spacing={2.5}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: 3,
                      bgcolor: 'rgba(15,157,140,0.12)',
                      color: tokens.tealDark,
                      display: 'grid',
                      placeItems: 'center',
                      fontWeight: 800,
                      fontSize: 24,
                    }}
                  >
                    {viewingCompany.name[0]}
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: tokens.ink }}>
                      {viewingCompany.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: tokens.slate }}>
                      {viewingCompany.industry} · {viewingCompany.companyType}
                    </Typography>
                  </Box>
                </Stack>

                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'background.default', border: `1px solid ${tokens.line}` }}>
                      <Typography variant="caption" sx={{ color: tokens.slate, display: 'block' }}>Package CTC</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: tokens.amber }}>₹{viewingCompany.packageLpa} LPA</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={4}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'background.default', border: `1px solid ${tokens.line}` }}>
                      <Typography variant="caption" sx={{ color: tokens.slate, display: 'block' }}>CGPA Eligibility</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: tokens.ink }}>{viewingCompany.minCgpa} Cutoff</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={4}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'background.default', border: `1px solid ${tokens.line}` }}>
                      <Typography variant="caption" sx={{ color: tokens.slate, display: 'block' }}>Applicants</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: tokens.tealDark }}>{viewingCompany.applicationsCount || 0}</Typography>
                    </Paper>
                  </Grid>
                </Grid>

                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: tokens.ink, mb: 1 }}>
                    Required Technical Skills
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" gap={0.8}>
                    {viewingCompany.requiredSkills?.map((skill) => (
                      <Chip key={skill} label={skill} size="small" sx={{ bgcolor: 'rgba(15,157,140,0.1)', color: tokens.tealDark, fontWeight: 700 }} />
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 2.5 }}>
              <Button variant="contained" onClick={() => setViewCompanyModalOpen(false)} sx={{ bgcolor: tokens.teal }}>
                Close Partner View
              </Button>
            </DialogActions>
          </Box>
        )}
      </Dialog>

      {/* DIALOG 3: Delete Confirm */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle sx={{ fontWeight: 800 }}>Remove Hiring Partner?</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: tokens.slate }}>
            Are you sure you want to remove this company from campus placement drives?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleConfirmDelete} sx={{ fontWeight: 700 }}>
            Remove Company
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
