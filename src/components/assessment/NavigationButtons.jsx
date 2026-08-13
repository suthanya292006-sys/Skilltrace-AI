import { Button, Stack } from '@mui/material';

export default function NavigationButtons({ onPrevious, onNext, onMark, onClear, onSubmit, isFirst, isLast }) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2}>
        <Button variant="outlined" onClick={onPrevious} disabled={isFirst}>
          Previous
        </Button>
        <Button variant="outlined" onClick={onNext} disabled={isLast}>
          Next
        </Button>
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2}>
        <Button variant="outlined" color="secondary" onClick={onMark}>
          Mark for Review
        </Button>
        <Button variant="outlined" onClick={onClear}>
          Clear Response
        </Button>
        <Button variant="contained" onClick={onSubmit}>
          Submit
        </Button>
      </Stack>
    </Stack>
  );
}
