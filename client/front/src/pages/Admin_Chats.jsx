import React, { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Badge,
  Divider,
  TextField,
  IconButton,
  Button,
  Paper,
  Chip,
  Tabs,
  Tab
} from '@mui/material';
import {
  Search as SearchIcon,
  Send as SendIcon,
  MoreVert as MoreIcon,
  FilterList as FilterIcon,
  Group as GroupIcon,
  Person as PersonIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import Admin_Layout from '../components/layout/Admin_Layout.jsx';

const Admin_Chats = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [message, setMessage] = useState('');
  const [activeChat, setActiveChat] = useState(1);

  // Sample chat data
  const chats = [
    {
      id: 1,
      name: 'Marketing Team',
      lastMessage: 'Let me check the analytics and get back to you',
      time: '10:30 AM',
      unread: 2,
      isGroup: true,
      participants: 5,
      online: true
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      lastMessage: 'Thanks for the update!',
      time: 'Yesterday',
      unread: 0,
      isGroup: false,
      online: true
    },
    {
      id: 3,
      name: 'Development Team',
      lastMessage: 'The new feature is ready for testing',
      time: 'Yesterday',
      unread: 5,
      isGroup: true,
      participants: 8,
      online: false
    },
    {
      id: 4,
      name: 'Michael Brown',
      lastMessage: 'Can we schedule a meeting?',
      time: '2 days ago',
      unread: 0,
      isGroup: false,
      online: false
    },
    {
      id: 5,
      name: 'Customer Support',
      lastMessage: 'Ticket #4567 has been resolved',
      time: '3 days ago',
      unread: 0,
      isGroup: true,
      participants: 3,
      online: true
    }
  ];

  // Sample messages for active chat
  const messages = [
    {
      id: 1,
      sender: 'You',
      text: 'Hi team, how is the project going?',
      time: '10:00 AM',
      isYou: true
    },
    {
      id: 2,
      sender: 'Alex Chen',
      text: 'Going well! We just finished the new UI components',
      time: '10:15 AM',
      isYou: false
    },
    {
      id: 3,
      sender: 'You',
      text: 'Thats great! When can we expect the demo?',
      time: '10:20 AM',
      isYou: true
    },
    {
      id: 4,
      sender: 'Maria Garcia',
      text: 'Let me check the analytics and get back to you',
      time: '10:30 AM',
      isYou: false
    }
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Send message logic here
      setMessage('');
    }
  };

  return (
    <Admin_Layout title="Chat Management">
      <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
        {/* Left sidebar - Chat list */}
        <Paper sx={{ 
          width: 350, 
          borderRight: '1px solid #e0e0e0',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Header */}
          <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Chats</Typography>
            <Box sx={{ display: 'flex', mt: 1 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search chats..."
                InputProps={{
                  startAdornment: <SearchIcon color="action" />
                }}
              />
              <IconButton>
                <FilterIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Tabs */}
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ borderBottom: '1px solid #e0e0e0' }}
          >
            <Tab label="All" />
            <Tab label="Groups" />
            <Tab label="Private" />
          </Tabs>

          {/* Chat list */}
          <List sx={{ flex: 1, overflowY: 'auto' }}>
            {chats.map((chat) => (
              <React.Fragment key={chat.id}>
                <ListItem 
                  button 
                  selected={activeChat === chat.id}
                  onClick={() => setActiveChat(chat.id)}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: '#f5f5f5'
                    }
                  }}
                >
                  <ListItemAvatar>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                      color="success"
                      invisible={!chat.online}
                    >
                      <Avatar sx={{ bgcolor: chat.isGroup ? 'primary.main' : 'secondary.main' }}>
                        {chat.isGroup ? <GroupIcon /> : <PersonIcon />}
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontWeight: 600 }}>{chat.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {chat.time}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '70%'
                          }}
                        >
                          {chat.lastMessage}
                        </Typography>
                        {chat.unread > 0 && (
                          <Chip 
                            label={chat.unread} 
                            size="small" 
                            color="primary"
                            sx={{ height: 20 }}
                          />
                        )}
                      </Box>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        </Paper>

        {/* Right side - Chat area */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Chat header */}
          <Paper sx={{ 
            p: 2, 
            display: 'flex', 
            alignItems: 'center',
            borderBottom: '1px solid #e0e0e0'
          }}>
            {chats.find(c => c.id === activeChat)?.isGroup ? (
              <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                <GroupIcon />
              </Avatar>
            ) : (
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
                color="success"
                sx={{ mr: 2 }}
              >
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                  <PersonIcon />
                </Avatar>
              </Badge>
            )}
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 600 }}>
                {chats.find(c => c.id === activeChat)?.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {chats.find(c => c.id === activeChat)?.isGroup 
                  ? `${chats.find(c => c.id === activeChat)?.participants} participants` 
                  : chats.find(c => c.id === activeChat)?.online ? 'Online' : 'Offline'}
              </Typography>
            </Box>
            <IconButton>
              <MoreIcon />
            </IconButton>
          </Paper>

          {/* Messages area */}
          <Box sx={{ 
            flex: 1, 
            p: 2, 
            overflowY: 'auto',
            background: '#f9f9f9'
          }}>
            {messages.map((msg) => (
              <Box
                key={msg.id}
                sx={{
                  display: 'flex',
                  justifyContent: msg.isYou ? 'flex-end' : 'flex-start',
                  mb: 2
                }}
              >
                <Paper
                  sx={{
                    p: 1.5,
                    maxWidth: '70%',
                    bgcolor: msg.isYou ? 'primary.main' : 'background.paper',
                    color: msg.isYou ? 'common.white' : 'text.primary',
                    borderRadius: msg.isYou 
                      ? '18px 18px 4px 18px' 
                      : '18px 18px 18px 4px'
                  }}
                >
                  <Typography variant="body2">{msg.text}</Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    mt: 0.5
                  }}>
                    <Typography variant="caption" sx={{ 
                      opacity: 0.8,
                      color: msg.isYou ? 'common.white' : 'text.secondary'
                    }}>
                      {msg.time}
                    </Typography>
                    {msg.isYou && (
                      <CheckCircleIcon 
                        fontSize="small" 
                        sx={{ 
                          ml: 0.5,
                          opacity: 0.8,
                          color: 'common.white'
                        }} 
                      />
                    )}
                  </Box>
                </Paper>
              </Box>
            ))}
          </Box>

          {/* Message input */}
          <Paper sx={{ p: 2, borderTop: '1px solid #e0e0e0' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type a message..."
                size="small"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 4
                  }
                }}
              />
              <IconButton 
                color="primary" 
                sx={{ ml: 1 }}
                onClick={handleSendMessage}
                disabled={!message.trim()}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Admin_Layout>
  );
};

export default Admin_Chats;