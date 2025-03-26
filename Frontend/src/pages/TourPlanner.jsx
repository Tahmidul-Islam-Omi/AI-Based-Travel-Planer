/* eslint-disable no-unused-vars */
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Snackbar,
  Step,
  StepLabel,
  Stepper,
  Typography
} from '@mui/material';
import { useState } from 'react';
import TourForm from '../components/TourForm';
import TourItinerary from '../components/TourItinerary';
import TourSummary from '../components/TourSummary';
import { generateTourItinerary, saveTourPlan } from '../services/geminiService';

const TourPlanner = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [tourData, setTourData] = useState(null);
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleFormSubmit = async (data) => {
    setTourData(data);
    setActiveStep(1);

    // Generate itinerary using Gemini
    try {
      setLoading(true);
      setError(null);
      const generatedItinerary = await generateTourItinerary(data);
      setItinerary(generatedItinerary);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setActiveStep(0);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await saveTourPlan(tourData, itinerary);
      setSnackbar({
        open: true,
        message: 'Tour plan saved successfully!',
        severity: 'success'
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Failed to save tour plan. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handleReset = () => {
    setTourData(null);
    setItinerary(null);
    setActiveStep(0);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
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
          <TourForm onSubmit={handleFormSubmit} initialData={tourData} />
        ) : (
          <Box>
            <TourSummary tourData={tourData} />

            <TourItinerary
              itinerary={itinerary}
              loading={loading}
              error={error}
            />

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
              <Button
                variant="outlined"
                onClick={handleEdit}
                size="large"
                startIcon={<EditIcon />}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  borderColor: '#1976d2',
                  color: '#1976d2',
                  '&:hover': {
                    borderColor: '#0d47a1',
                    backgroundColor: 'rgba(25, 118, 210, 0.04)'
                  }
                }}
              >
                Rewrite Tour Details
              </Button>

              <Button
                variant="contained"
                onClick={handleSave}
                size="large"
                disabled={loading || !itinerary}
                startIcon={<SaveIcon />}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                  boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                  }
                }}
              >
                Save Tour Plan
              </Button>
            </Box>
          </Box>
        )}
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TourPlanner; 