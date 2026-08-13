import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Stack,
  Button,
  TextField,
  IconButton,
  Grid,
  Alert,
  Tabs,
  Tab,
} from '@mui/material';
import { FiX, FiCheckCircle } from 'react-icons/fi';
import { tokens } from '../../styles/theme';

export default function ProfileForm({ open, onClose, profile, onSave }) {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    college: '',
    department: '',
    academicYear: '',
    cgpa: '',
    careerGoal: '',
    targetSalaryRange: '',
    github: '',
    linkedin: '',
    portfolio: '',
    twitter: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || '',
        email: profile.email || '',
        phone: profile.phone || '',
        location: profile.location || '',
        bio: profile.bio || '',
        college: profile.college || '',
        department: profile.department || '',
        academicYear: profile.academicYear || '',
        cgpa: profile.cgpa || '',
        careerGoal: profile.careerGoal || '',
        targetSalaryRange: profile.targetSalaryRange || '',
        github: profile.links?.github || '',
        linkedin: profile.links?.linkedin || '',
        portfolio: profile.links?.portfolio || '',
        twitter: profile.links?.twitter || '',
      });
    }
  }, [profile]);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const errs = {};

    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }

    if (!formData.college.trim()) errs.college = 'College name is required';
    if (!formData.department.trim()) errs.department = 'Department is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      bio: formData.bio,
      college: formData.college,
      department: formData.department,
      academicYear: formData.academicYear,
      cgpa: formData.cgpa,
      careerGoal: formData.careerGoal,
      targetSalaryRange: formData.targetSalaryRange,
      links: {
        github: formData.github,
        linkedin: formData.linkedin,
        portfolio: formData.portfolio,
        twitter: formData.twitter,
      },
    };

    onSave(payload);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, maxHeight: '90vh' } }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 18, color: tokens.ink }}>
            Edit Student Profile
          </Typography>
          <Typography variant="caption" sx={{ color: tokens.slate }}>
            Update your personal info, academic details, career goals, and professional links.
          </Typography>
        </Box>
        <IconButton size="small" onClick={onClose}>
          <FiX size={20} />
        </IconButton>
      </DialogTitle>

      <Box sx={{ borderBottom: 1, borderColor: tokens.line, px: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(_, val) => setActiveTab(val)}
          textColor="primary"
          indicatorColor="primary"
          sx={{ '& .MuiTab-root': { fontWeight: 600, fontSize: 13.5 } }}
        >
          <Tab label="1. Personal Info" />
          <Tab label="2. Academic & Goal" />
          <Tab label="3. Social Links" />
        </Tabs>
      </Box>

      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent sx={{ p: 3 }}>
          {/* Tab 1: Personal Info */}
          {activeTab === 0 && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={formData.fullName}
                  onChange={handleChange('fullName')}
                  error={Boolean(errors.fullName)}
                  helperText={errors.fullName}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={formData.phone}
                  onChange={handleChange('phone')}
                  placeholder="+91 98765 43210"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Location"
                  value={formData.location}
                  onChange={handleChange('location')}
                  placeholder="City, State, Country"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Bio / Professional Summary"
                  value={formData.bio}
                  onChange={handleChange('bio')}
                  placeholder="Brief overview of your engineering background and product interests…"
                />
              </Grid>
            </Grid>
          )}

          {/* Tab 2: Academic & Career Goal */}
          {activeTab === 1 && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="College / University"
                  value={formData.college}
                  onChange={handleChange('college')}
                  error={Boolean(errors.college)}
                  helperText={errors.college}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Department / Branch"
                  value={formData.department}
                  onChange={handleChange('department')}
                  error={Boolean(errors.department)}
                  helperText={errors.department}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Academic Year / Batch"
                  value={formData.academicYear}
                  onChange={handleChange('academicYear')}
                  placeholder="Final Year (2023 - 2027)"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="CGPA / Percentage"
                  value={formData.cgpa}
                  onChange={handleChange('cgpa')}
                  placeholder="8.92 / 10.0"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Primary Career Goal"
                  value={formData.careerGoal}
                  onChange={handleChange('careerGoal')}
                  placeholder="e.g. Full Stack Engineer, SDE-1"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Target Salary Range"
                  value={formData.targetSalaryRange}
                  onChange={handleChange('targetSalaryRange')}
                  placeholder="e.g. ₹12 LPA – ₹18 LPA"
                />
              </Grid>
            </Grid>
          )}

          {/* Tab 3: Social & Professional Links */}
          {activeTab === 2 && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="GitHub Profile URL"
                  value={formData.github}
                  onChange={handleChange('github')}
                  placeholder="https://github.com/username"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="LinkedIn Profile URL"
                  value={formData.linkedin}
                  onChange={handleChange('linkedin')}
                  placeholder="https://linkedin.com/in/username"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Portfolio Website URL"
                  value={formData.portfolio}
                  onChange={handleChange('portfolio')}
                  placeholder="https://yourportfolio.dev"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Twitter / X Profile URL"
                  value={formData.twitter}
                  onChange={handleChange('twitter')}
                  placeholder="https://twitter.com/username"
                />
              </Grid>

              <Grid item xs={12}>
                <Alert severity="info" icon={<FiCheckCircle size={16} />} sx={{ borderRadius: 2, fontSize: 12.5 }}>
                  Recruiters evaluate verified GitHub & LinkedIn links when scoring your candidate profile.
                </Alert>
              </Grid>
            </Grid>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={onClose} sx={{ color: tokens.slate }}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ bgcolor: tokens.teal, '&:hover': { bgcolor: tokens.tealDark }, fontWeight: 700, px: 3 }}
          >
            Save Profile Changes
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
