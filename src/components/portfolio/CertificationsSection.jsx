import { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Stack, Button, IconButton, Chip, Skeleton, Menu, MenuItem } from '@mui/material';
import { FiAward, FiPlus, FiTrash2, FiExternalLink, FiMoreVertical, FiEdit2 } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import CertificationDialog from './CertificationDialog';
import {
  getStudentProfile,
  addStudentCertification,
  updateStudentCertification,
  deleteStudentCertification,
} from '../../services/profileService';
import { tokens } from '../../styles/theme';

function CertMenu({ onEdit, onDelete }) {
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
          <FiEdit2 size={14} style={{ marginRight: 8 }} /> Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            onDelete();
            setAnchorEl(null);
          }}
          sx={{ color: tokens.danger }}
        >
          <FiTrash2 size={14} style={{ marginRight: 8 }} /> Delete
        </MenuItem>
      </Menu>
    </>
  );
}

export default function CertificationsSection() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const loadCerts = useCallback(async () => {
    setLoading(true);
    try {
      const { profile } = await getStudentProfile();
      setCerts(profile.certifications || []);
    } catch (err) {
      console.error('Error loading certifications:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCerts();
  }, [loadCerts]);

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
      const res = await addStudentCertification(data);
      setCerts(res.certifications);
    } else {
      const targetCert = certs[editIndex];
      if (targetCert && targetCert.id) {
        const res = await updateStudentCertification(targetCert.id, data);
        setCerts(res.certifications);
      }
    }
  };

  const handleDelete = async (index) => {
    const targetCert = certs[index];
    if (targetCert && targetCert.id) {
      const res = await deleteStudentCertification(targetCert.id);
      setCerts(res.certifications);
    }
  };

  return (
    <DashboardCard
      title="Certifications"
      subtitle={`${certs.length} certificate${certs.length === 1 ? '' : 's'} added`}
      icon={FiAward}
      action={
        <Button size="small" startIcon={<FiPlus size={15} />} onClick={openAdd} sx={{ fontWeight: 700 }}>
          + Add Cert
        </Button>
      }
    >
      {loading ? (
        <Stack spacing={1.4}>
          <Skeleton variant="rounded" height={60} sx={{ borderRadius: 2.5 }} />
          <Skeleton variant="rounded" height={60} sx={{ borderRadius: 2.5 }} />
        </Stack>
      ) : certs.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4, px: 2, bgcolor: 'background.default', borderRadius: 2.5, border: `1.5px dashed ${tokens.line}` }}>
          <FiAward size={32} color={tokens.amber} style={{ marginBottom: 8, opacity: 0.8 }} />
          <Typography variant="body2" sx={{ fontWeight: 600, color: tokens.ink, mb: 0.5 }}>
            No certifications added yet.
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>
            Click '+ Add Cert' to add your first certificate.
          </Typography>
          <Button variant="outlined" size="small" startIcon={<FiPlus size={14} />} onClick={openAdd} sx={{ fontWeight: 700 }}>
            + Add Cert
          </Button>
        </Box>
      ) : (
        <Stack spacing={1.4}>
          {certs.map((c, i) => {
            const titleText = c.name || c.title || 'Certificate';
            const issuerText = c.organization || c.issuer || '';
            const dateText = c.issueDate || c.year || '';
            const link = c.credentialLink || c.verificationUrl || c.fileUrl || '';

            return (
              <Stack
                key={c.id || i}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  border: `1px solid ${tokens.line}`,
                  borderRadius: 2.5,
                  px: 1.8,
                  py: 1.2,
                  minWidth: 0,
                  overflow: 'hidden',
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ minWidth: 0, flex: 1, pr: 1 }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: '9px',
                      bgcolor: 'rgba(245,166,35,0.14)',
                      color: tokens.amber,
                      display: 'grid',
                      placeItems: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <FiAward size={18} />
                  </Box>
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, wordBreak: 'break-word', lineHeight: 1.3 }}>
                      {titleText}
                    </Typography>
                    {issuerText && (
                      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', wordBreak: 'break-word' }}>
                        {issuerText}
                      </Typography>
                    )}
                    {c.credentialId && (
                      <Typography variant="caption" sx={{ color: tokens.slate, fontSize: 11, display: 'block' }}>
                        ID: {c.credentialId}
                      </Typography>
                    )}
                  </Box>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center" sx={{ flexShrink: 0 }}>
                  {dateText && (
                    <Chip label={dateText} size="small" sx={{ bgcolor: 'action.hover', fontSize: 11, fontWeight: 600 }} />
                  )}
                  {link && (
                    <IconButton
                      size="small"
                      component="a"
                      href={link.startsWith('http') ? link : `https://${link}`}
                      target="_blank"
                      rel="noreferrer"
                      sx={{ color: tokens.tealDark }}
                    >
                      <FiExternalLink size={14} />
                    </IconButton>
                  )}
                  <CertMenu onEdit={() => openEdit(i)} onDelete={() => handleDelete(i)} />
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      )}

      <CertificationDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        initialValue={editIndex !== null ? certs[editIndex] : null}
      />
    </DashboardCard>
  );
}
