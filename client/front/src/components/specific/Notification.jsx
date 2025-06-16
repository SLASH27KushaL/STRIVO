import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

const Notification = ({ open = true, onClose = () => console.log('Notification dialog closed') }) => {
  const dummyNotifications = [
    { id: 1, text: "You have a new message from Alex." },
    { id: 2, text: "New friend request from Jordan." },
    { id: 3, text: "Group 'React Devs' has a new update." },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 2,
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <DialogTitle sx={{ fontWeight: 'bold', p: 0 }}>Notifications</DialogTitle>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent dividers sx={{ pt: 2 }}>
        {dummyNotifications.length === 0 ? (
          <Box textAlign="center" py={4}>
            <NotificationsNoneIcon sx={{ fontSize: 48, color: 'gray' }} />
            <Typography variant="body1" color="text.secondary">
              No new notifications
            </Typography>
          </Box>
        ) : (
          <List>
            {dummyNotifications.map(({ id, text }) => (
              <ListItem key={id} divider>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Notification;
