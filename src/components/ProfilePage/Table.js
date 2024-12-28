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
  TablePagination,
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
    // Add more companies as needed
  ];

  const [filteredCompanies, setFilteredCompanies] = useState(companies);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  
  const handleSearchChange = (event) => {
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
    setRowsPerPage(parseInt(event.target.value, 8));
    setPage(0); 
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 2,
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ marginRight: 2, flexGrow: 1 }}
        />
        <Select defaultValue="" size="small" sx={{ marginRight: 2 }}>
          <MenuItem value="property">Property</MenuItem>
        </Select>
        <Button variant="contained">Filter</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCompanies
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((company, index) => (
                <TableRow key={index}>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>{company.position}</TableCell>
                  <TableCell>{company.date}</TableCell>
                  <TableCell>{company.location}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
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

