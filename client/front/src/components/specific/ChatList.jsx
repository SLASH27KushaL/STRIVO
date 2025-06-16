import React from 'react';
import ChatItem from '../shared/ChatItem';
import { SampleData } from '../../assets/SampleData';

const ChatList = () => {
  return (
    <>
      {SampleData.map((chat, idx) => (
        <ChatItem
          key={chat._id}
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
      ))}
    </>
  );
};

export default ChatList;
