import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from '@mui/material';

export default function ProjectDialog({ open, onClose, onSave, initialValue }) {
  const [form, setForm] = useState(
    initialValue || { title: '', description: '', techStack: '', link: '' }
  );

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSave = () => {
    if (!form.title.trim()) return;
    onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialValue ? 'Edit project' : 'Add project'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2.2} sx={{ mt: 0.5 }}>
          <TextField label="Project title" fullWidth value={form.title} onChange={handleChange('title')} />
          <TextField
            label="Description"
            fullWidth
            multiline
            minRows={3}
            value={form.description}
            onChange={handleChange('description')}
          />
          <TextField
            label="Tech stack"
            placeholder="React, Node.js, MongoDB"
            fullWidth
            value={form.techStack}
            onChange={handleChange('techStack')}
          />
          <TextField
            label="Live demo / repo link"
            fullWidth
            value={form.link}
            onChange={handleChange('link')}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" disableElevation>
          {initialValue ? 'Save changes' : 'Add project'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
