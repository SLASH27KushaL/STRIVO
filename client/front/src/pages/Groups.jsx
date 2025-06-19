import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemButton,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  IconButton,
  Tooltip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Divider,
  CssBaseline,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { SampleData } from '../assets/SampleData';

const dummyGroups = [
  { id: 1, name: 'React Developers', description: 'A place for React enthusiasts.' },
  { id: 2, name: 'Gaming Squad', description: 'Discuss latest games and setups.' },
  { id: 3, name: 'Music Lovers', description: 'Share and discover new music.' },
  { id: 4, name: 'Travel Buddies', description: 'Plan trips and share experiences.' },
];

const Groups = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupMembers, setGroupMembers] = useState(
    dummyGroups.reduce((acc, g) => ({ ...acc, [g.id]: [] }), {})
  );

  // Dialog states
  const [editNameOpen, setEditNameOpen] = useState(false);
  const [editDescOpen, setEditDescOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [removeOpen, setRemoveOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [tempName, setTempName] = useState('');
  const [tempDesc, setTempDesc] = useState('');
  const [confirmUser, setConfirmUser] = useState(null);

  // Member lists
  const members = selectedGroup ? groupMembers[selectedGroup.id] : [];
  const toAdd = SampleData.filter(u => !members.some(m => m._id === u._id));

  // Handlers
  const openEditName = () => {
    setTempName(selectedGroup.name);
    setEditNameOpen(true);
  };
  const saveName = () => {
    setSelectedGroup(prev => ({ ...prev, name: tempName }));
    setEditNameOpen(false);
  };
  const openEditDesc = () => {
    setTempDesc(selectedGroup.description);
    setEditDescOpen(true);
  };
  const saveDesc = () => {
    setSelectedGroup(prev => ({ ...prev, description: tempDesc }));
    setEditDescOpen(false);
  };
  const handleAdd = user => {
    setGroupMembers(prev => ({
      ...prev,
      [selectedGroup.id]: [...prev[selectedGroup.id], user],
    }));
  };
  const openConfirmRemove = user => {
    setConfirmUser(user);
    setConfirmOpen(true);
  };
  const confirmRemove = () => {
    setGroupMembers(prev => ({
      ...prev,
      [selectedGroup.id]: prev[selectedGroup.id].filter(u => u._id !== confirmUser._id),
    }));
    setConfirmOpen(false);
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#1e1e2f', color: '#fff', gap: 3, p: 2 }}>
        {/* Sidebar */}
        <Paper
          elevation={8}
          sx={{
            width: 320,
            p: 3,
            borderRadius: 3,
            bgcolor: '#2a2a3d',
            border: '1px solid #3a3a4e',
          }}
        >
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: '#fff' }}>
            Groups
          </Typography>
          <List sx={{ gap: 1, flexDirection: 'column', display: 'flex' }}>
            {dummyGroups.map(g => (
              <ListItemButton
                key={g.id}
                selected={selectedGroup?.id === g.id}
                onClick={() => setSelectedGroup(g)}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  bgcolor: selectedGroup?.id === g.id ? '#3a3a4e' : 'transparent',
                  '& .MuiListItemText-primary': {
                    color: selectedGroup?.id === g.id ? '#fff' : '#ccc',
                    fontWeight: selectedGroup?.id === g.id ? 600 : 500,
                  },
                  '&:hover': {
                    bgcolor: '#3a3a4e',
                  },
                }}
              >
                <ListItemText primary={g.name} />
              </ListItemButton>
            ))}
          </List>
        </Paper>

        {/* Details Pane */}
        <Box sx={{ flex: 1, overflowY: 'auto', pr: 1 }}>
          {!selectedGroup ? (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#2a2a3d',
                borderRadius: 3,
                border: '1px solid #3a3a4e',
              }}
            >
              <Box sx={{ textAlign: 'center', p: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 300, color: '#ccc' }}>
                  Select a group to get started
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, color: '#aaa' }}>
                  Choose from the sidebar to view details and manage members
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
              <Paper
                elevation={6}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  bgcolor: '#2a2a3d',
                  border: '1px solid #3a3a4e',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    bgcolor: '#4f4fff',
                  },
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff' }}>
                    {selectedGroup.name}
                  </Typography>
                  <Tooltip title="Edit Name" arrow>
                    <IconButton size="small" onClick={openEditName} sx={{ color: '#fff' }}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
                <Divider sx={{ my: 3, borderColor: '#3a3a4e' }} />
                <Stack direction="row" alignItems="flex-start" spacing={2}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#ccc' }}>
                    Description:
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#fff', flex: 1 }}>
                    {selectedGroup.description}
                  </Typography>
                  <Tooltip title="Edit Description" arrow>
                    <IconButton size="small" onClick={openEditDesc} sx={{ color: '#fff' }}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Paper>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setAddOpen(true)}
                  sx={{
                    textTransform: 'none',
                    bgcolor: '#4f4fff',
                    fontWeight: 600,
                  }}
                >
                  Add Members
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<RemoveIcon />}
                  onClick={() => setRemoveOpen(true)}
                  sx={{
                    textTransform: 'none',
                    borderColor: '#ff5f5f',
                    color: '#ff5f5f',
                    fontWeight: 600,
                  }}
                >
                  Remove Members
                </Button>
              </Stack>

              {members.length > 0 && (
                <Paper elevation={4} sx={{ p: 3, borderRadius: 3, bgcolor: '#2a2a3d', border: '1px solid #3a3a4e' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      fontWeight: 600,
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    Members
                    <Box
                      sx={{
                        bgcolor: '#4f4fff',
                        color: '#fff',
                        borderRadius: '12px',
                        px: 1.5,
                        py: 0.5,
                        fontSize: '0.75rem',
                        fontWeight: 700,
                      }}
                    >
                      {members.length}
                    </Box>
                  </Typography>
                  <List dense sx={{ gap: 1, flexDirection: 'column', display: 'flex' }}>
                    {members.map(u => (
                      <ListItem
                        key={u._id}
                        sx={{
                          borderRadius: 2,
                          bgcolor: '#2a2a3d',
                          border: '1px solid #3a3a4e',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          '&:hover': {
                            borderColor: '#4f4fff',
                          },
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar src={u.avatar[0]} sx={{ border: '2px solid #4f4fff' }} />
                        </ListItemAvatar>
                        <ListItemText primary={u.name} sx={{ color: '#fff' }} />
                        <ListItemSecondaryAction>
                          <Tooltip title="Remove Member" arrow>
                            <IconButton onClick={() => openConfirmRemove(u)} sx={{ color: '#ff5f5f' }}>
                              <RemoveIcon />
                            </IconButton>
                          </Tooltip>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              )}
            </Box>
          )}
        </Box>

        {/* Confirm Removal */}
        <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} PaperProps={{ sx: { bgcolor: '#2a2a3d', color: '#fff' } }}>
          <DialogTitle sx={{ fontWeight: 600 }}>Confirm Removal</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to remove {confirmUser?.name}?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmOpen(false)} sx={{ textTransform: 'none' }}>
              Cancel
            </Button>
            <Button onClick={confirmRemove} variant="contained" sx={{ bgcolor: '#ff5f5f', textTransform: 'none' }}>
              Remove
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Name */}
        <Dialog open={editNameOpen} onClose={() => setEditNameOpen(false)} fullWidth maxWidth="sm" PaperProps={{ sx: { bgcolor: '#2a2a3d', color: '#fff' } }}>
          <DialogTitle sx={{ fontWeight: 600 }}>Edit Group Name</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Name"
              value={tempName}
              onChange={e => setTempName(e.target.value)}
              margin="normal"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: '#1e1e2f',
                  color: '#fff',
                },
                '& .MuiInputLabel-root': { color: '#aaa' },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditNameOpen(false)} sx={{ textTransform: 'none' }}>
              Cancel
            </Button>
            <Button onClick={saveName} variant="contained" sx={{ bgcolor: '#4f4fff', textTransform: 'none' }}>
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Description */}
        <Dialog open={editDescOpen} onClose={() => setEditDescOpen(false)} fullWidth maxWidth="sm" PaperProps={{ sx: { bgcolor: '#2a2a3d', color: '#fff' } }}>
          <DialogTitle sx={{ fontWeight: 600 }}>Edit Description</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              value={tempDesc}
              onChange={e => setTempDesc(e.target.value)}
              margin="normal"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: '#1e1e2f',
                  color: '#fff',
                },
                '& .MuiInputLabel-root': { color: '#aaa' },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDescOpen(false)} sx={{ textTransform: 'none' }}>
              Cancel
            </Button>
            <Button onClick={saveDesc} variant="contained" sx={{ bgcolor: '#4f4fff', textTransform: 'none' }}>
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Members */}
        <Dialog open={addOpen} onClose={() => setAddOpen(false)} fullWidth maxWidth="sm" PaperProps={{ sx: { bgcolor: '#2a2a3d', color: '#fff' } }}>
          <DialogTitle sx={{ fontWeight: 600 }}>Add Members</DialogTitle>
          <DialogContent>
            <List sx={{ gap: 1, flexDirection: 'column', display: 'flex' }}>
              {toAdd.map(u => (
                <ListItem
                  key={u._id}
                  secondaryAction={
                    <Tooltip title="Add Member" arrow>
                      <IconButton onClick={() => handleAdd(u)} sx={{ color: '#4f4fff' }}>
                        <AddIcon />
                      </IconButton>
                    </Tooltip>
                  }
                  sx={{
                    borderRadius: 2,
                    bgcolor: '#2a2a3d',
                    border: '1px solid #3a3a4e',
                    '&:hover': { borderColor: '#4f4fff' },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={u.avatar[0]} sx={{ border: '2px solid #4f4fff' }} />
                  </ListItemAvatar>
                  <ListItemText primary={u.name} sx={{ color: '#fff' }} />
                </ListItem>
              ))}
              {toAdd.length === 0 && (
                <Typography sx={{ p: 3, textAlign: 'center', color: '#aaa' }}>
                  All users have been added.
                </Typography>
              )}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddOpen(false)} sx={{ textTransform: 'none' }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Remove Members */}
        <Dialog open={removeOpen} onClose={() => setRemoveOpen(false)} fullWidth maxWidth="sm" PaperProps={{ sx: { bgcolor: '#2a2a3d', color: '#fff' } }}>
          <DialogTitle sx={{ fontWeight: 600 }}>Remove Members</DialogTitle>
          <DialogContent>
            <List sx={{ gap: 1, flexDirection: 'column', display: 'flex' }}>
              {members.map(u => (
                <ListItem
                  key={u._id}
                  secondaryAction={
                    <Tooltip title="Remove Member" arrow>
                      <IconButton onClick={() => openConfirmRemove(u)} sx={{ color: '#ff5f5f' }}>
                        <RemoveIcon />
                      </IconButton>
                    </Tooltip>
                  }
                  sx={{
                    borderRadius: 2,
                    bgcolor: '#2a2a3d',
                    border: '1px solid #3a3a4e',
                    '&:hover': { borderColor: '#ff5f5f' },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={u.avatar[0]} sx={{ border: '2px solid #ff5f5f' }} />
                  </ListItemAvatar>
                  <ListItemText primary={u.name} sx={{ color: '#fff' }} />
                </ListItem>
              ))}
              {members.length === 0 && (
                <Typography sx={{ p: 3, textAlign: 'center', color: '#aaa' }}>
                  No members to remove.
                </Typography>
              )}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setRemoveOpen(false)} sx={{ textTransform: 'none' }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default Groups;
