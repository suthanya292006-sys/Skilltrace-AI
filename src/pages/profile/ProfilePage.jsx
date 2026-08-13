import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Stack,
  Button,
  Grid,
  Chip,
  Paper,
  Tabs,
  Tab,
  Skeleton,
  Snackbar,
  Alert,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  FiUser,
  FiBookOpen,
  FiCode,
  FiFolder,
  FiAward,
  FiGlobe,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiExternalLink,
  FiPlus,
  FiMail,
  FiPhone,
  FiMapPin,
  FiBell,
  FiTarget,
} from 'react-icons/fi';
import ProfileHeader from '../../components/profile/ProfileHeader';
import ProfileSection from '../../components/profile/ProfileSection';
import SkillList from '../../components/profile/SkillList';
import ProfileForm from '../../components/profile/ProfileForm';
import NotificationPanel from '../../components/notifications/NotificationPanel';
import {
  getStudentProfile,
  updateStudentProfile,
  addStudentSkill,
  removeStudentSkill,
  addStudentProject,
  addStudentCertification,
} from '../../services/profileService';
import { tokens } from '../../styles/theme';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState(0); // 0: Profile Dashboard, 1: Notifications Center
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [completion, setCompletion] = useState({ percentage: 90, missingItems: [] });
  const [editModalOpen, setEditModalOpen] = useState(false);

  // Toast Snackbar State
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  const showToast = (message, severity = 'success') => {
    setToast({ open: true, message, severity });
  };

  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  const fetchProfileData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getStudentProfile();
      setProfile(res.profile);
      setCompletion(res.completion);
    } catch (err) {
      console.error('Failed to load profile:', err);
      showToast('Failed to load student profile.', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  // Profile Edit Save
  const handleSaveProfile = async (updatedFields) => {
    try {
      const res = await updateStudentProfile(updatedFields);
      setProfile(res.profile);
      setCompletion(res.completion);
      showToast('Profile updated successfully!', 'success');
    } catch (err) {
      console.error(err);
      showToast('Failed to update profile.', 'error');
    }
  };

  // Skill Add / Remove
  const handleAddSkill = async (skillObj) => {
    try {
      const res = await addStudentSkill(skillObj);
      setProfile((prev) => ({ ...prev, skills: res.skills }));
      setCompletion(res.completion);
      showToast(`Skill "${skillObj.name}" added successfully!`, 'success');
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveSkill = async (skillName) => {
    try {
      const res = await removeStudentSkill(skillName);
      setProfile((prev) => ({ ...prev, skills: res.skills }));
      setCompletion(res.completion);
      showToast(`Skill "${skillName}" removed.`, 'info');
    } catch (err) {
      console.error(err);
    }
  };

  // Quick Add Project Simulation
  const handleAddSampleProject = async () => {
    const proj = {
      title: 'Full Stack Micro-Frontend Suite',
      description: 'Modular architecture project built using Vite, Module Federation, and TailwindCSS.',
      techStack: ['React', 'TypeScript', 'Docker', 'Vite'],
      liveUrl: 'https://demo-app.vercel.app',
      githubUrl: 'https://github.com/aditisharma/micro-frontend-suite',
      featured: true,
      impact: 'Advanced Architecture',
    };
    const res = await addStudentProject(proj);
    setProfile((prev) => ({ ...prev, projects: res.projects }));
    setCompletion(res.completion);
    showToast('New project added to your portfolio!', 'success');
  };

  // Quick Add Cert Simulation
  const handleAddSampleCert = async () => {
    const cert = {
      title: 'Google Cloud Associate Cloud Engineer',
      issuer: 'Google Cloud Platform (GCP)',
      issueDate: 'Jul 2026',
      credentialId: 'GCP-ACE-884102',
      verificationUrl: 'https://cloud.google.com/verify/GCP-ACE-884102',
    };
    const res = await addStudentCertification(cert);
    setProfile((prev) => ({ ...prev, certifications: res.certifications }));
    setCompletion(res.completion);
    showToast('New cloud certification added!', 'success');
  };

  if (loading) {
    return (
      <Box sx={{ maxWidth: 1400, mx: 'auto', pb: 6 }}>
        <Skeleton variant="rounded" height={200} sx={{ borderRadius: 3, mb: 4 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rounded" height={320} sx={{ borderRadius: 3 }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rounded" height={320} sx={{ borderRadius: 3 }} />
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto', pb: 6 }}>
      {/* Navigation View Tabs */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: 22, md: 26 }, color: tokens.ink }}>
            Student Profile & Control Center
          </Typography>
          <Typography variant="body2" sx={{ color: tokens.slate }}>
            Manage your personal details, academic credentials, skill matrix, projects, and notification alerts.
          </Typography>
        </Box>

        <Box sx={{ bgcolor: 'background.paper', border: `1px solid ${tokens.line}`, borderRadius: 2.5, p: 0.5 }}>
          <Tabs
            value={activeTab}
            onChange={(_, val) => setActiveTab(val)}
            sx={{
              minHeight: 38,
              '& .MuiTab-root': {
                minHeight: 36,
                py: 0.5,
                px: 2,
                borderRadius: 2,
                fontWeight: 700,
                fontSize: 13,
                color: tokens.slate,
                '&.Mui-selected': { bgcolor: tokens.teal, color: '#ffffff' },
              },
              '& .MuiTabs-indicator': { display: 'none' },
            }}
          >
            <Tab icon={<FiUser size={15} />} iconPosition="start" label="Profile Dashboard" />
            <Tab icon={<FiBell size={15} />} iconPosition="start" label="Notifications Center" />
          </Tabs>
        </Box>
      </Stack>

      {/* Main Content tab 0: Profile Dashboard */}
      {activeTab === 0 && profile && (
        <Box>
          {/* Header Banner */}
          <ProfileHeader
            profile={profile}
            completion={completion}
            onEditClick={() => setEditModalOpen(true)}
          />

          <Grid container spacing={3}>
            {/* Left Column: Personal Info & Education */}
            <Grid item xs={12} md={6}>
              {/* Personal Information Section */}
              <ProfileSection title="Personal Information" icon={FiUser} actionText="Edit Details" onActionClick={() => setEditModalOpen(true)}>
                <Stack spacing={2}>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <FiMail size={16} color={tokens.teal} />
                    <Box>
                      <Typography variant="caption" sx={{ color: tokens.slate, display: 'block' }}>Email Address</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: tokens.ink }}>{profile.email}</Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <FiPhone size={16} color={tokens.teal} />
                    <Box>
                      <Typography variant="caption" sx={{ color: tokens.slate, display: 'block' }}>Phone Number</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: tokens.ink }}>{profile.phone}</Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <FiMapPin size={16} color={tokens.teal} />
                    <Box>
                      <Typography variant="caption" sx={{ color: tokens.slate, display: 'block' }}>Location</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: tokens.ink }}>{profile.location}</Typography>
                    </Box>
                  </Stack>

                  {profile.bio && (
                    <Box sx={{ pt: 1, borderTop: `1px dashed ${tokens.line}` }}>
                      <Typography variant="caption" sx={{ color: tokens.slate, display: 'block', mb: 0.5 }}>About Bio</Typography>
                      <Typography variant="body2" sx={{ color: tokens.ink, lineHeight: 1.5, fontSize: 13.5 }}>
                        {profile.bio}
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </ProfileSection>

              {/* Education & Academics Section */}
              <ProfileSection title="Education & Academic Profile" icon={FiBookOpen}>
                <Stack spacing={2}>
                  <Box sx={{ p: 2, borderRadius: 2.5, bgcolor: 'background.default', border: `1px solid ${tokens.line}` }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: tokens.ink }}>
                      {profile.college}
                    </Typography>
                    <Typography variant="body2" sx={{ color: tokens.tealDark, fontWeight: 600, mb: 1 }}>
                      {profile.department}
                    </Typography>
                    <Grid container spacing={1} sx={{ mt: 0.5 }}>
                      <Grid item xs={6}>
                        <Typography variant="caption" sx={{ color: tokens.slate }}>Academic Year</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{profile.academicYear}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" sx={{ color: tokens.slate }}>Cumulative CGPA</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: tokens.amber }}>{profile.cgpa}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" sx={{ color: tokens.slate }}>Current Semester</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{profile.currentSemester}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" sx={{ color: tokens.slate }}>Enrollment ID</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{profile.enrollmentNo}</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Stack>
              </ProfileSection>

              {/* Social & Professional Links */}
              <ProfileSection title="Social & Professional Profiles" icon={FiGlobe} actionText="Edit Links" onActionClick={() => setEditModalOpen(true)}>
                <Stack spacing={1.5}>
                  {profile.links?.github && (
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1.5, borderRadius: 2, border: `1px solid ${tokens.line}` }}>
                      <Stack direction="row" alignItems="center" spacing={1.5}>
                        <FiGithub size={18} color={tokens.ink} />
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>GitHub Profile</Typography>
                          <Typography variant="caption" sx={{ color: tokens.slate }}>{profile.links.github}</Typography>
                        </Box>
                      </Stack>
                      <IconButton size="small" onClick={() => window.open(profile.links.github, '_blank')}>
                        <FiExternalLink size={14} />
                      </IconButton>
                    </Stack>
                  )}

                  {profile.links?.linkedin && (
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1.5, borderRadius: 2, border: `1px solid ${tokens.line}` }}>
                      <Stack direction="row" alignItems="center" spacing={1.5}>
                        <FiLinkedin size={18} color="#0A66C2" />
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>LinkedIn Profile</Typography>
                          <Typography variant="caption" sx={{ color: tokens.slate }}>{profile.links.linkedin}</Typography>
                        </Box>
                      </Stack>
                      <IconButton size="small" onClick={() => window.open(profile.links.linkedin, '_blank')}>
                        <FiExternalLink size={14} />
                      </IconButton>
                    </Stack>
                  )}

                  {profile.links?.portfolio && (
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1.5, borderRadius: 2, border: `1px solid ${tokens.line}` }}>
                      <Stack direction="row" alignItems="center" spacing={1.5}>
                        <FiGlobe size={18} color={tokens.teal} />
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>Personal Portfolio</Typography>
                          <Typography variant="caption" sx={{ color: tokens.slate }}>{profile.links.portfolio}</Typography>
                        </Box>
                      </Stack>
                      <IconButton size="small" onClick={() => window.open(profile.links.portfolio, '_blank')}>
                        <FiExternalLink size={14} />
                      </IconButton>
                    </Stack>
                  )}

                  {profile.links?.twitter && (
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1.5, borderRadius: 2, border: `1px solid ${tokens.line}` }}>
                      <Stack direction="row" alignItems="center" spacing={1.5}>
                        <FiTwitter size={18} color="#1DA1F2" />
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>Twitter / X</Typography>
                          <Typography variant="caption" sx={{ color: tokens.slate }}>{profile.links.twitter}</Typography>
                        </Box>
                      </Stack>
                      <IconButton size="small" onClick={() => window.open(profile.links.twitter, '_blank')}>
                        <FiExternalLink size={14} />
                      </IconButton>
                    </Stack>
                  )}
                </Stack>
              </ProfileSection>
            </Grid>

            {/* Right Column: Skills, Projects, Certifications */}
            <Grid item xs={12} md={6}>
              {/* Technical Skills Section */}
              <ProfileSection title="Technical Skill Matrix" icon={FiCode} subtitle={`${profile.skills?.length || 0} Verified Skills`}>
                <SkillList
                  skills={profile.skills || []}
                  onAddSkill={handleAddSkill}
                  onRemoveSkill={handleRemoveSkill}
                />
              </ProfileSection>

              {/* Projects Section */}
              <ProfileSection title="Featured Projects" icon={FiFolder} actionText="+ Add Project" onActionClick={handleAddSampleProject}>
                <Stack spacing={2}>
                  {profile.projects?.map((proj) => (
                    <Paper key={proj.id} sx={{ p: 2.2, border: `1px solid ${tokens.line}`, borderRadius: 2.5, bgcolor: '#ffffff' }}>
                      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ mb: 1 }}>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: tokens.ink, lineHeight: 1.3 }}>
                            {proj.title}
                          </Typography>
                          <Chip label={proj.impact} size="small" sx={{ bgcolor: 'rgba(15,157,140,0.1)', color: tokens.tealDark, fontSize: 10, fontWeight: 700, height: 20, mt: 0.5 }} />
                        </Box>
                        <Stack direction="row" spacing={0.5}>
                          {proj.githubUrl && (
                            <Tooltip title="View GitHub Repo">
                              <IconButton size="small" onClick={() => window.open(proj.githubUrl, '_blank')}>
                                <FiGithub size={15} />
                              </IconButton>
                            </Tooltip>
                          )}
                          {proj.liveUrl && (
                            <Tooltip title="View Live Demo">
                              <IconButton size="small" onClick={() => window.open(proj.liveUrl, '_blank')}>
                                <FiExternalLink size={15} color={tokens.teal} />
                              </IconButton>
                            </Tooltip>
                          )}
                        </Stack>
                      </Stack>

                      <Typography variant="body2" sx={{ color: tokens.slate, fontSize: 13, mb: 1.5, lineHeight: 1.4 }}>
                        {proj.description}
                      </Typography>

                      <Stack direction="row" flexWrap="wrap" gap={0.6}>
                        {proj.techStack?.map((t) => (
                          <Chip key={t} label={t} size="small" variant="outlined" sx={{ height: 20, fontSize: 10.5, borderColor: tokens.line }} />
                        ))}
                      </Stack>
                    </Paper>
                  ))}
                </Stack>
              </ProfileSection>

              {/* Certifications Section */}
              <ProfileSection title="Certifications & Accreditations" icon={FiAward} actionText="+ Add Cert" onActionClick={handleAddSampleCert}>
                <Stack spacing={2}>
                  {profile.certifications?.map((cert) => (
                    <Paper key={cert.id} sx={{ p: 2, border: `1px solid ${tokens.line}`, borderRadius: 2.5, bgcolor: '#ffffff' }}>
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: tokens.ink }}>
                            {cert.title}
                          </Typography>
                          <Typography variant="caption" sx={{ color: tokens.tealDark, fontWeight: 600, display: 'block' }}>
                            {cert.issuer} · Issued {cert.issueDate}
                          </Typography>
                          <Typography variant="caption" sx={{ color: tokens.slate, fontSize: 11 }}>
                            Credential ID: {cert.credentialId}
                          </Typography>
                        </Box>

                        {cert.verificationUrl && (
                          <Tooltip title="Verify Credential">
                            <IconButton size="small" onClick={() => window.open(cert.verificationUrl, '_blank')}>
                              <FiExternalLink size={15} color={tokens.teal} />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Stack>
                    </Paper>
                  ))}
                </Stack>
              </ProfileSection>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Main Content tab 1: Notifications Center */}
      {activeTab === 1 && (
        <NotificationPanel />
      )}

      {/* Edit Profile Modal */}
      <ProfileForm
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
      />

      {/* Feedback Toast */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseToast} severity={toast.severity} sx={{ borderRadius: 2.5, fontWeight: 600 }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
