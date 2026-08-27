import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Alert,
} from '@mui/material';

const defaultState = {
  title: '',
  description: '',
  techStack: '',
  githubUrl: '',
  liveUrl: '',
  image: '',
};

export default function ProjectDialog({ open, onClose, onSave, initialValue }) {
  const [form, setForm] = useState(defaultState);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      if (initialValue) {
        setForm({
          title: initialValue.title || '',
          description: initialValue.description || '',
          techStack: Array.isArray(initialValue.techStack)
            ? initialValue.techStack.join(', ')
            : initialValue.techStack || '',
          githubUrl: initialValue.githubUrl || initialValue.githubLink || initialValue.link || '',
          liveUrl: initialValue.liveUrl || initialValue.liveDemoLink || '',
          image: initialValue.image || initialValue.projectImage || '',
        });
      } else {
        setForm(defaultState);
      }
      setError('');
    }
  }, [open, initialValue]);

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (error && field === 'title') setError('');
  };

  const handleSave = () => {
    if (!form.title.trim()) {
      setError('Project title is required.');
      return;
    }

    onSave({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      techStack: form.techStack.trim(),
      githubUrl: form.githubUrl.trim(),
      liveUrl: form.liveUrl.trim(),
      image: form.image.trim(),
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" paperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ fontWeight: 700 }}>
        {initialValue ? 'Edit Project' : 'Add New Project'}
      </DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
            {error}
          </Alert>
        )}
        <Stack spacing={2} sx={{ mt: 0.5 }}>
          <TextField
            label="Project Title *"
            fullWidth
            value={form.title}
            onChange={handleChange('title')}
            error={!!error}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            minRows={3}
            value={form.description}
            onChange={handleChange('description')}
            placeholder="Briefly describe what this project does and key features built..."
          />
          <TextField
            label="Technology / Tech Stack"
            placeholder="e.g. React, Node.js, FastAPI, MongoDB"
            fullWidth
            value={form.techStack}
            onChange={handleChange('techStack')}
            helperText="Separate multiple technologies with commas"
          />
          <TextField
            label="GitHub Repository Link (optional)"
            placeholder="https://github.com/username/repository"
            fullWidth
            value={form.githubUrl}
            onChange={handleChange('githubUrl')}
          />
          <TextField
            label="Live Demo Link (optional)"
            placeholder="https://my-app.vercel.app"
            fullWidth
            value={form.liveUrl}
            onChange={handleChange('liveUrl')}
          />
          <TextField
            label="Project Image / Thumbnail URL (optional)"
            placeholder="https://example.com/image.png"
            fullWidth
            value={form.image}
            onChange={handleChange('image')}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={onClose} color="inherit" sx={{ fontWeight: 600 }}>
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" disableElevation sx={{ fontWeight: 700, px: 3 }}>
          Save Project
        </Button>
      </DialogActions>
    </Dialog>
  );
}
