import {
    CalendarMonth,
    Info,
    LocationOn,
    Wallet
} from '@mui/icons-material';
import {
    Box,
    Chip,
    Divider,
    Paper,
    Stack,
    Typography
} from '@mui/material';
import { format } from 'date-fns';

const TourSummary = ({ tourData }) => {
  const { destination, startDate, endDate, budget, additionalInfo } = tourData;
  
  const formatDate = (date) => {
    if (!date) return 'Not specified';
    return format(new Date(date), 'MMMM dd, yyyy');
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
        Your Tour Summary
      </Typography>
      
      <Divider sx={{ my: 2 }} />
      
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LocationOn color="primary" sx={{ mr: 2, fontSize: 28 }} />
          <Box>
            <Typography variant="body2" color="text.secondary">
              Destination
            </Typography>
            <Typography variant="h6">
              {destination}
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CalendarMonth color="primary" sx={{ mr: 2, fontSize: 28 }} />
          <Box>
            <Typography variant="body2" color="text.secondary">
              Date Range
            </Typography>
            <Typography variant="h6">
              {formatDate(startDate)} - {formatDate(endDate)}
            </Typography>
          </Box>
        </Box>
        
        {budget && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Wallet color="primary" sx={{ mr: 2, fontSize: 28 }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Budget
              </Typography>
              <Typography variant="h6">
                ${budget}
              </Typography>
            </Box>
          </Box>
        )}
        
        {additionalInfo && (
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Info color="primary" sx={{ mr: 2, mt: 0.5, fontSize: 28 }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Additional Information
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {additionalInfo}
              </Typography>
            </Box>
          </Box>
        )}
      </Stack>
      
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Chip 
          label="Tour Planned Successfully!" 
          color="success" 
          variant="outlined" 
          sx={{ fontSize: '1rem', py: 2.5, px: 1 }}
        />
      </Box>
    </Paper>
  );
};

export default TourSummary; 