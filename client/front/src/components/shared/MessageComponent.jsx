import React from 'react';
import { ListItem, ListItemText, Typography } from '@mui/material';

const MessageComponent = ({ sender, content, timestamp, direction }) => {
  const isSender = direction === 'outgoing';

  return (
    <ListItem sx={{ justifyContent: isSender ? 'flex-end' : 'flex-start' }}>
      <ListItemText
        sx={{ textAlign: isSender ? 'right' : 'left' }}
        primary={
          <>
            <Typography variant="subtitle2" component="span" color="text.secondary">
              {sender}
            </Typography>
            <Typography variant="body1">{content}</Typography>
          </>
        }
        secondary={
          <Typography variant="caption" color="text.secondary">
            {timestamp}
          </Typography>
        }
      />
    </ListItem>
  );
};

export default MessageComponent;
