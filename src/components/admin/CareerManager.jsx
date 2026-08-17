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
} from '@mui/material';
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiTrendingUp,
  FiDollarSign,
  FiCompass,
  FiLayers,
  FiSearch,
} from 'react-icons/fi';
import { tokens } from '../../styles/theme';

export default function CareerManager({
  careers = [],
  onSaveCareer,
  onDeleteCareer,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [demandFilter, setDemandFilter] = useState('ALL');

  const [careerModalOpen, setCareerModalOpen] = useState(false);
  const [editingCareer, setEditingCareer] = useState(null);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [careerForm, setCareerForm] = useState({
    id: '',
    title: '',
    category: 'Software Engineering',
    avgSalaryLpa: 18.0,
    growthRate: '+25% YoY',
    demandLevel: 'High',
    description: '',
    requiredSkills: 'React, Node.js, System Design, SQL',
  });

  const filteredCareers = careers.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDemand = demandFilter === 'ALL' || c.demandLevel === demandFilter;
    return matchesSearch && matchesDemand;
  });

  const handleOpenAddCareer = () => {
    setEditingCareer(null);
    setCareerForm({
      id: '',
      title: '',
      category: 'Software Engineering',
      avgSalaryLpa: 18.0,
      growthRate: '+25% YoY',
      demandLevel: 'High',
      description: '',
      requiredSkills: 'React, Node.js, System Design, SQL',
    });
    setCareerModalOpen(true);
  };

  const handleOpenEditCareer = (car) => {
    setEditingCareer(car);
    setCareerForm({
      id: car.id,
      title: car.title,
      category: car.category,
      avgSalaryLpa: car.avgSalaryLpa,
      growthRate: car.growthRate,
      demandLevel: car.demandLevel,
      description: car.description,
      requiredSkills: Array.isArray(car.requiredSkills) ? car.requiredSkills.join(', ') : car.requiredSkills,
    });
    setCareerModalOpen(true);
  };

  const handleSaveCareerSubmit = (e) => {
    e.preventDefault();
    const skillsArray = typeof careerForm.requiredSkills === 'string'
      ? careerForm.requiredSkills.split(',').map((s) => s.trim()).filter(Boolean)
      : careerForm.requiredSkills;

    onSaveCareer({
      ...careerForm,
      requiredSkills: skillsArray,
      avgSalaryLpa: Number(careerForm.avgSalaryLpa),
    });
    setCareerModalOpen(false);
  };

  const handleOpenDeleteConfirm = (id) => {
    setDeleteId(id);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      onDeleteCareer(deleteId);
    }
    setDeleteConfirmOpen(false);
    setDeleteId(null);
  };

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: tokens.ink, fontSize: 19 }}>
              Career Paths & Skill Matrix
            </Typography>
            <Chip
              label={`${filteredCareers.length} Paths`}
              size="small"
              sx={{ bgcolor: 'rgba(15,157,140,0.1)', color: tokens.tealDark, fontWeight: 700, fontSize: 11 }}
            />
          </Stack>
          <Typography variant="caption" sx={{ color: tokens.slate, mt: 0.3, display: 'block' }}>
            Configure target job roles, required skill weights, market demand statistics, and compensation packages
          </Typography>
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          <TextField
            placeholder="Search career path..."
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

          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Demand Level</InputLabel>
            <Select value={demandFilter} onChange={(e) => setDemandFilter(e.target.value)} label="Demand Level">
              <MenuItem value="ALL">All Demands</MenuItem>
              <MenuItem value="Very High">Very High</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium-High">Medium-High</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            startIcon={<FiPlus size={16} />}
            onClick={handleOpenAddCareer}
            sx={{ bgcolor: tokens.teal, '&:hover': { bgcolor: tokens.tealDark }, borderRadius: 2.5, fontWeight: 700 }}
          >
            Add Career Path
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {filteredCareers.map((car) => (
          <Grid item xs={12} md={6} key={car.id}>
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
              }}
            >
              <Box>
                <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ mb: 1.5 }}>
                  <Box sx={{ pr: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                      <Chip
                        label={car.category}
                        size="small"
                        sx={{ bgcolor: 'rgba(15,157,140,0.12)', color: tokens.tealDark, fontWeight: 800, fontSize: 10.5, height: 20 }}
                      />
                      <Chip
                        label={car.demandLevel}
                        size="small"
                        color="secondary"
                        sx={{ height: 20, fontSize: 10.5, fontWeight: 800 }}
                      />
                    </Stack>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: tokens.ink, fontSize: 18 }}>
                      {car.title}
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={0.5}>
                    <Tooltip title="Edit Path">
                      <IconButton size="small" onClick={() => handleOpenEditCareer(car)}>
                        <FiEdit size={16} color={tokens.teal} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Remove Path">
                      <IconButton size="small" onClick={() => handleOpenDeleteConfirm(car.id)}>
                        <FiTrash2 size={16} color={tokens.danger} />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Stack>

                <Typography variant="body2" sx={{ color: tokens.slate, fontSize: 13, mb: 2, lineHeight: 1.5 }}>
                  {car.description}
                </Typography>

                <Grid container spacing={1.5} sx={{ mb: 2, p: 2, bgcolor: 'background.default', borderRadius: 2.5, border: `1px solid ${tokens.line}` }}>
                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: tokens.slate, display: 'block' }}>Avg Industry CTC</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 800, color: tokens.amber }}>₹{car.avgSalaryLpa} LPA</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: tokens.slate, display: 'block' }}>Market Growth</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 800, color: tokens.tealDark }}>{car.growthRate}</Typography>
                  </Grid>
                </Grid>

                <Typography variant="caption" sx={{ fontWeight: 700, color: tokens.slate, display: 'block', mb: 1 }}>
                  Required Skill Competencies
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={0.8}>
                  {car.requiredSkills?.map((skill) => (
                    <Chip key={skill} label={skill} size="small" variant="outlined" sx={{ height: 22, fontSize: 11, borderColor: tokens.line }} />
                  ))}
                </Stack>
              </Box>

              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 3, pt: 1.5, borderTop: `1px solid ${tokens.line}` }}>
                <Typography variant="caption" sx={{ color: tokens.slate }}>
                  Mapped Path Code
                </Typography>
                <Chip label={`ID: ${car.id}`} size="small" variant="outlined" sx={{ height: 20, fontSize: 10, fontFamily: '"IBM Plex Mono", monospace' }} />
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* DIALOG 1: Add / Edit Career */}
      <Dialog open={careerModalOpen} onClose={() => setCareerModalOpen(false)} maxWidth="sm" fullWidth>
        <Box component="form" onSubmit={handleSaveCareerSubmit}>
          <DialogTitle sx={{ fontWeight: 800 }}>
            {editingCareer ? 'Edit Career Path' : 'Create New Career Track'}
          </DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2.5}>
              <TextField
                label="Career Path Title"
                value={careerForm.title}
                onChange={(e) => setCareerForm((p) => ({ ...p, title: e.target.value }))}
                fullWidth
                size="small"
                required
              />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Domain Category"
                    value={careerForm.category}
                    onChange={(e) => setCareerForm((p) => ({ ...p, category: e.target.value }))}
                    fullWidth
                    size="small"
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Demand Level</InputLabel>
                    <Select
                      value={careerForm.demandLevel}
                      onChange={(e) => setCareerForm((p) => ({ ...p, demandLevel: e.target.value }))}
                      label="Demand Level"
                    >
                      <MenuItem value="Very High">Very High</MenuItem>
                      <MenuItem value="High">High</MenuItem>
                      <MenuItem value="Medium-High">Medium-High</MenuItem>
                      <MenuItem value="Moderate">Moderate</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Avg Industry CTC (LPA)"
                    type="number"
                    inputProps={{ step: '0.5', min: '0' }}
                    value={careerForm.avgSalaryLpa}
                    onChange={(e) => setCareerForm((p) => ({ ...p, avgSalaryLpa: e.target.value }))}
                    fullWidth
                    size="small"
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Growth Rate (e.g. +25% YoY)"
                    value={careerForm.growthRate}
                    onChange={(e) => setCareerForm((p) => ({ ...p, growthRate: e.target.value }))}
                    fullWidth
                    size="small"
                    required
                  />
                </Grid>
              </Grid>

              <TextField
                label="Required Skill Competencies (Comma separated)"
                value={careerForm.requiredSkills}
                onChange={(e) => setCareerForm((p) => ({ ...p, requiredSkills: e.target.value }))}
                fullWidth
                size="small"
                required
              />

              <TextField
                label="Role Overview & Description"
                value={careerForm.description}
                onChange={(e) => setCareerForm((p) => ({ ...p, description: e.target.value }))}
                fullWidth
                multiline
                rows={3}
                size="small"
                required
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={() => setCareerModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: tokens.teal, fontWeight: 700 }}>
              Save Career Path
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* DIALOG 2: Delete Confirm */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle sx={{ fontWeight: 800 }}>Remove Career Path?</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: tokens.slate }}>
            Are you sure you want to remove this career path from student AI recommendation logic?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleConfirmDelete} sx={{ fontWeight: 700 }}>
            Remove Path
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
