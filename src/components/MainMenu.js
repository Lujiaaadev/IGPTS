import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, Typography, Box } from '@mui/material';
import './MainMenu.css';

const MainMenu = ({ departments }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Departments
      </Typography>
      <Grid container spacing={3}>
        {departments.map((dept) => (
          <Grid item xs={12} md={6} lg={4} key={dept.id}>
            <Card 
              className="department-card"
              onClick={() => navigate(`/department/${dept.id}`)}
              sx={{ 
                cursor: 'pointer',
                borderLeft: 5,
                borderColor: dept.color,
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 3
                }
              }}
            >
              <Typography variant="h6">{dept.name}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MainMenu;