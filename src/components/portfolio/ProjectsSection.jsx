import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Chip,
  Stack,
  IconButton,
  Button,
  Grid,
  Menu,
  MenuItem,
  Skeleton,
} from '@mui/material';
import { FiFolder, FiPlus, FiMoreVertical, FiExternalLink, FiGithub } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import ProjectDialog from './ProjectDialog';
import {
  getStudentProfile,
  addStudentProject,
  updateStudentProject,
  deleteStudentProject,
} from '../../services/profileService';
import { tokens } from '../../styles/theme';

function ProjectCardMenu({ onEdit, onDelete }) {
  const [anchorEl, setAnchorEl] = useState(null);
  return (
    <>
      <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ flexShrink: 0 }}>
        <FiMoreVertical size={15} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={() => setAnchorEl(null)}>
        <MenuItem
          onClick={() => {
            onEdit();
            setAnchorEl(null);
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            onDelete();
            setAnchorEl(null);
          }}
          sx={{ color: tokens.danger }}
        >
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    try {
      const { profile } = await getStudentProfile();
      setProjects(profile.projects || []);
    } catch (err) {
      console.error('Error loading projects:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const openAdd = () => {
    setEditIndex(null);
    setDialogOpen(true);
  };

  const openEdit = (index) => {
    setEditIndex(index);
    setDialogOpen(true);
  };

  const handleSave = async (data) => {
    if (editIndex === null) {
      const res = await addStudentProject(data);
      setProjects(res.projects);
    } else {
      const targetProj = projects[editIndex];
      if (targetProj && targetProj.id) {
        const res = await updateStudentProject(targetProj.id, data);
        setProjects(res.projects);
      }
    }
  };

  const handleDelete = async (index) => {
    const targetProj = projects[index];
    if (targetProj && targetProj.id) {
      const res = await deleteStudentProject(targetProj.id);
      setProjects(res.projects);
    }
  };

  return (
    <DashboardCard
      title="Projects"
      subtitle={`${projects.length} project${projects.length === 1 ? '' : 's'} in your portfolio`}
      icon={FiFolder}
      action={
        <Button size="small" startIcon={<FiPlus size={15} />} onClick={openAdd} sx={{ fontWeight: 700 }}>
          + Add Project
        </Button>
      }
    >
      {loading ? (
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Skeleton variant="rounded" height={160} sx={{ borderRadius: 2.5 }} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Skeleton variant="rounded" height={160} sx={{ borderRadius: 2.5 }} />
          </Grid>
        </Grid>
      ) : projects.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4, px: 2, bgcolor: 'background.default', borderRadius: 2.5, border: `1.5px dashed ${tokens.line}` }}>
          <FiFolder size={32} color={tokens.slate} style={{ marginBottom: 8, opacity: 0.6 }} />
          <Typography variant="body2" sx={{ fontWeight: 600, color: tokens.ink, mb: 0.5 }}>
            No projects added yet.
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>
            Click '+ Add Project' to add your first project manually.
          </Typography>
          <Button variant="outlined" size="small" startIcon={<FiPlus size={14} />} onClick={openAdd} sx={{ fontWeight: 700 }}>
            + Add Project
          </Button>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {projects.map((p, i) => {
            const stackArray = Array.isArray(p.techStack)
              ? p.techStack
              : (p.techStack || '').split(',').map((t) => t.trim()).filter(Boolean);

            const github = p.githubUrl || p.githubLink || p.link || '';
            const live = p.liveUrl || p.liveDemoLink || '';

            return (
              <Grid key={p.id || i} size={{ xs: 12, sm: 6 }}>
                <Box
                  sx={{
                    border: `1px solid ${tokens.line}`,
                    borderRadius: 2.5,
                    p: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 0,
                    overflow: 'hidden',
                  }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ minWidth: 0, mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, pr: 1, minWidth: 0, wordBreak: 'break-word' }}>
                      {p.title}
                    </Typography>
                    <ProjectCardMenu onEdit={() => openEdit(i)} onDelete={() => handleDelete(i)} />
                  </Stack>

                  {p.description && (
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.4, flex: 1, wordBreak: 'break-word', fontSize: 13 }}>
                      {p.description}
                    </Typography>
                  )}

                  {stackArray.length > 0 && (
                    <Stack direction="row" spacing={0.6} flexWrap="wrap" useFlexGap sx={{ mb: 1.2, maxWidth: '100%' }}>
                      {stackArray.map((t) => (
                        <Chip key={t} label={t} size="small" sx={{ bgcolor: 'action.hover', fontSize: 11, fontWeight: 600 }} />
                      ))}
                    </Stack>
                  )}

                  <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" sx={{ mt: 'auto', pt: 0.5 }}>
                    {github && (
                      <Stack
                        direction="row"
                        spacing={0.5}
                        alignItems="center"
                        component="a"
                        href={github.startsWith('http') ? github : `https://${github}`}
                        target="_blank"
                        rel="noreferrer"
                        sx={{ color: tokens.ink, textDecoration: 'none', '&:hover': { textDecoration: 'underline' }, minWidth: 0 }}
                      >
                        <FiGithub size={13} />
                        <Typography variant="caption" sx={{ fontWeight: 600, wordBreak: 'break-all' }}>
                          GitHub
                        </Typography>
                      </Stack>
                    )}
                    {live && (
                      <Stack
                        direction="row"
                        spacing={0.5}
                        alignItems="center"
                        component="a"
                        href={live.startsWith('http') ? live : `https://${live}`}
                        target="_blank"
                        rel="noreferrer"
                        sx={{ color: tokens.tealDark, textDecoration: 'none', '&:hover': { textDecoration: 'underline' }, minWidth: 0 }}
                      >
                        <FiExternalLink size={13} />
                        <Typography variant="caption" sx={{ fontWeight: 600, wordBreak: 'break-all' }}>
                          Live Demo
                        </Typography>
                      </Stack>
                    )}
                  </Stack>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      )}

      <ProjectDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        initialValue={editIndex !== null ? projects[editIndex] : null}
      />
    </DashboardCard>
  );
}
