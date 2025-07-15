import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Avatar,
  IconButton,
  Stack,
  Grid,
  Fade,
  Slide,
  Paper,
  Divider,
  Chip,
  Container,
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import {
  PhotoCamera as PhotoCameraIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  AccountCircle as AccountCircleIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';
import { AuthContext } from '../Context/AuthContext';

const AuthForm = () => {
  const { login, signup, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    bio: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePicture: null,
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const theme = useTheme();

  // Where to redirect after auth
  const from = location.state?.from?.pathname || '/';

  const resetForm = () => {
    setFormData({
      name: '',
      username: '',
      bio: '',
      email: '',
      password: '',
      confirmPassword: '',
      profilePicture: null,
    });
    setError('');
  };

  const handleToggle = () => {
    setIsLogin(prev => !prev);
    resetForm();
  };

  const handleChange = e => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      if (isLogin) {
        // just username/password
        await login({
          username: formData.username,
          password: formData.password,
        });
      } else {
        // confirm match
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords don't match");
          return;
        }

        // call signup with JS object; context builds the FormData
        await signup({
          name:       formData.name,
          username:   formData.username,
          bio:        formData.bio,
          email:      formData.email,
          password:   formData.password,
          avatarFile: formData.profilePicture,
        });
      }

      resetForm();
      navigate(from, { replace: true });
    } catch (err) {
      // signup/login throws Error(msg)
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 4,
        background: `linear-gradient(135deg, ${alpha(
          theme.palette.primary.main,
          0.15
        )} 0%, ${alpha(theme.palette.secondary.main, 0.15)} 100%)`,
      }}
    >
      <Container maxWidth="sm">
        <Fade in timeout={800}>
          <Card
            sx={{
              width: '100%',
              background: alpha(theme.palette.background.paper, 0.9),
              backdropFilter: 'blur(12px)',
              borderRadius: 2,
              boxShadow: 3,
              '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
            }}
          >
            <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
              <Box textAlign="center" mb={4}>
                <Slide direction="down" in timeout={600}>
                  <Box>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 1,
                      }}
                    >
                      {isLogin ? 'Welcome Back' : 'Join Us'}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.7 }}>
                      {isLogin
                        ? 'Sign in to continue your journey'
                        : 'Create your account & start exploring!'}
                    </Typography>
                  </Box>
                </Slide>
              </Box>

              {error && (
                <Typography color="error" align="center" mb={2}>
                  {error}
                </Typography>
              )}

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Stack spacing={3}>
                  {!isLogin && (
                    <Slide direction="up" in timeout={500}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          bgcolor: alpha(theme.palette.primary.main, 0.08),
                          borderRadius: 2,
                        }}
                      >
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={4} sm={3} textAlign="center">
                            <Box position="relative" display="inline-block">
                              <Avatar
                                src={
                                  formData.profilePicture
                                    ? URL.createObjectURL(formData.profilePicture)
                                    : ''
                                }
                                sx={{
                                  width: 64,
                                  height: 64,
                                  border: `3px solid ${theme.palette.primary.light}`,
                                  '&:hover': {
                                    boxShadow: `0 0 0 4px ${alpha(
                                      theme.palette.primary.main,
                                      0.3
                                    )}`,
                                  },
                                }}
                              >
                                <PersonIcon />
                              </Avatar>
                              <label htmlFor="profilePicture-upload">
                                <input
                                  accept="image/*"
                                  id="profilePicture-upload"
                                  type="file"
                                  name="profilePicture"
                                  onChange={handleChange}
                                  style={{ display: 'none' }}
                                  disabled={submitting || loading}
                                />
                                <IconButton
                                  component="span"
                                  sx={{
                                    position: 'absolute',
                                    bottom: -6,
                                    right: -6,
                                    bgcolor: theme.palette.primary.main,
                                    color: '#fff',
                                    p: 0.5,
                                  }}
                                  disabled={submitting || loading}
                                >
                                  <PhotoCameraIcon fontSize="small" />
                                </IconButton>
                              </label>
                            </Box>
                          </Grid>
                          <Grid item xs={8} sm={9}>
                            <Chip
                              icon={<PhotoCameraIcon />}
                              label="Upload Profile Picture"
                              variant="outlined"
                              sx={{ borderColor: theme.palette.primary.light }}
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="Full Name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              disabled={submitting || loading}
                              InputProps={{
                                startAdornment: (
                                  <PersonIcon sx={{ mr: 1, color: 'action.active' }} />
                                ),
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="Username"
                              name="username"
                              value={formData.username}
                              onChange={handleChange}
                              disabled={submitting || loading}
                              InputProps={{
                                startAdornment: (
                                  <AccountCircleIcon
                                    sx={{ mr: 1, color: 'action.active' }}
                                  />
                                ),
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="Tell us about yourself"
                              name="bio"
                              value={formData.bio}
                              onChange={handleChange}
                              multiline
                              rows={3}
                              disabled={submitting || loading}
                              InputProps={{
                                startAdornment: (
                                  <DescriptionIcon
                                    sx={{ mr: 1, alignSelf: 'flex-start', mt: 1 }}
                                  />
                                ),
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Paper>
                    </Slide>
                  )}

                  {/* Username */}
                  <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    disabled={submitting || loading}
                    InputProps={{
                      startAdornment: (
                        <AccountCircleIcon sx={{ mr: 1, color: 'action.active' }} />
                      ),
                    }}
                  />

                  {/* Email (signup) */}
                  {!isLogin && (
                    <Slide direction="up" in timeout={500}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={submitting || loading}
                        InputProps={{
                          startAdornment: (
                            <EmailIcon sx={{ mr: 1, color: 'action.active' }} />
                          ),
                        }}
                      />
                    </Slide>
                  )}

                  {/* Password */}
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={submitting || loading}
                    InputProps={{
                      startAdornment: (
                        <LockIcon sx={{ mr: 1, color: 'action.active' }} />
                      ),
                    }}
                  />

                  {/* Confirm Password (signup) */}
                  {!isLogin && (
                    <Slide direction="up" in timeout={600}>
                      <TextField
                        fullWidth
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        disabled={submitting || loading}
                        InputProps={{
                          startAdornment: (
                            <LockIcon sx={{ mr: 1, color: 'action.active' }} />
                          ),
                        }}
                      />
                    </Slide>
                  )}

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={submitting || loading}
                    sx={{
                      py: 1.8,
                      borderRadius: 2,
                      fontSize: '1rem',
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      '&:hover': {
                        background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                      },
                    }}
                  >
                    {submitting || loading
                      ? isLogin
                        ? 'Signing In...'
                        : 'Creating Account...'
                      : isLogin
                      ? 'Sign In'
                      : 'Create Account'}
                  </Button>
                </Stack>
              </Box>

              {/* Toggle */}
              <Box mt={4} textAlign="center">
                <Divider sx={{ borderColor: alpha(theme.palette.text.primary, 0.2) }}>
                  or
                </Divider>
                <Button
                  onClick={handleToggle}
                  variant="text"
                  sx={{ mt: 2, textTransform: 'none', color: theme.palette.text.primary }}
                  disabled={submitting || loading}
                >
                  {isLogin
                    ? "Don't have an account? Create one"
                    : 'Already have an account? Sign in'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
};

export default AuthForm;
