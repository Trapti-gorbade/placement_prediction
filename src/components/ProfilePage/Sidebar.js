import React from 'react';
import { Avatar, Button, Box, Typography } from '@mui/material';

const Sidebar = ({ gender }) => {
  const avatarUrl =
    gender === 'male'
      ? 'https://randomuser.me/api/portraits/men/75.jpg'
      : 'https://randomuser.me/api/portraits/women/75.jpg';

  return (
    <Box
      sx={{
        width: '240px',
        height: '100vh',
        backgroundColor: '#1565c0',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <Avatar
        src={avatarUrl}
        alt="User Avatar"
        sx={{
          width: 100,
          height: 100,
          marginBottom: 2,
        }}
      />
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Taniya
      </Typography>
      {}
      {['Profile', 'Documents', 'Logout'].map((text, index) => (
        <Button
          key={index}
          variant="contained"
          sx={{
            width: '100%',
            marginBottom: 4,
            backgroundColor: '#1976d2',
            boxShadow:'2.4px 2.4px 3.2px rgba(18, 17, 17, 0.22) ',
            '&:hover': {
              backgroundColor: '#0087bd',
            },
          }}
        >
          {text}
        </Button>
      ))}
    </Box>
  );
};

export default Sidebar;

