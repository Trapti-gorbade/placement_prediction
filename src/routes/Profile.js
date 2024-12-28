import React from 'react';
import Sidebar from "../components/ProfilePage/Sidebar";
import Navbar from "../components/ProfilePage/Navbar";
import DataTable from "../components/ProfilePage/Table";
import { Box } from '@mui/material';

const Profile = () => {
  
  const user = {
    name: "Taniya",
    gender: "female", 
    photo: "", 
  };

  return (
    <Box >

      <Navbar />
      <Box sx={{ display: 'flex' }}>
        <Sidebar user={user} />
        <Box sx={{ flexGrow: 1,width:'800px',height:'500px', paddingLeft:'20px', paddingTop: '54px', paddingBottom: '20px'}}>
          <DataTable />
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
