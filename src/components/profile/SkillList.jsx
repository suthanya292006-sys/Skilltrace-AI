import { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { FiSearch, FiPlus, FiX, FiCode } from 'react-icons/fi';
import { tokens } from '../../styles/theme';

export default function SkillList({ skills = [], onAddSkill, onRemoveSkill }) {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('Frontend');
  const [newSkillLevel, setNewSkillLevel] = useState('Intermediate');

  const filteredSkills = skills.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase())
  );

  // Group by category
  const categories = ['Frontend', 'Backend', 'Database', 'Cloud & DevOps', 'Core CS'];

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    onAddSkill({
      name: newSkillName.trim(),
      category: newSkillCategory,
      level: newSkillLevel,
    });
    setNewSkillName('');
    setModalOpen(false);
  };

  return (
    <Box>
      {/* Header Controls: Search & Add Skill */}
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" spacing={2} sx={{ mb: 3 }}>
        <TextField
          size="small"
          placeholder="Filter skills by name or domain..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FiSearch size={16} color={tokens.slate} />
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: 320, width: '100%' }}
        />

        <Button
          size="small"
          variant="contained"
          startIcon={<FiPlus size={16} />}
          onClick={() => setModalOpen(true)}
          sx={{ bgcolor: tokens.teal, '&:hover': { bgcolor: tokens.tealDark }, fontWeight: 700 }}
        >
          Add Technical Skill
        </Button>
      </Stack>

      {/* Skills Grouped by Category */}
      <Stack spacing={3}>
        {categories.map((cat) => {
          const catSkills = filteredSkills.filter((s) => s.category === cat);
          if (catSkills.length === 0 && search) return null;

          return (
            <Box key={cat}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: tokens.slate, textTransform: 'uppercase', letterSpacing: 0.5, mb: 1, display: 'block' }}>
                {cat} ({catSkills.length})
              </Typography>

              {catSkills.length === 0 ? (
                <Typography variant="body2" sx={{ color: tokens.slate, fontSize: 13, italic: true }}>
                  No skills listed in {cat} yet.
                </Typography>
              ) : (
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {catSkills.map((skill) => {
                    const levelColor =
                      skill.level === 'Advanced'
                        ? tokens.teal
                        : skill.level === 'Intermediate'
                        ? '#3B82F6'
                        : tokens.amber;

                    return (
                      <Chip
                        key={skill.name}
                        icon={<FiCode size={13} color={levelColor} />}
                        label={`${skill.name} · ${skill.level}`}
                        onDelete={() => onRemoveSkill(skill.name)}
                        deleteIcon={<FiX size={14} />}
                        sx={{
                          bgcolor: 'background.default',
                          border: `1px solid ${tokens.line}`,
                          fontWeight: 600,
                          fontSize: 12.5,
                          py: 1.8,
                          px: 0.5,
                          '& .MuiChip-deleteIcon': {
                            color: tokens.slate,
                            '&:hover': { color: tokens.danger },
                          },
                        }}
                      />
                    );
                  })}
                </Stack>
              )}
            </Box>
          );
        })}
      </Stack>

      {/* Add Skill Dialog */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 18 }}>
            Add Technical Skill
          </Typography>
          <IconButton size="small" onClick={() => setModalOpen(false)}>
            <FiX size={18} />
          </IconButton>
        </DialogTitle>
        <Box component="form" onSubmit={handleAddSubmit}>
          <DialogContent>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Skill Name"
                placeholder="e.g. GraphQL, PostgreSQL, Docker"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                required
                autoFocus
              />

              <FormControl fullWidth>
                <InputLabel id="skill-cat-label">Domain Category</InputLabel>
                <Select
                  labelId="skill-cat-label"
                  value={newSkillCategory}
                  label="Domain Category"
                  onChange={(e) => setNewSkillCategory(e.target.value)}
                >
                  <MenuItem value="Frontend">Frontend</MenuItem>
                  <MenuItem value="Backend">Backend</MenuItem>
                  <MenuItem value="Database">Database</MenuItem>
                  <MenuItem value="Cloud & DevOps">Cloud & DevOps</MenuItem>
                  <MenuItem value="Core CS">Core CS</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="skill-level-label">Proficiency Level</InputLabel>
                <Select
                  labelId="skill-level-label"
                  value={newSkillLevel}
                  label="Proficiency Level"
                  onChange={(e) => setNewSkillLevel(e.target.value)}
                >
                  <MenuItem value="Advanced">Advanced (Mastered)</MenuItem>
                  <MenuItem value="Intermediate">Intermediate (Proficient)</MenuItem>
                  <MenuItem value="Beginner">Beginner (Learning)</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2.5 }}>
            <Button onClick={() => setModalOpen(false)} sx={{ color: tokens.slate }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: tokens.teal, fontWeight: 700 }}>
              Add Skill
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
