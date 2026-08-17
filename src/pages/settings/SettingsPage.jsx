import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Stack,
  Button,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Snackbar,
  Alert,
  Divider,
  Chip,
  Badge,
  Tabs,
  Tab,
} from '@mui/material';
import {
  FiUser,
  FiLock,
  FiBell,
  FiEye,
  FiEyeOff,
  FiSun,
  FiMoon,
  FiShield,
  FiGlobe,
  FiHelpCircle,
  FiInfo,
  FiSave,
  FiRotateCcw,
  FiLogOut,
  FiCheckCircle,
  FiChevronDown,
  FiMail,
  FiSmartphone,
  FiSliders,
  FiBookOpen,
} from 'react-icons/fi';
import SettingsSection from '../../components/settings/SettingsSection';
import SettingsToggle from '../../components/settings/SettingsToggle';
import {
  getStoredSettings,
  saveUserSettings,
  updatePassword,
  terminateOtherSessions,
  resetAllSettings,
} from '../../services/settingsService';
import { tokens } from '../../styles/theme';

import { useAuth } from '../../context/AuthContext';

export default function SettingsPage() {
  const { user, updateUser } = useAuth();
  const [settings, setSettings] = useState(null);
  const [activeTab, setActiveTab] = useState(0); // 0: All, 1: Account, 2: Notifications, 3: Appearance, 4: Security, 5: Application

  // Form states for password change
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [passError, setPassError] = useState('');

  // Modals & Dialogs
  const [confirmLogoutModal, setConfirmLogoutModal] = useState(false);
  const [confirmResetModal, setConfirmResetModal] = useState(false);
  const [contactSupportModal, setContactSupportModal] = useState(false);
  const [aboutModal, setAboutModal] = useState(false);
  const [termsModal, setTermsModal] = useState(false);

  // Contact support form
  const [supportMessage, setSupportMessage] = useState({ subject: '', message: '' });

  // Snackbars
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  const showToast = (message, severity = 'success') => {
    setToast({ open: true, message, severity });
  };

  useEffect(() => {
    const loaded = getStoredSettings();
    if (user) {
      loaded.account.fullName = user.fullName || loaded.account.fullName;
      loaded.account.email = user.email || loaded.account.email;
      if (user.department) loaded.account.department = user.department;
    }
    setSettings(loaded);
  }, [user]);

  if (!settings) return null;

  // Handlers for nested state changes
  const handleAccountChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      account: { ...prev.account, [field]: value },
    }));
  };

  const handleNotificationToggle = (key, val) => {
    setSettings((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: val },
    }));
  };

  const handlePrivacyToggle = (key, val) => {
    setSettings((prev) => ({
      ...prev,
      privacy: { ...prev.privacy, [key]: val },
    }));
  };

  // Save all settings
  const handleSaveChanges = () => {
    saveUserSettings(settings);
    if (settings.account?.fullName || settings.account?.email) {
      updateUser({
        fullName: settings.account.fullName,
        email: settings.account.email,
        department: settings.account.department,
      });
    }
    showToast('Settings saved successfully!', 'success');
  };

  // Change password handler
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPassError('');

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPassError('New password and confirm password do not match.');
      showToast('Passwords do not match.', 'error');
      return;
    }

    try {
      await updatePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      showToast('Password updated successfully!', 'success');
    } catch (err) {
      setPassError(err.message);
      showToast(err.message, 'error');
    }
  };

  // Terminate active sessions
  const handleTerminateSessions = async () => {
    const active = await terminateOtherSessions();
    setSettings((prev) => ({ ...prev, activeSessions: active }));
    setConfirmLogoutModal(false);
    showToast('All other sessions terminated successfully.', 'info');
  };

  // Reset all settings
  const handleResetSettings = async () => {
    const reset = await resetAllSettings();
    setSettings(reset);
    setConfirmResetModal(false);
    showToast('Settings reset to system defaults.', 'info');
  };

  // Send support message
  const handleSendSupport = (e) => {
    e.preventDefault();
    if (!supportMessage.subject || !supportMessage.message) {
      showToast('Please fill out all support message fields.', 'error');
      return;
    }
    setContactSupportModal(false);
    setSupportMessage({ subject: '', message: '' });
    showToast('Support ticket submitted! Our team will respond within 24 hours.', 'success');
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', pb: 8 }}>
      {/* Page Header */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: tokens.ink, fontSize: { xs: 22, md: 26 } }}>
            Application Settings & Preferences
          </Typography>
          <Typography variant="body2" sx={{ color: tokens.slate, mt: 0.5 }}>
            Manage account security, system notifications, visual theme, privacy controls, and platform preferences.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5}>
          <Button
            variant="outlined"
            startIcon={<FiRotateCcw size={16} />}
            onClick={() => setConfirmResetModal(true)}
            sx={{ borderColor: tokens.line, color: tokens.slate, borderRadius: 2.5 }}
          >
            Reset Defaults
          </Button>
          <Button
            variant="contained"
            startIcon={<FiSave size={16} />}
            onClick={handleSaveChanges}
            sx={{ bgcolor: tokens.teal, '&:hover': { bgcolor: tokens.tealDark }, borderRadius: 2.5, px: 3 }}
          >
            Save Changes
          </Button>
        </Stack>
      </Stack>

      {/* Tabs Navigation Filter */}
      <Box sx={{ mb: 4, borderBottom: `1px solid ${tokens.line}` }}>
        <Tabs
          value={activeTab}
          onChange={(_, val) => setActiveTab(val)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              fontWeight: 600,
              fontSize: 14,
              textTransform: 'none',
              minHeight: 44,
              color: tokens.slate,
              '&.Mui-selected': { color: tokens.teal },
            },
            '& .MuiTabs-indicator': { bgcolor: tokens.teal, height: 3 },
          }}
        >
          <Tab icon={<FiSliders size={16} />} iconPosition="start" label="All Settings" />
          <Tab icon={<FiUser size={16} />} iconPosition="start" label="Account" />
          <Tab icon={<FiBell size={16} />} iconPosition="start" label="Notifications" />
          <Tab icon={<FiSun size={16} />} iconPosition="start" label="Appearance" />
          <Tab icon={<FiShield size={16} />} iconPosition="start" label="Privacy & Security" />
          <Tab icon={<FiGlobe size={16} />} iconPosition="start" label="Application & Help" />
        </Tabs>
      </Box>

      {/* SECTION 1: ACCOUNT SETTINGS */}
      {(activeTab === 0 || activeTab === 1) && (
        <Box>
          <SettingsSection
            title="Account Settings"
            subtitle="Update your personal details, email preferences, and security password"
            icon={FiUser}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: tokens.ink, mb: 2 }}>
                  Profile Details
                </Typography>
                <Stack spacing={2}>
                  <TextField
                    label="Full Name"
                    value={settings.account.fullName}
                    onChange={(e) => handleAccountChange('fullName', e.target.value)}
                    fullWidth
                    size="small"
                  />
                  <TextField
                    label="Email Address"
                    value={settings.account.email}
                    onChange={(e) => handleAccountChange('email', e.target.value)}
                    fullWidth
                    size="small"
                  />
                  <TextField
                    label="Phone Number"
                    value={settings.account.phone}
                    onChange={(e) => handleAccountChange('phone', e.target.value)}
                    fullWidth
                    size="small"
                  />
                  <TextField
                    label="Department / Specialization"
                    value={settings.account.department}
                    onChange={(e) => handleAccountChange('department', e.target.value)}
                    fullWidth
                    size="small"
                  />
                  <TextField
                    label="Short Professional Bio"
                    value={settings.account.bio}
                    onChange={(e) => handleAccountChange('bio', e.target.value)}
                    fullWidth
                    multiline
                    rows={3}
                    size="small"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: tokens.ink, mb: 2 }}>
                  Change Password
                </Typography>
                <Box
                  component="form"
                  onSubmit={handlePasswordSubmit}
                  sx={{ p: 2.5, border: `1px solid ${tokens.line}`, borderRadius: 2.5, bgcolor: 'background.default' }}
                >
                  <Stack spacing={2}>
                    {passError && (
                      <Alert severity="error" sx={{ fontSize: 13, borderRadius: 2 }}>
                        {passError}
                      </Alert>
                    )}
                    <TextField
                      label="Current Password"
                      type={showCurrentPass ? 'text' : 'password'}
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm((p) => ({ ...p, currentPassword: e.target.value }))}
                      fullWidth
                      size="small"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton size="small" onClick={() => setShowCurrentPass(!showCurrentPass)}>
                              {showCurrentPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      label="New Password"
                      type={showNewPass ? 'text' : 'password'}
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))}
                      fullWidth
                      size="small"
                      helperText="Must be at least 8 characters long"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton size="small" onClick={() => setShowNewPass(!showNewPass)}>
                              {showNewPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      label="Confirm New Password"
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm((p) => ({ ...p, confirmPassword: e.target.value }))}
                      fullWidth
                      size="small"
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<FiLock size={15} />}
                      sx={{ bgcolor: tokens.teal, '&:hover': { bgcolor: tokens.tealDark }, alignSelf: 'flex-start' }}
                    >
                      Update Password
                    </Button>
                  </Stack>
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, pt: 3, borderTop: `1px dashed ${tokens.line}` }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: tokens.ink, mb: 1.5 }}>
                Email Preferences
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <SettingsToggle
                    label="Weekly Progress Digest"
                    description="Receive a weekly email summarizing your skill assessment scores and recommendations."
                    checked={settings.account.emailPreferences.weeklyDigest}
                    onChange={(val) =>
                      setSettings((prev) => ({
                        ...prev,
                        account: {
                          ...prev.account,
                          emailPreferences: { ...prev.account.emailPreferences, weeklyDigest: val },
                        },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <SettingsToggle
                    label="Product Updates"
                    description="Get notified when new features, tools, or dataset algorithms are released."
                    checked={settings.account.emailPreferences.productUpdates}
                    onChange={(val) =>
                      setSettings((prev) => ({
                        ...prev,
                        account: {
                          ...prev.account,
                          emailPreferences: { ...prev.account.emailPreferences, productUpdates: val },
                        },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <SettingsToggle
                    label="Marketing & Campus Events"
                    description="Receive invitations to hackathons, webinars, and partner company workshops."
                    checked={settings.account.emailPreferences.marketing}
                    onChange={(val) =>
                      setSettings((prev) => ({
                        ...prev,
                        account: {
                          ...prev.account,
                          emailPreferences: { ...prev.account.emailPreferences, marketing: val },
                        },
                      }))
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          </SettingsSection>
        </Box>
      )}

      {/* SECTION 2: NOTIFICATION SETTINGS */}
      {(activeTab === 0 || activeTab === 2) && (
        <Box>
          <SettingsSection
            title="Notification Settings"
            subtitle="Choose which events trigger instant alerts and email notifications"
            icon={FiBell}
          >
            <Box sx={{ mb: 3, p: 2, borderRadius: 2.5, bgcolor: 'rgba(15,157,140,0.06)', border: `1px solid ${tokens.teal}` }}>
              <SettingsToggle
                label="Master Email Notifications Switch"
                description="Turn on or off all email notifications across the platform."
                checked={settings.notifications.emailNotificationsMaster}
                onChange={(val) => handleNotificationToggle('emailNotificationsMaster', val)}
                badgeText="Master Control"
                badgeColor="primary"
              />
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: tokens.ink, mb: 1.5 }}>
                  Assessment Notifications
                </Typography>
                <Stack spacing={1.5}>
                  <SettingsToggle
                    label="Assessment Reminders"
                    description="Remind me before scheduled domain and coding skill tests."
                    checked={settings.notifications.assessmentReminders}
                    onChange={(val) => handleNotificationToggle('assessmentReminders', val)}
                  />
                  <SettingsToggle
                    label="Assessment Results Ready"
                    description="Alert when test scoring and detailed analysis are available."
                    checked={settings.notifications.assessmentResults}
                    onChange={(val) => handleNotificationToggle('assessmentResults', val)}
                  />
                  <SettingsToggle
                    label="New Assessment Assigned"
                    description="Notify when department faculty assigns a mandatory quiz."
                    checked={settings.notifications.newAssessments}
                    onChange={(val) => handleNotificationToggle('newAssessments', val)}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: tokens.ink, mb: 1.5 }}>
                  Career & Placement Alerts
                </Typography>
                <Stack spacing={1.5}>
                  <SettingsToggle
                    label="Career Recommendations"
                    description="Notify when new high-match career paths are discovered."
                    checked={settings.notifications.careerMatches}
                    onChange={(val) => handleNotificationToggle('careerMatches', val)}
                  />
                  <SettingsToggle
                    label="Interview & Company Alerts"
                    description="Get notified about company campus recruitment drives and eligibility changes."
                    checked={settings.notifications.interviewAlerts}
                    onChange={(val) => handleNotificationToggle('interviewAlerts', val)}
                  />
                  <SettingsToggle
                    label="Placement Prediction Updates"
                    description="Notify when AI recalculates placement probability score."
                    checked={settings.notifications.placementPredictionUpdates}
                    onChange={(val) => handleNotificationToggle('placementPredictionUpdates', val)}
                  />
                </Stack>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, pt: 2, borderTop: `1px dashed ${tokens.line}` }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: tokens.ink, mb: 1.5 }}>
                System & Security Alerts
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <SettingsToggle
                    label="Security & Session Alerts"
                    description="Instant alert on new login from an unrecognized device or IP."
                    checked={settings.notifications.securityAlerts}
                    onChange={(val) => handleNotificationToggle('securityAlerts', val)}
                    badgeText="Recommended"
                    badgeColor="success"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <SettingsToggle
                    label="System Maintenance & Updates"
                    description="Alert regarding scheduled downtime or major platform updates."
                    checked={settings.notifications.systemUpdates}
                    onChange={(val) => handleNotificationToggle('systemUpdates', val)}
                  />
                </Grid>
              </Grid>
            </Box>
          </SettingsSection>
        </Box>
      )}

      {/* SECTION 3: APPEARANCE */}
      {(activeTab === 0 || activeTab === 3) && (
        <Box>
          <SettingsSection
            title="Appearance & Theme"
            subtitle="Customize light/dark visual theme and density layout preferences"
            icon={FiSun}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: tokens.ink, mb: 1.5 }}>
                  Theme Mode
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box
                      onClick={() =>
                        setSettings((prev) => ({
                          ...prev,
                          appearance: { ...prev.appearance, theme: 'light' },
                        }))
                      }
                      sx={{
                        p: 2.5,
                        borderRadius: 3,
                        border: `2px solid ${settings.appearance.theme === 'light' ? tokens.teal : tokens.line}`,
                        bgcolor: '#ffffff',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.2s',
                        boxShadow: settings.appearance.theme === 'light' ? '0 4px 12px rgba(15,157,140,0.15)' : 'none',
                      }}
                    >
                      <FiSun size={28} color={tokens.teal} />
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, mt: 1, color: tokens.ink }}>
                        Light Mode
                      </Typography>
                      <Typography variant="caption" sx={{ color: tokens.slate }}>
                        Clean paper palette with high contrast
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box
                      onClick={() =>
                        setSettings((prev) => ({
                          ...prev,
                          appearance: { ...prev.appearance, theme: 'dark' },
                        }))
                      }
                      sx={{
                        p: 2.5,
                        borderRadius: 3,
                        border: `2px solid ${settings.appearance.theme === 'dark' ? tokens.teal : tokens.line}`,
                        bgcolor: '#101828',
                        color: '#ffffff',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.2s',
                        boxShadow: settings.appearance.theme === 'dark' ? '0 4px 12px rgba(15,157,140,0.15)' : 'none',
                      }}
                    >
                      <FiMoon size={28} color="#4FBBAE" />
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, mt: 1, color: '#ffffff' }}>
                        Dark Mode
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        Sleek ink navy workspace dark palette
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: tokens.ink, mb: 1.5 }}>
                  Layout Density
                </Typography>
                <Stack spacing={1.5}>
                  <Box
                    onClick={() =>
                      setSettings((prev) => ({
                        ...prev,
                        appearance: { ...prev.appearance, density: 'comfortable' },
                      }))
                    }
                    sx={{
                      p: 2,
                      borderRadius: 2.5,
                      border: `1.5px solid ${settings.appearance.density === 'comfortable' ? tokens.teal : tokens.line}`,
                      bgcolor: settings.appearance.density === 'comfortable' ? 'rgba(15,157,140,0.04)' : 'background.paper',
                      cursor: 'pointer',
                    }}
                  >
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: tokens.ink }}>
                          Comfortable Layout
                        </Typography>
                        <Typography variant="caption" sx={{ color: tokens.slate }}>
                          Generous spacing and padding ideal for desktop review.
                        </Typography>
                      </Box>
                      {settings.appearance.density === 'comfortable' && <FiCheckCircle size={18} color={tokens.teal} />}
                    </Stack>
                  </Box>

                  <Box
                    onClick={() =>
                      setSettings((prev) => ({
                        ...prev,
                        appearance: { ...prev.appearance, density: 'compact' },
                      }))
                    }
                    sx={{
                      p: 2,
                      borderRadius: 2.5,
                      border: `1.5px solid ${settings.appearance.density === 'compact' ? tokens.teal : tokens.line}`,
                      bgcolor: settings.appearance.density === 'compact' ? 'rgba(15,157,140,0.04)' : 'background.paper',
                      cursor: 'pointer',
                    }}
                  >
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: tokens.ink }}>
                          Compact Layout
                        </Typography>
                        <Typography variant="caption" sx={{ color: tokens.slate }}>
                          Tight line heights & high data density for fast navigation.
                        </Typography>
                      </Box>
                      {settings.appearance.density === 'compact' && <FiCheckCircle size={18} color={tokens.teal} />}
                    </Stack>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </SettingsSection>
        </Box>
      )}

      {/* SECTION 4: PRIVACY & SECURITY */}
      {(activeTab === 0 || activeTab === 4) && (
        <Box>
          <SettingsSection
            title="Privacy & Security"
            subtitle="Manage profile visibility, data sharing consents, and active session logins"
            icon={FiShield}
          >
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: tokens.ink, mb: 1.5 }}>
                  Profile Visibility
                </Typography>
                <FormControl fullWidth size="small">
                  <InputLabel>Who can view your profile</InputLabel>
                  <Select
                    value={settings.privacy.profileVisibility}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        privacy: { ...prev.privacy, profileVisibility: e.target.value },
                      }))
                    }
                    label="Who can view your profile"
                  >
                    <MenuItem value="public">Public (Everyone on SkillTrace AI)</MenuItem>
                    <MenuItem value="recruiters">Verified Partner Recruiters Only</MenuItem>
                    <MenuItem value="private">Private (Only You & Faculty Admin)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: tokens.ink, mb: 1.5 }}>
                  Data Privacy Preferences
                </Typography>
                <Stack spacing={1.5}>
                  <SettingsToggle
                    label="AI Profile Indexing"
                    description="Allow AI model to analyze portfolio to suggest high-matching placement tracks."
                    checked={settings.privacy.aiIndexing}
                    onChange={(val) => handlePrivacyToggle('aiIndexing', val)}
                  />
                  <SettingsToggle
                    label="Anonymous Placement Benchmarking"
                    description="Contribute anonymized skill score data to university research reports."
                    checked={settings.privacy.anonymousPlacementStats}
                    onChange={(val) => handlePrivacyToggle('anonymousPlacementStats', val)}
                  />
                </Stack>
              </Grid>
            </Grid>

            {/* Active Sessions */}
            <Box sx={{ pt: 3, borderTop: `1px dashed ${tokens.line}` }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: tokens.ink }}>
                    Active Login Sessions
                  </Typography>
                  <Typography variant="caption" sx={{ color: tokens.slate }}>
                    Devices currently signed into your SkillTrace AI account
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<FiLogOut size={14} />}
                  onClick={() => setConfirmLogoutModal(true)}
                >
                  Log Out All Other Sessions
                </Button>
              </Stack>

              <Stack spacing={1.5}>
                {settings.activeSessions.map((session) => (
                  <Box
                    key={session.id}
                    sx={{
                      p: 2,
                      borderRadius: 2.5,
                      border: `1px solid ${tokens.line}`,
                      bgcolor: session.isCurrent ? 'rgba(15,157,140,0.04)' : 'background.paper',
                    }}
                  >
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Stack direction="row" alignItems="center" spacing={1.5}>
                        {session.device.includes('iPhone') ? (
                          <FiSmartphone size={20} color={tokens.teal} />
                        ) : (
                          <FiUser size={20} color={tokens.teal} />
                        )}
                        <Box>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography variant="body2" sx={{ fontWeight: 700, color: tokens.ink }}>
                              {session.device}
                            </Typography>
                            {session.isCurrent && (
                              <Chip label="Current Session" size="small" color="primary" sx={{ height: 18, fontSize: 10 }} />
                            )}
                          </Stack>
                          <Typography variant="caption" sx={{ color: tokens.slate, display: 'block' }}>
                            {session.location} · IP: {session.ip}
                          </Typography>
                        </Box>
                      </Stack>
                      <Typography variant="caption" sx={{ fontWeight: 600, color: tokens.slate }}>
                        {session.lastActive}
                      </Typography>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Box>
          </SettingsSection>
        </Box>
      )}

      {/* SECTION 5: APPLICATION & HELP */}
      {(activeTab === 0 || activeTab === 5) && (
        <Box>
          <SettingsSection
            title="Application & Help Support"
            subtitle="Platform settings, documentation, terms of service, and technical help desk"
            icon={FiGlobe}
          >
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: tokens.ink, mb: 1.5 }}>
                  Platform Language
                </Typography>
                <FormControl fullWidth size="small">
                  <InputLabel>Interface Language</InputLabel>
                  <Select
                    value={settings.application.language}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        application: { ...prev.application, language: e.target.value },
                      }))
                    }
                    label="Interface Language"
                  >
                    <MenuItem value="en">English (US / UK)</MenuItem>
                    <MenuItem value="hi">Hindi (हिंदी)</MenuItem>
                    <MenuItem value="es">Spanish (Español)</MenuItem>
                    <MenuItem value="fr">French (Français)</MenuItem>
                    <MenuItem value="de">German (Deutsch)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: tokens.ink, mb: 1.5 }}>
                  Quick Support & Actions
                </Typography>
                <Stack direction="row" spacing={1.5} flexWrap="wrap" gap={1}>
                  <Button
                    variant="outlined"
                    startIcon={<FiHelpCircle size={15} />}
                    onClick={() => setContactSupportModal(true)}
                    sx={{ borderColor: tokens.line }}
                  >
                    Contact Support
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<FiInfo size={15} />}
                    onClick={() => setAboutModal(true)}
                    sx={{ borderColor: tokens.line }}
                  >
                    About SkillTrace AI
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<FiBookOpen size={15} />}
                    onClick={() => setTermsModal(true)}
                    sx={{ borderColor: tokens.line }}
                  >
                    Terms & Privacy
                  </Button>
                </Stack>
              </Grid>
            </Grid>

            {/* FAQ Accordion */}
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: tokens.ink, mb: 1.5 }}>
              Frequently Asked Questions (FAQ)
            </Typography>
            <Stack spacing={1}>
              <Accordion sx={{ border: `1px solid ${tokens.line}`, boxShadow: 'none', '&:before': { display: 'none' }, borderRadius: '12px !important' }}>
                <AccordionSummary expandIcon={<FiChevronDown />}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    How is my placement readiness score calculated?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="caption" sx={{ color: tokens.slate, lineHeight: 1.5 }}>
                    Your placement readiness score is computed using AI evaluation algorithms that weigh your cumulative CGPA, verified skill matrix, online assessment test scores, portfolio project quality, and certification benchmarks.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion sx={{ border: `1px solid ${tokens.line}`, boxShadow: 'none', '&:before': { display: 'none' }, borderRadius: '12px !important' }}>
                <AccordionSummary expandIcon={<FiChevronDown />}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Who can see my assessment scores and resume links?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="caption" sx={{ color: tokens.slate, lineHeight: 1.5 }}>
                    Depending on your Profile Visibility setting (Public, Recruiters Only, or Private), verified recruiters and placement officers can view your scores to match you with job openings.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion sx={{ border: `1px solid ${tokens.line}`, boxShadow: 'none', '&:before': { display: 'none' }, borderRadius: '12px !important' }}>
                <AccordionSummary expandIcon={<FiChevronDown />}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Can I export my career reports to PDF or JSON?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="caption" sx={{ color: tokens.slate, lineHeight: 1.5 }}>
                    Yes! You can generate comprehensive PDF reports directly from the Reports page anytime.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Stack>
          </SettingsSection>
        </Box>
      )}

      {/* DIALOG 1: Confirm Terminate Sessions */}
      <Dialog open={confirmLogoutModal} onClose={() => setConfirmLogoutModal(false)}>
        <DialogTitle sx={{ fontWeight: 700 }}>Terminate Other Sessions?</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: tokens.slate }}>
            This action will sign out your SkillTrace AI account from all other devices except this current session. Are you sure you want to proceed?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setConfirmLogoutModal(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleTerminateSessions}>
            Terminate Sessions
          </Button>
        </DialogActions>
      </Dialog>

      {/* DIALOG 2: Confirm Reset Defaults */}
      <Dialog open={confirmResetModal} onClose={() => setConfirmResetModal(false)}>
        <DialogTitle sx={{ fontWeight: 700 }}>Reset Settings to Default?</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: tokens.slate }}>
            This will reset all your notification, appearance, and application preferences back to initial system defaults. Your profile account data will not be erased.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setConfirmResetModal(false)}>Cancel</Button>
          <Button variant="contained" color="warning" onClick={handleResetSettings}>
            Reset to Defaults
          </Button>
        </DialogActions>
      </Dialog>

      {/* DIALOG 3: Contact Support */}
      <Dialog open={contactSupportModal} onClose={() => setContactSupportModal(false)} maxWidth="sm" fullWidth>
        <Box component="form" onSubmit={handleSendSupport}>
          <DialogTitle sx={{ fontWeight: 700 }}>Contact SkillTrace AI Support</DialogTitle>
          <DialogContent>
            <Stack spacing= {2} sx={{ mt: 1 }}>
              <TextField
                label="Subject"
                value={supportMessage.subject}
                onChange={(e) => setSupportMessage((p) => ({ ...p, subject: e.target.value }))}
                fullWidth
                size="small"
                required
              />
              <TextField
                label="Describe your issue or feedback"
                value={supportMessage.message}
                onChange={(e) => setSupportMessage((p) => ({ ...p, message: e.target.value }))}
                fullWidth
                multiline
                rows={4}
                required
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={() => setContactSupportModal(false)}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: tokens.teal }}>
              Submit Ticket
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* DIALOG 4: About SkillTrace AI */}
      <Dialog open={aboutModal} onClose={() => setAboutModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>About SkillTrace AI</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: 3,
                  bgcolor: tokens.teal,
                  color: '#fff',
                  display: 'grid',
                  placeItems: 'center',
                  fontWeight: 800,
                  fontSize: 24,
                  mx: 'auto',
                  mb: 1,
                }}
              >
                S
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                SkillTrace AI Platform
              </Typography>
              <Typography variant="caption" sx={{ color: tokens.slate }}>
                Version 2.4.0 (Enterprise SaaS Edition)
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: tokens.slate, lineHeight: 1.6 }}>
              SkillTrace AI is an end-to-end career intelligence and skill benchmarking platform designed for higher education institutions. It bridges the gap between student academic skills and industry recruitment demands through AI portfolio parsing, real-time assessment, and placement prediction analytics.
            </Typography>
            <Divider />
            <Grid container spacing={1} sx={{ fontSize: 12 }}>
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: tokens.slate }}>Build Environment:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>React + Vite + MUI</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: tokens.slate }}>API Architecture:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>FastAPI + MongoDB (Ready)</Typography>
              </Grid>
            </Grid>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button variant="contained" onClick={() => setAboutModal(false)} sx={{ bgcolor: tokens.teal }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* DIALOG 5: Terms & Privacy */}
      <Dialog open={termsModal} onClose={() => setTermsModal(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Terms of Service & Privacy Policy</DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
            1. User Data Protection & Confidentiality
          </Typography>
          <Typography variant="body2" sx={{ color: tokens.slate, mb: 2, fontSize: 13, lineHeight: 1.5 }}>
            SkillTrace AI respects your data privacy. Student educational credentials, assessment performance records, and project repositories are securely stored and accessible only to authorized university administrators and verified corporate recruiters.
          </Typography>

          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
            2. Intellectual Property & AI Models
          </Typography>
          <Typography variant="body2" sx={{ color: tokens.slate, mb: 2, fontSize: 13, lineHeight: 1.5 }}>
            All content, algorithms, placement predictions, and analytics models remain the intellectual property of SkillTrace AI. Student project links and uploaded portfolio data remain owned by the respective student.
          </Typography>

          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
            3. Account Security & Responsibilities
          </Typography>
          <Typography variant="body2" sx={{ color: tokens.slate, fontSize: 13, lineHeight: 1.5 }}>
            Users are responsible for maintaining secret passwords and monitoring active session logins. Promptly terminate unrecognized active sessions via the Privacy & Security tab if suspicious activity is detected.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button variant="contained" onClick={() => setTermsModal(false)} sx={{ bgcolor: tokens.teal }}>
            I Understand
          </Button>
        </DialogActions>
      </Dialog>

      {/* Feedback Toast */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setToast((prev) => ({ ...prev, open: false }))}
          severity={toast.severity}
          sx={{ borderRadius: 2.5, fontWeight: 600 }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
