import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CircularProgress, Box, Typography } from '@mui/material';

const GoogleAuthCallback = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setIsAuthenticated, setUser } = useAuth();
    
    useEffect(() => {
        const handleGoogleAuth = () => {
            const params = new URLSearchParams(location.search);
            const token = params.get('token');
            
            if (token) {
                // Save token to localStorage
                localStorage.setItem('token', token);
                
                // Fetch user info or decode JWT to get user data
                // For simplicity, we'll just set authenticated state
                setIsAuthenticated(true);
                
                // Redirect to tour planner
                navigate('/tour-planner');
            } else {
                // Handle error
                navigate('/login');
            }
        };
        
        handleGoogleAuth();
    }, [location, navigate, setIsAuthenticated, setUser]);
    
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