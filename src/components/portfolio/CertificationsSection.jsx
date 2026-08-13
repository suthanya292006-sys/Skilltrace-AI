import { useRef, useState } from 'react';
import { Box, Typography, Stack, Button, IconButton, Chip } from '@mui/material';
import { FiAward, FiPlus, FiTrash2 } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import { tokens } from '../../styles/theme';

const initialCerts = [
  { name: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', year: '2025' },
  { name: 'Meta Front-End Developer', issuer: 'Coursera', year: '2025' },
];

export default function CertificationsSection() {
  const [certs, setCerts] = useState(initialCerts);
  const inputRef = useRef(null);

  const handleUpload = (fileList) => {
    const f = fileList?.[0];
    if (!f) return;
    setCerts((c) => [...c, { name: f.name.replace(/\.[^.]+$/, ''), issuer: 'Pending review', year: `${new Date().getFullYear()}` }]);
  };

  const removeCert = (i) => setCerts((c) => c.filter((_, idx) => idx !== i));

  return (
    <DashboardCard
      title="Certifications"
      subtitle={`${certs.length} uploaded`}
      icon={FiAward}
      action={
        <Button size="small" startIcon={<FiPlus size={15} />} onClick={() => inputRef.current?.click()}>
          Upload certificate
          <input ref={inputRef} type="file" hidden onChange={(e) => handleUpload(e.target.files)} />
        </Button>
      }
    >
      <Stack spacing={1.4}>
        {certs.map((c, i) => (
          <Stack
            key={i}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ border: `1px solid ${tokens.line}`, borderRadius: 2.5, px: 1.8, py: 1.2 }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ minWidth: 0 }}>
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: '9px',
                  bgcolor: 'rgba(245,166,35,0.14)',
                  color: tokens.amber,
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0,
                }}
              >
                <FiAward size={16} />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="body2" noWrap sx={{ fontWeight: 600, maxWidth: 240 }}>
                  {c.name}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {c.issuer}
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Chip label={c.year} size="small" sx={{ bgcolor: 'action.hover', fontSize: 11 }} />
              <IconButton size="small" onClick={() => removeCert(i)}>
                <FiTrash2 size={14} />
              </IconButton>
            </Stack>
          </Stack>
        ))}
        {certs.length === 0 && (
          <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', py: 2 }}>
            No certificates yet — upload your first one.
          </Typography>
        )}
      </Stack>
    </DashboardCard>
  );
}
