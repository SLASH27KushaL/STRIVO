import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { CssBaseline } from '@mui/material'; // ✅ Corrected import

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CssBaseline />  {/* ✅ Correct component */}
    <App />
  </StrictMode>
);
