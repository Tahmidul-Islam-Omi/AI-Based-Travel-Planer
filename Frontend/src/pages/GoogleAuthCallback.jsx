import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CircularProgress, Box, Typography } from '@mui/material';

const GoogleAuthCallback = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // Remove the unused auth hook entirely
    
    useEffect(() => {
        const handleGoogleAuth = async () => {
            const params = new URLSearchParams(location.search);
            const token = params.get('token');
            
            if (token) {
                // Save token to localStorage
                localStorage.setItem('token', token);
                
                // Redirect to tour planner after a short delay
                setTimeout(() => {
                    navigate('/tour-planner');
                    // Force a page reload to ensure the auth state is updated
                    window.location.reload();
                }, 1000);
            } else {
                // Handle error
                navigate('/login');
            }
        };
        
        handleGoogleAuth();
    }, [location, navigate]);
    
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <CircularProgress />
            <Typography variant="h6" sx={{ mt: 2 }}>
                Completing authentication...
            </Typography>
        </Box>
    );
};

export default GoogleAuthCallback;