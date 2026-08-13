import { useState } from 'react';
import { Box, Chip, TextField, Stack, InputAdornment } from '@mui/material';
import { FiPlus, FiTag } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';

const initialSkills = ['React', 'Node.js', 'Python', 'DBMS', 'Data Structures', 'Git'];

export default function SkillsSection() {
  const [skills, setSkills] = useState(initialSkills);
  const [value, setValue] = useState('');

  const addSkill = () => {
    const v = value.trim();
    if (v && !skills.includes(v)) {
      setSkills((s) => [...s, v]);
    }
    setValue('');
  };

  const removeSkill = (skill) => setSkills((s) => s.filter((x) => x !== skill));

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
            addSkill();
          }
        }}
        sx={{ mb: 2 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Box
                component="button"
                type="button"
                onClick={addSkill}
                sx={{
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  color: 'primary.main',
                }}
              >
                <FiPlus size={16} />
              </Box>
            </InputAdornment>
          ),
        }}
      />
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {skills.map((skill) => (
          <Chip
            key={skill}
            label={skill}
            onDelete={() => removeSkill(skill)}
            sx={{ bgcolor: 'rgba(15,157,140,0.1)', color: 'primary.dark', fontWeight: 500 }}
          />
        ))}
      </Stack>
    </DashboardCard>
  );
}
