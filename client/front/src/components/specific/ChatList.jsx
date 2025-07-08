// ChatList.jsx
import React from 'react';
import { List, Divider } from '@mui/material';
import ChatItem from '../shared/ChatItem';
import { SampleData } from '../../assets/SampleData';

const ChatList = () => (
  <List
    sx={{
      width: '100%',
      bgcolor: 'background.paper',
      p: 1,
      '& .MuiListItem-root': {
        borderRadius: 1,
        mb: 1,
        '&:hover': {
          bgcolor: 'action.hover',
        },
      },
    }}
  >
    {SampleData.map((chat, idx) => (
      <React.Fragment key={chat._id}>
        <ChatItem
          avatar={chat.avatar}
          name={chat.name}
          _id={chat._id}
          groupChat={chat.groupChat}
          sameSender={chat.sameSender}
          isOnline={chat.isOnline}
          newMessage={chat.newMessage}
          index={idx}
          handleDeleteChatOpen={chat.handleDeleteChatOpen}
        />
        {idx < SampleData.length - 1 && <Divider component="li" variant="inset" />}
      </React.Fragment>
    ))}
  </List>
);

export default ChatList;
