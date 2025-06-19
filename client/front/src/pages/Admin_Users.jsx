import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  TextField,
  Button,
  IconButton,
  Tooltip,
  Pagination
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';
import Admin_Layout from '../components/layout/Admin_Layout.jsx';

const Admin_Users = () => {
  // Sample user data
  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'JD',
      status: 'active',
      role: 'Admin',
      lastLogin: '2023-05-15 10:30'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: 'JS',
      status: 'active',
      role: 'User',
      lastLogin: '2023-05-14 15:45'
    },
    {
      id: 3,
      name: 'Robert Johnson',
      email: 'robert@example.com',
      avatar: 'RJ',
      status: 'inactive',
      role: 'User',
      lastLogin: '2023-04-20 09:15'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily@example.com',
      avatar: 'ED',
      status: 'active',
      role: 'Editor',
      lastLogin: '2023-05-12 14:20'
    },
    {
      id: 5,
      name: 'Michael Wilson',
      email: 'michael@example.com',
      lastLogin: '2023-03-10 11:30',
      avatar: 'MW',
      status: 'suspended',
      role: 'User'
    }
  ];

  const statusColors = {
    active: 'success',
    inactive: 'warning',
    suspended: 'error'
  };

  return (
    <Admin_Layout title="User Management">
      {/* Main Content Container */}
      <Box sx={{ 
        p: 3,
        width: '100%',
        maxWidth: 'calc(100vw - 280px)', // Account for sidebar width
        overflowX: 'auto'
      }}>
        {/* Header and Actions */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 3,
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            User Management
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
            >
              Add User
            </Button>
            <Tooltip title="Filter">
              <IconButton>
                <FilterIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Search Bar */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search users..."
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1 }} />
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2
              }
            }}
          />
        </Box>

        {/* Users Table */}
        <TableContainer 
          component={Paper} 
          sx={{ 
            borderRadius: 2, 
            boxShadow: 1,
            maxWidth: '100%',
            overflowX: 'auto'
          }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ bgcolor: 'background.default' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Last Login</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow 
                  key={user.id} 
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ 
                        bgcolor: 'primary.main', 
                        mr: 2,
                        width: 36,
                        height: 36
                      }}>
                        {user.avatar}
                      </Avatar>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {user.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {user.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={user.role} 
                      size="small" 
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      color={statusColors[user.status] || 'default'}
                      size="small"
                      sx={{ 
                        textTransform: 'capitalize',
                        fontWeight: 500
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {user.lastLogin}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Tooltip title="Edit">
                        <IconButton 
                          color="primary" 
                          sx={{ 
                            mr: 1,
                            '&:hover': {
                              bgcolor: 'primary.light'
                            }
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton 
                          color="error"
                          sx={{ 
                            '&:hover': {
                              bgcolor: 'error.light'
                            }
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: 3,
          width: '100%'
        }}>
          <Pagination 
            count={5} 
            color="primary" 
            shape="rounded"
            sx={{
              '& .MuiPaginationItem-root': {
                borderRadius: 1
              }
            }}
          />
        </Box>
      </Box>
    </Admin_Layout>
  );
};

export default Admin_Users;