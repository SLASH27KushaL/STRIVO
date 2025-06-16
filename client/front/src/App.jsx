import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectRoute } from '../src/components/auth/ProtectRoute';

// Lazy-loaded pages
const Home   = lazy(() => import('./pages/Home'));
const Login  = lazy(() => import('./pages/Login'));
const Chat   = lazy(() => import('./pages/Chat'));
const Groups = lazy(() => import('./pages/Groups'));

let user = true;

const LoadingFallback = () => (
  <div style={{
    width: '100vw', 
    height: '100vh', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem'
  }}>
    Loading…
  </div>
);

const App = () => (
  <BrowserRouter>
    {/* Wrap lazy routes in Suspense */}
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectRoute user={user}>
              <Home />
            </ProtectRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/chat/:chatId"
          element={
            <ProtectRoute user={user}>
              <Chat />
            </ProtectRoute>
          }
        />
        <Route
          path="/groups"
          element={
            <ProtectRoute user={user}>
              <Groups />
            </ProtectRoute>
          }
        />
        <Route path="*" element={<h1>404 – Not Found</h1>} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;
