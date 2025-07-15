import { useContext } from 'react';
import { createContext } from 'react';
import { io } from 'socket.io-client';

export const socket = io('http://localhost:3000', {
  withCredentials: true,
  auth: {
    token: localStorage.getItem('token'),
  },
});


export const SocketContext= createContext();


export const getSocket=()=>{ 
useContext(SocketContext);
}

import { useMemo, useState } from 'react';
const socketProvider = ({children}) => {
  return (
    <SocketContext.Provider value={socket}>
      {children}
      </SocketContext.Provider>
  )
  
}

export default socket;
