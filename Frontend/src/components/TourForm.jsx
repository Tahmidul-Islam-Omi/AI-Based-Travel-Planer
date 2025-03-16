import { CalendarMonth, Info, LocationOn, Wallet } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState } from 'react';

const TourForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    destination: '',
    startDate: null,
    endDate: null,
    budget: '',
    additionalInfo: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDateChange = (name, date) => {
    setFormData({
      ...formData,
      [name]: date
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.destination.trim()) {
      newErrors.destination = 'Destination is required';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }

    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      newErrors.endDate = 'End date must be after start date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 2,
        background: 'linear-gradient(to right bottom, #ffffff, #f8f9fa)'
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Plan Your Dream Tour
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Fill in the details below to start planning your perfect getaway
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          required
          margin="normal"
          id="destination"
          name="destination"
          label="Destination"
          value={formData.destination}
          onChange={handleChange}
          error={!!errors.destination}
          helperText={errors.destination}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOn color="primary" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <FormControl fullWidth error={!!errors.startDate}>
              <DatePicker
                label="Start Date"
                value={formData.startDate}
                onChange={(date) => handleDateChange('startDate', date)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    fullWidth
                    error={!!errors.startDate}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarMonth color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
              {errors.startDate && <FormHelperText>{errors.startDate}</FormHelperText>}
            </FormControl>

            <FormControl fullWidth error={!!errors.endDate}>
              <DatePicker
                label="End Date"
                value={formData.endDate}
                onChange={(date) => handleDateChange('endDate', date)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    fullWidth
                    error={!!errors.endDate}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarMonth color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
              {errors.endDate && <FormHelperText>{errors.endDate}</FormHelperText>}
            </FormControl>
          </Box>
        </LocalizationProvider>

        <TextField
          fullWidth
          margin="normal"
          id="budget"
          name="budget"
          label="Budget (Optional)"
          type="number"
          value={formData.budget}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Wallet color="primary" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          margin="normal"
          id="additionalInfo"
          name="additionalInfo"
          label="Additional Information (Optional)"
          multiline
          rows={4}
          value={formData.additionalInfo}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Info color="primary" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          sx={{
            mt: 2,
            py: 1.5,
            borderRadius: 2,
            background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
            boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)',
            '&:hover': {
              background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
            }
          }}
        >
          Plan My Tour
        </Button>
      </Box>
    </Paper>
  );
};

export default TourForm; 