import React, { useState } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
  TablePagination,
  Checkbox,
  Icon
} from '@mui/material';

const DataTable = () => {
  const companies = [
    { name: "Company A", position: "Software Engineer", date: "2024-01-10", location: "New York" },
    { name: "Company B", position: "Data Analyst", date: "2024-01-15", location: "San Francisco" },
    { name: "Company C", position: "Product Manager", date: "2024-02-01", location: "Los Angeles" },
    { name: "Company D", position: "UI/UX Designer", date: "2024-02-20", location: "Chicago" },
    { name: "Company E", position: "HR Manager", date: "2024-03-05", location: "Miami" },
    { name: "Company F", position: "Full Stack Developer", date: "2024-03-10", location: "Dallas" },
    { name: "Company G", position: "Data Scientist", date: "2024-04-01", location: "Boston" },
    { name: "Company H", position: "Frontend Developer", date: "2024-04-15", location: "Seattle" },
    { name: "Company I", position: "Backend Developer", date: "2024-05-01", location: "Austin" },
    { name: "Company J", position: "Marketing Specialist", date: "2024-05-20", location: "Los Angeles" },
    { name: "Company K", position: "Software Engineer", date: "2024-01-10", location: "New York" },
    { name: "Company L", position: "Data Analyst", date: "2024-01-15", location: "San Francisco" },
    { name: "Company M", position: "Product Manager", date: "2024-02-01", location: "Los Angeles" },
    { name: "Company N", position: "UI/UX Designer", date: "2024-02-20", location: "Chicago" },
    { name: "Company O", position: "HR Manager", date: "2024-03-05", location: "Miami" },
    { name: "Company P", position: "Full Stack Developer", date: "2024-03-10", location: "Dallas" },
    { name: "Company Q", position: "Data Scientist", date: "2024-04-01", location: "Boston" },
    { name: "Company R", position: "Frontend Developer", date: "2024-04-15", location: "Seattle" },
    { name: "Company S", position: "Backend Developer", date: "2024-05-01", location: "Austin" },
    { name: "Company T", position: "Marketing Specialist", date: "2024-05-20", location: "Los Angeles" },
  ];

  const [filteredCompanies, setFilteredCompanies] = useState(companies);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectProperty, setSelectProperty]= useState("")
  
  const updateProperty = (e) =>{
    setSelectProperty(e.target.value);
  }
  const handleSearchChange = (event) => {
    console.log(event.target.value);
    const value = event.target.value;
    setSearchTerm(value);

    
    const filteredData = companies.filter((company) =>
      company.name.toLowerCase().includes(value.toLowerCase()) ||
      company.position.toLowerCase().includes(value.toLowerCase()) ||
      company.location.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredCompanies(filteredData);
    setPage(0); 
  };

 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); 
  };
  
  return (
    <Box 
       sx={{ pt: 11 ,
        pb: 10,
        pl: 6,
        pr: 4,
        height:'84vh',
        width:'96%',
        backgroundColor: '#D9D9D9',
        marginTop: -8,
        marginLeft: -3,
        zIndex: -1,
        
     }}
    >
    
      
      <TableContainer component={Paper}
       >
      <Box 
         sx={{
          position:'absolute',
          display: 'flex',
          flexDirection: 'column',
          marginLeft: 2, 
          pt: 4
          }}>
        <Typography variant= "h5" >Title</Typography>
        </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 2,
          marginRight: 2,
          marginTop: 10,
          marginLeft: 2,
          padding:2,
        }}
      >
        
        <TextField
          label="Enter Name"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ marginRight: 2 }}
          
        />
    <Select
    value={selectProperty} 
    displayEmpty
    onChange={updateProperty}
    size="small" 
    sx={{ marginRight: 90 }}
>
    <MenuItem value="" disabled>Property</MenuItem>
    <MenuItem value={1}>P1</MenuItem>
    <MenuItem value={2}>P2</MenuItem>
    <MenuItem value={3}>P3</MenuItem>
</Select>
<Button variant="outlined" sx={{marginRight: 2}}>Action</Button>
        <Button variant="contained">Action</Button>
      </Box>

        <Table  sx={{ border: '1px solid #ccc' ,ml:2, pr:15, mr:2,maxWidth: '94%' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ border: '1px solid #ccc',padding: '8px 16px',width: '5%'}}></TableCell>
              <TableCell sx={{ border: '1px solid #ccc', padding: '8px 16px', width: '20%'  }}>Company</TableCell>
              <TableCell sx={{ border: '1px solid #ccc', padding: '8px 16px' , width: '20%' }}>Position</TableCell>
              <TableCell sx={{ border: '1px solid #ccc', padding: '8px 16px' , width: '20%' }}>Date</TableCell>
              <TableCell sx={{ border: '1px solid #ccc', padding: '8px 16px', width: '20%'  }}>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCompanies
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((company, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ border: '1px solid #ccc',padding: '8px 16px',width: '5%'}}><Checkbox color='primary'/></TableCell>
                  <TableCell sx={{ border: '1px solid #ccc', padding: '8px 16px' }}>{company.name}</TableCell>
                  <TableCell sx={{ border: '1px solid #ccc', padding: '8px 16px' }}>{company.position}</TableCell>
                  <TableCell sx={{ border: '1px solid #ccc', padding: '8px 16px' }}>{company.date}</TableCell>
                  <TableCell sx={{ border: '1px solid #ccc', padding: '8px 16px' }}>{company.date}{company.location}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredCompanies.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default DataTable;

