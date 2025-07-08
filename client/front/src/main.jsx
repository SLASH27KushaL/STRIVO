// src/main.jsx
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/layout/Theme.js';
import { AuthProvider } from './Context/AuthContext.jsx';  // ← import your context

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>       {/* ← wrap here */}
        <App />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
