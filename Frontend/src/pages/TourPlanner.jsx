import {
    Box,
    Button,
    Container,
    Paper,
    Step,
    StepLabel,
    Stepper,
    Typography
} from '@mui/material';
import { useState } from 'react';
import TourForm from '../components/TourForm';
import TourSummary from '../components/TourSummary';

const TourPlanner = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [tourData, setTourData] = useState(null);
  
  const handleFormSubmit = (data) => {
    setTourData(data);
    setActiveStep(1);
  };
  
  const handleReset = () => {
    setTourData(null);
    setActiveStep(0);
  };
  
  const steps = ['Plan Your Tour', 'Review Details'];

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: { xs: 2, md: 4 }, 
          borderRadius: 3,
          background: 'linear-gradient(to right bottom, #e3f2fd, #bbdefb)',
          mb: 4
        }}
      >
        <Typography 
          variant="h3" 
          component="h1" 
          align="center" 
          gutterBottom
          sx={{ 
            fontWeight: 'bold', 
            color: '#0d47a1',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
          }}
        >
          Dream Tour Planner
        </Typography>
        <Typography 
          variant="h6" 
          align="center" 
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          Plan your perfect getaway in just a few clicks
        </Typography>
      </Paper>
      
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 5 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <Box>
        {activeStep === 0 ? (
          <TourForm onSubmit={handleFormSubmit} />
        ) : (
          <Box>
            <TourSummary tourData={tourData} />
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button 
                variant="outlined" 
                onClick={handleReset}
                size="large"
                sx={{ borderRadius: 2, px: 4 }}
              >
                Plan Another Tour
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default TourPlanner; 