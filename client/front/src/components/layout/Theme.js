// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',  // switch to 'dark' for dark mode
    primary: { main: '#556cd6' },
    secondary: { main: '#19857b' },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiPaper: {
      defaultProps: { elevation: 3 },
    },
    MuiDivider: {
      styleOverrides: {
        root: { backgroundColor: '#e0e0e0' },
      },
    },
  },
});

export default theme;
