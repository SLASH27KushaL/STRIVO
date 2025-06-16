import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  Box,
  Avatar,
  Typography,
  IconButton,
  Chip,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { SampleData } from '../../assets/SampleData';

const NewGroup = ({ open = true, onClose = () => {}, onCreate = (group) => {} }) => {
  const [groupName, setGroupName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleAddUser = (user) => {
    setSelectedUsers(prev => {
      if (prev.some(u => u._id === user._id)) return prev;
      return [...prev, user];
    });
  };

  const handleRemoveUser = (_id) => {
    setSelectedUsers(prev => prev.filter(u => u._id !== _id));
  };

  const handleCreate = () => {
    const group = { name: groupName, members: selectedUsers };
    onCreate(group);
    // optionally reset state
    setGroupName('');
    setSelectedUsers([]);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          pt: 2,
        }}
      >
        <DialogTitle sx={{ m: 0, fontWeight: 'bold' }}>
          New Group
        </DialogTitle>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ pt: 1 }}>
        <TextField
          label="Group Name"
          variant="outlined"
          fullWidth
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          sx={{ mb: 3 }}
        />

        {selectedUsers.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Selected Members
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {selectedUsers.map((user) => (
                <Chip
                  key={user._id}
                  avatar={<Avatar src={user.avatar[0]} />}
                  label={user.name}
                  onDelete={() => handleRemoveUser(user._id)}
                />
              ))}
            </Box>
          </Box>
        )}

        <List sx={{ p: 0 }}>
          {SampleData.map((user) => {
            const isSelected = selectedUsers.some(u => u._id === user._id);
            return (
              <ListItem
                key={user._id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: 2,
                  py: 1,
                  borderBottom: '1px solid #eee',
                }}
                disableGutters
                secondaryAction={
                  <IconButton
                    onClick={() => handleAddUser(user)}
                    disabled={isSelected}
                    size="large"
                  >
                    <AddIcon color={isSelected ? 'disabled' : 'primary'} />
                  </IconButton>
                }
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar src={user.avatar[0]} alt={user.name} />
                  <Box>
                    <Typography>{user.name}</Typography>
                  </Box>
                </Box>
              </ListItem>
            );
          })}
        </List>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleCreate}
          disabled={!groupName || selectedUsers.length === 0}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewGroup;
