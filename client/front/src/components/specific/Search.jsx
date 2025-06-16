import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Paper,
  InputBase,
  IconButton,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const Search = ({ open = true, onClose = () => console.log('Search dialog closed') }) => {
  const [query, setQuery] = useState('');

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
          backgroundColor: '#f9f9f9',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 1,
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 'bold',
            fontSize: '1.3rem',
            p: 0,
            color: '#333',
          }}
        >
          Find People or Search Chat
        </DialogTitle>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      <DialogContent sx={{ pt: 2 }}>
        <Paper
          component="form"
          sx={{
            p: '4px 8px',
            display: 'flex',
            alignItems: 'center',
            borderRadius: 2,
            boxShadow: 1,
            bgcolor: '#fff',
          }}
        >
          <SearchIcon sx={{ mr: 1, color: 'gray' }} />
          <InputBase
            placeholder="Search by name or message..."
            fullWidth
            value={query}
            onChange={e => setQuery(e.target.value)}
            sx={{ fontSize: '1rem' }}
          />
        </Paper>

        {query && (
          <Typography variant="body2" sx={{ mt: 2, color: 'gray' }}>
            Showing results for "<strong>{query}</strong>"
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Search;
