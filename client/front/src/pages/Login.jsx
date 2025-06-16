import React, { useState } from 'react';
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
  Chip
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import {
  PhotoCamera as PhotoCameraIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  AccountCircle as AccountCircleIcon,
  Description as DescriptionIcon
} from '@mui/icons-material';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    bio: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePicture: null
  });
  const theme = useTheme();

  const handleToggle = () => setIsLogin(prev => !prev);
  const handleChange = e => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log(isLogin ? 'Login:' : 'Signup:', formData);
  };

  return (
    <Box
      sx={{
        minHeight: 'fit-content',
        background: `linear-gradient(135deg, 
          ${theme.palette.primary.main}15 0%, 
          ${theme.palette.secondary.main}15 50%, 
          ${theme.palette.primary.main}25 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 20% 50%, ${alpha(
            theme.palette.primary.main,
            0.1
          )} 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, ${alpha(
                        theme.palette.secondary.main,
                        0.1
                      )} 0%, transparent 50%),
                      radial-gradient(circle at 40% 80%, ${alpha(
                        theme.palette.primary.main,
                        0.08
                      )} 0%, transparent 50%)`,
          zIndex: 0
        }
      }}
    >
      <Fade in timeout={800}>
        <Card
          sx={{
            maxWidth: 480,
            height: 'auto',
            width: '100%',
            position: 'relative',
            zIndex: 1,
            background: alpha(theme.palette.background.paper, 0.95),
            backdropFilter: 'blur(20px)',
            border: `1px solid ${alpha(
              theme.palette.primary.main,
              0.1
            )}`,
            borderRadius: 4,
            boxShadow: `0 20px 60px ${alpha(
              theme.palette.common.black,
              0.15
            )}, 0 8px 32px ${alpha(
              theme.palette.common.black,
              0.1
            )}`,
            
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: `linear-gradient(90deg, 
                ${theme.palette.primary.main}, 
                ${theme.palette.secondary.main}, 
                ${theme.palette.primary.main})`
            }
          }}
        >
          <CardContent sx={{ p: 5 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Slide direction="down" in timeout={600}>
                <Box>
                  <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                      fontWeight: 700,
                      background: `linear-gradient(135deg, ${
                        theme.palette.primary.main
                      }, ${theme.palette.secondary.main})`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 1
                    }}
                  >
                    {isLogin ? 'Welcome Back' : 'Join Us'}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    sx={{ fontSize: '1.1rem', opacity: 0.8 }}
                  >
                    {isLogin
                      ? 'Sign in to continue your journey'
                      : 'Create your account and get started'}
                  </Typography>
                </Box>
              </Slide>
            </Box>

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Stack spacing={3}>
                <Slide direction="up" in={!isLogin} timeout={500}>
                  <Box>
                    {!isLogin && (
                      <Stack spacing={3}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 3,
                            bgcolor: alpha(
                              theme.palette.primary.main,
                              0.05
                            ),
                            borderRadius: 3,
                            border: `1px solid ${alpha(
                              theme.palette.primary.main,
                              0.1
                            )}`
                          }}
                        >
                          <Grid container spacing={3} alignItems="center">
                            <Grid item xs={4} sx={{ textAlign: 'center' }}>
                              <Box
                                sx={{ position: 'relative', display: 'inline-block' }}
                              >
                                <Avatar
                                  src={
                                    formData.profilePicture
                                      ? URL.createObjectURL(
                                          formData.profilePicture
                                        )
                                      : ''
                                  }
                                  sx={{
                                    width: 80,
                                    height: 80,
                                    border: `3px solid ${
                                      theme.palette.primary.main
                                    }`,
                                    boxShadow: `0 8px 32px ${alpha(
                                      theme.palette.primary.main,
                                      0.3
                                    )}`
                                  }}
                                >
                                  <PersonIcon sx={{ fontSize: 40 }} />
                                </Avatar>
                                <label htmlFor="profilePicture-upload">
                                  <input
                                    accept="image/*"
                                    id="profilePicture-upload"
                                    type="file"
                                    name="profilePicture"
                                    onChange={handleChange}
                                    style={{ display: 'none' }}
                                  />
                                  <IconButton
                                    component="span"
                                    sx={{
                                      position: 'absolute',
                                      bottom: -8,
                                      right: -8,
                                      bgcolor: theme.palette.primary.main,
                                      color: 'white',
                                      width: 32,
                                      height: 32,
                                      '&:hover': {
                                        bgcolor: theme.palette.primary.dark,
                                        transform: 'scale(1.1)'
                                      },
                                      transition: 'all 0.2s ease-in-out'
                                    }}
                                  >
                                    <PhotoCameraIcon sx={{ fontSize: 16 }} />
                                  </IconButton>
                                </label>
                              </Box>
                            </Grid>
                            <Grid item xs={8}>
                              <Chip
                                icon={<PhotoCameraIcon />}
                                label="Upload Profile Picture"
                                variant="outlined"
                                color="primary"
                                sx={{
                                  borderRadius: 2,
                                  '&:hover': {
                                    bgcolor: alpha(
                                      theme.palette.primary.main,
                                      0.1
                                    )
                                  }
                                }}
                              />
                            </Grid>
                          </Grid>
                        </Paper>

                        <TextField
                          fullWidth
                          label="Full Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          InputProps={{
                            startAdornment: (
                              <PersonIcon
                                sx={{ mr: 1, color: 'action.active' }}
                              />
                            )
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              '&:hover': {
                                '& > fieldset': {
                                  borderColor: theme.palette.primary.main
                                }
                              }
                            }
                          }}
                        />
                        <TextField
                          fullWidth
                          label="Username"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          InputProps={{
                            startAdornment: (
                              <AccountCircleIcon
                                sx={{ mr: 1, color: 'action.active' }}
                              />
                            )
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              '&:hover': {
                                '& > fieldset': {
                                  borderColor: theme.palette.primary.main
                                }
                              }
                            }
                          }}
                        />
                        <TextField
                          fullWidth
                          label="Tell us about yourself"
                          name="bio"
                          value={formData.bio}
                          multiline
                          rows={3}
                          onChange={handleChange}
                          InputProps={{
                            startAdornment: (
                              <DescriptionIcon
                                sx={{
                                  mr: 1,
                                  color: 'action.active',
                                  alignSelf: 'flex-start',
                                  mt: 1
                                }}
                              />
                            )
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              '&:hover': {
                                '& > fieldset': {
                                  borderColor: theme.palette.primary.main
                                }
                              }
                            }
                          }}
                        />
                      </Stack>
                    )}
                  </Box>
                </Slide>

                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <EmailIcon sx={{ mr: 1, color: 'action.active' }} />
                    )
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover': {
                        '& > fieldset': {
                          borderColor: theme.palette.primary.main
                        }
                      }
                    }
                  }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <LockIcon sx={{ mr: 1, color: 'action.active' }} />
                    )
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover': {
                        '& > fieldset': {
                          borderColor: theme.palette.primary.main
                        }
                      }
                    }
                  }}
                />
                <Slide direction="up" in={!isLogin} timeout={600}>
                  <Box>
                    {!isLogin && (
                      <TextField
                        fullWidth
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <LockIcon
                              sx={{ mr: 1, color: 'action.active' }}
                            />
                          )
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            '&:hover': {
                              '& > fieldset': {
                                borderColor: theme.palette.primary.main
                              }
                            }
                          }
                        }}
                      />
                    )}
                  </Box>
                </Slide>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    py: 2,
                    borderRadius: 3,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    background: `linear-gradient(135deg, ${
                      theme.palette.primary.main
                    }, ${theme.palette.primary.dark})`,
                    boxShadow: `0 8px 32px ${alpha(
                      theme.palette.primary.main,
                      0.4
                    )}`,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${
                        theme.palette.primary.dark
                      }, ${theme.palette.primary.main})`,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 12px 40px ${alpha(
                        theme.palette.primary.main,
                        0.5
                      )}`
                    },
                    transition: 'all 0.3s ease-in-out'
                  }}
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </Button>
              </Stack>
            </Box>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Divider sx={{ mb: 3 }}>
                <Typography variant="body2" color="textSecondary">
                  or
                </Typography>
              </Divider>
              <Button
                onClick={handleToggle}
                variant="text"
                sx={{
                  py: 1.5,
                  px: 3,
                  borderRadius: 2,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  color: theme.palette.primary.main,
                  '&:hover': {
                    bgcolor: alpha(
                      theme.palette.primary.main,
                      0.08
                    ),
                    transform: 'scale(1.02)'
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                {isLogin
                  ? "Don't have an account? Create one"
                  : 'Already have an account? Sign in'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Fade>
    </Box>
  );
};

export default AuthForm;
