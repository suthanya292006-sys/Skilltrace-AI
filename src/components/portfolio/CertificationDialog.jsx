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
  name: '',
  organization: '',
  issueDate: '',
  credentialId: '',
  credentialLink: '',
  fileUrl: '',
};

export default function CertificationDialog({ open, onClose, onSave, initialValue }) {
  const [form, setForm] = useState(defaultState);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      if (initialValue) {
        setForm({
          name: initialValue.name || initialValue.title || '',
          organization: initialValue.organization || initialValue.issuer || '',
          issueDate: initialValue.issueDate || initialValue.year || '',
          credentialId: initialValue.credentialId || '',
          credentialLink: initialValue.credentialLink || initialValue.verificationUrl || '',
          fileUrl: initialValue.fileUrl || initialValue.certificateFile || '',
        });
      } else {
        setForm(defaultState);
      }
      setError('');
    }
  }, [open, initialValue]);

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (error && (field === 'name' || field === 'organization')) setError('');
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      setError('Certificate Name is required.');
      return;
    }
    if (!form.organization.trim()) {
      setError('Organization / Issuer is required.');
      return;
    }

    onSave({
      name: form.name.trim(),
      title: form.name.trim(),
      organization: form.organization.trim(),
      issuer: form.organization.trim(),
      issueDate: form.issueDate.trim(),
      year: form.issueDate.trim(),
      credentialId: form.credentialId.trim(),
      credentialLink: form.credentialLink.trim(),
      verificationUrl: form.credentialLink.trim(),
      fileUrl: form.fileUrl.trim(),
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" paperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ fontWeight: 700 }}>
        {initialValue ? 'Edit Certificate' : 'Add New Certificate'}
      </DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
            {error}
          </Alert>
        )}
        <Stack spacing={2} sx={{ mt: 0.5 }}>
          <TextField
            label="Certificate Name *"
            fullWidth
            value={form.name}
            onChange={handleChange('name')}
            placeholder="e.g. AWS Certified Developer – Associate"
          />
          <TextField
            label="Issuing Organization *"
            fullWidth
            value={form.organization}
            onChange={handleChange('organization')}
            placeholder="e.g. Amazon Web Services, Coursera, HackerRank"
          />
          <TextField
            label="Issue Date / Year"
            placeholder="e.g. May 2026 or 2026"
            fullWidth
            value={form.issueDate}
            onChange={handleChange('issueDate')}
          />
          <TextField
            label="Credential ID (optional)"
            placeholder="e.g. AWS-DEV-908214"
            fullWidth
            value={form.credentialId}
            onChange={handleChange('credentialId')}
          />
          <TextField
            label="Credential Link / Verification URL (optional)"
            placeholder="https://aws.amazon.com/verify/..."
            fullWidth
            value={form.credentialLink}
            onChange={handleChange('credentialLink')}
          />
          <TextField
            label="Certificate File URL or Attachment (optional)"
            placeholder="https://example.com/certificate.pdf"
            fullWidth
            value={form.fileUrl}
            onChange={handleChange('fileUrl')}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={onClose} color="inherit" sx={{ fontWeight: 600 }}>
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" disableElevation sx={{ fontWeight: 700, px: 3 }}>
          Save Certificate
        </Button>
      </DialogActions>
    </Dialog>
  );
}
