// SampleData.js

export const SampleData = [
  {
    avatar: ['https://randomuser.me/api/portraits/women/44.jpg'],
    name: 'Alice Johnson',
    _id: 'chat_001',
    groupChat: false,
    sameSender: false,
    isOnline: true,
    newMessage: 2,
    index: 0,
    handleDeleteChatOpen: (id = 'chat_001') => console.log(`Delete chat ${id}`)
  },
  {
    avatar: ['https://randomuser.me/api/portraits/men/32.jpg'],
    name: 'Bob Martinez',
    _id: 'chat_002',
    groupChat: false,
    sameSender: false,
    isOnline: false,
    newMessage: 0,
    index: 1,
    handleDeleteChatOpen: (id = 'chat_002') => console.log(`Delete chat ${id}`)
  },
  {
    avatar: [
      'https://randomuser.me/api/portraits/women/68.jpg',
      'https://randomuser.me/api/portraits/men/12.jpg',
      'https://randomuser.me/api/portraits/women/56.jpg'
    ],
    name: 'Project Team',
    _id: 'chat_003',
    groupChat: true,
    sameSender: false,
    isOnline: true,
    newMessage: 5,
    index: 2,
    handleDeleteChatOpen: (id = 'chat_003') => console.log(`Delete chat ${id}`)
  },
  {
    avatar: ['https://randomuser.me/api/portraits/men/77.jpg'],
    name: 'Charlie Nguyen',
    _id: 'chat_004',
    groupChat: false,
    sameSender: false,
    isOnline: true,
    newMessage: 1,
    index: 3,
    handleDeleteChatOpen: (id = 'chat_004') => console.log(`Delete chat ${id}`)
  },
  {
    avatar: ['https://randomuser.me/api/portraits/women/22.jpg'],
    name: 'Diana Petrova',
    _id: 'chat_005',
    groupChat: false,
    sameSender: false,
    isOnline: false,
    newMessage: 0,
    index: 4,
    handleDeleteChatOpen: (id = 'chat_005') => console.log(`Delete chat ${id}`)
  }
];
