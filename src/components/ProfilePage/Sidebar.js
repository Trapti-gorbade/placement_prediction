import React from 'react';
import { Avatar, Button, Box, Typography } from '@mui/material';
import {useState} from 'react';
const Sidebar = ({ gender }) => {
  const avatarUrl =
    gender === 'male'
      ? 'https://randomuser.me/api/portraits/men/75.jpg'
      : 'https://randomuser.me/api/portraits/women/75.jpg';

  return (
    <Box
      sx={{
        width: '240px',
        height: '101.2vh',
        backgroundColor: '#2A6BAC',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        mt: '-10px',
        ml:'-8px'
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
            width: '102%',
            marginBottom: 4,
            backgroundColor: 'rgba(18, 160, 226, 0.64)',
            boxShadow:'0 4px 2px rgba(61, 60, 60, 0.64) ',
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

