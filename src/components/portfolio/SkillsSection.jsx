import { useState, useEffect, useCallback } from 'react';
import { Box, Chip, TextField, Stack, InputAdornment, Typography, Skeleton } from '@mui/material';
import { FiPlus, FiTag } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import { getStudentProfile, addStudentSkill, removeStudentSkill } from '../../services/profileService';
import { tokens } from '../../styles/theme';

export default function SkillsSection() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState('');

  const loadSkills = useCallback(async () => {
    setLoading(true);
    try {
      const { profile } = await getStudentProfile();
      setSkills(profile.skills || []);
    } catch (err) {
      console.error('Error loading skills:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSkills();
  }, [loadSkills]);

  const handleAddSkill = async () => {
    const v = value.trim();
    if (!v) return;
    const exists = skills.some((s) => s.name.toLowerCase() === v.toLowerCase());
    if (!exists) {
      const skillObj = { name: v, category: 'General', level: 'Intermediate' };
      const res = await addStudentSkill(skillObj);
      setSkills(res.skills || []);
    }
    setValue('');
  };

  const handleRemoveSkill = async (skillName) => {
    const res = await removeStudentSkill(skillName);
    setSkills(res.skills || []);
  };

  return (
    <DashboardCard title="Skills" subtitle="Add every skill you can back up" icon={FiTag}>
      <TextField
        fullWidth
        size="small"
        placeholder="Type a skill and press Enter"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleAddSkill();
          }
        }}
        sx={{ mb: 2 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Box
                component="button"
                type="button"
                onClick={handleAddSkill}
                sx={{
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  color: tokens.teal,
                  p: 0.5,
                  '&:hover': { color: tokens.tealDark },
                }}
              >
                <FiPlus size={18} />
              </Box>
            </InputAdornment>
          ),
        }}
      />

      {loading ? (
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Skeleton variant="rounded" width={80} height={32} />
          <Skeleton variant="rounded" width={100} height={32} />
        </Stack>
      ) : skills.length === 0 ? (
        <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic', py: 1 }}>
          No skills added yet. Type a skill and press Enter to add your first skill.
        </Typography>
      ) : (
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {skills.map((skillObj) => {
            const skillName = typeof skillObj === 'string' ? skillObj : skillObj.name;
            return (
              <Chip
                key={skillName}
                label={skillName}
                onDelete={() => handleRemoveSkill(skillName)}
                sx={{
                  bgcolor: 'rgba(15,157,140,0.1)',
                  color: tokens.tealDark,
                  fontWeight: 600,
                  fontSize: 12.5,
                  py: 1.8,
                  maxWidth: '100%',
                  '& .MuiChip-label': { wordBreak: 'break-word' },
                }}
              />
            );
          })}
        </Stack>
      )}
    </DashboardCard>
  );
}
