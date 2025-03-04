// src/components/Dashboard.js
import React, { useState } from 'react';
import { 
  Card, 
  Typography, 
  Box, 
  TextField,
  Grid 
} from '@mui/material';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';

const Dashboard = ({ departments }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for monthly income
  const monthlyData = [
    { month: 'Jan', income: 4000 },
    { month: 'Feb', income: 3000 },
    { month: 'Mar', income: 2000 },
    { month: 'Apr', income: 2780 },
    { month: 'May', income: 1890 },
    { month: 'Jun', income: 2390 },
  ];

  // Mock data for department analytics
  const departmentAnalytics = departments.map(dept => ({
    ...dept,
    totalIGP: Math.floor(Math.random() * 50000),
    trend: Math.random() > 0.5 ? 'increasing' : 'decreasing'
  }));

  const filteredDepartments = departmentAnalytics.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        IGP Dashboard
      </Typography>

      <TextField
        fullWidth
        label="Search Departments"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Monthly Income Overview
        </Typography>
        <BarChart
          width={800}
          height={300}
          data={monthlyData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#8884d8" />
        </BarChart>
      </Box>

      <Grid container spacing={3}>
        {filteredDepartments.map((dept) => (
          <Grid item xs={12} md={6} lg={3} key={dept.id}>
            <Card 
              sx={{ 
                p: 2, 
                borderTop: 5, 
                borderColor: dept.color 
              }}
            >
              <Typography variant="h6" gutterBottom>
                {dept.name}
              </Typography>
              <Typography variant="body1">
                Total IGP: ₱{dept.totalIGP.toLocaleString()}
              </Typography>
              <Typography 
                variant="body2" 
                color={dept.trend === 'increasing' ? 'success.main' : 'error.main'}
              >
                Trend: {dept.trend}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;