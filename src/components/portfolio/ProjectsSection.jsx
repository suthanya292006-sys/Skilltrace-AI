import { useState } from 'react';
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
} from '@mui/material';
import { FiFolder, FiPlus, FiMoreVertical, FiExternalLink } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import ProjectDialog from './ProjectDialog';
import { tokens } from '../../styles/theme';

const initialProjects = [
  {
    title: 'AI Smart Waste Management',
    description: 'Municipality dashboard + FastAPI backend for AI-based waste routing.',
    techStack: 'React, FastAPI, PostgreSQL',
    link: 'github.com/example/waste-mgmt',
  },
  {
    title: 'Smart Invigilation Duty Allocation',
    description: 'Full-stack system for AI-based invigilation duty allocation and anomaly detection.',
    techStack: 'React, Node.js, MongoDB',
    link: 'github.com/example/invigilation',
  },
  {
    title: 'Campus Event Tracker',
    description: 'Lightweight event discovery app for college societies.',
    techStack: 'React, Firebase',
    link: '',
  },
];

function ProjectCardMenu({ onEdit, onDelete }) {
  const [anchorEl, setAnchorEl] = useState(null);
  return (
    <>
      <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
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
  const [projects, setProjects] = useState(initialProjects);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const openAdd = () => {
    setEditIndex(null);
    setDialogOpen(true);
  };
  const openEdit = (i) => {
    setEditIndex(i);
    setDialogOpen(true);
  };
  const handleSave = (data) => {
    if (editIndex === null) {
      setProjects((p) => [...p, data]);
    } else {
      setProjects((p) => p.map((proj, i) => (i === editIndex ? data : proj)));
    }
  };
  const handleDelete = (i) => setProjects((p) => p.filter((_, idx) => idx !== i));

  return (
    <DashboardCard
      title="Projects"
      subtitle={`${projects.length} project${projects.length === 1 ? '' : 's'} in your portfolio`}
      icon={FiFolder}
      action={
        <Button size="small" startIcon={<FiPlus size={15} />} onClick={openAdd}>
          Add project
        </Button>
      }
    >
      <Grid container spacing={2}>
        {projects.map((p, i) => (
          <Grid key={i} size={{ xs: 12, sm: 6 }}>
            <Box
              sx={{
                border: `1px solid ${tokens.line}`,
                borderRadius: 2.5,
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Typography variant="subtitle2" sx={{ fontWeight: 600, pr: 1 }}>
                  {p.title}
                </Typography>
                <ProjectCardMenu onEdit={() => openEdit(i)} onDelete={() => handleDelete(i)} />
              </Stack>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5, mb: 1.4, flex: 1 }}>
                {p.description}
              </Typography>
              <Stack direction="row" spacing={0.6} flexWrap="wrap" useFlexGap sx={{ mb: 1.2 }}>
                {p.techStack
                  .split(',')
                  .map((t) => t.trim())
                  .filter(Boolean)
                  .map((t) => (
                    <Chip key={t} label={t} size="small" sx={{ bgcolor: 'action.hover', fontSize: 11 }} />
                  ))}
              </Stack>
              {p.link && (
                <Stack direction="row" spacing={0.6} alignItems="center" sx={{ color: tokens.tealDark }}>
                  <FiExternalLink size={13} />
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    {p.link}
                  </Typography>
                </Stack>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>

      <ProjectDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        initialValue={editIndex !== null ? projects[editIndex] : null}
      />
    </DashboardCard>
  );
}
