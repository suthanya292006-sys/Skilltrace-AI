import { createTheme } from '@mui/material/styles';

// SkillTrace AI design tokens
// Ink Navy #101828 — dark surfaces / primary text
// Paper #F7F8FA — light background
// Signal Teal #0F9D8C — primary brand / growth accent
// Amber Spark #F5A623 — achievement / score highlight
// Slate #667085 — secondary text
// Line #E4E7EC — borders / dividers

export const tokens = {
  ink: '#101828',
  paper: '#F7F8FA',
  teal: '#0F9D8C',
  tealDark: '#0B7A6D',
  amber: '#F5A623',
  slate: '#667085',
  line: '#E4E7EC',
  danger: '#E4572E',
  surface: '#FFFFFF',
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: tokens.teal,
      dark: tokens.tealDark,
      light: '#4FBBAE',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: tokens.amber,
      contrastText: tokens.ink,
    },
    error: {
      main: tokens.danger,
    },
    background: {
      default: tokens.paper,
      paper: tokens.surface,
    },
    text: {
      primary: tokens.ink,
      secondary: tokens.slate,
    },
    divider: tokens.line,
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
    h1: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, letterSpacing: '-0.02em' },
    h2: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, letterSpacing: '-0.02em' },
    h3: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, letterSpacing: '-0.01em' },
    h4: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },
    h5: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
    overline: { fontFamily: '"IBM Plex Mono", monospace', letterSpacing: '0.08em' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10, paddingTop: 10, paddingBottom: 10 },
        containedPrimary: {
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined' },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: `1px solid ${tokens.line}`,
          boxShadow: 'none',
        },
      },
    },
  },
});

export default theme;
