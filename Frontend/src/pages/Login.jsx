import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Container,
    IconButton,
    InputAdornment,
    Link,
    Paper,
    Snackbar,
    TextField,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
// Update the import to include Link from react-router-dom
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// Update imports to include useAuth
import { useAuth } from '../context/AuthContext';
// Add this import
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
    const navigate = useNavigate();
    // This line already destructures login, loading, and authError
    const { login, loading, error: authError } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const newErrors = {};

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Inside the Login component:
    // Remove this duplicate declaration:
    // const { login } = useAuth();

    // Update the handleSubmit function:
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Call the login function from AuthContext
            const result = await login({
                email: formData.email,
                password: formData.password
            });

            if (result.success) {
                setSnackbar({
                    open: true,
                    message: 'Login successful!',
                    severity: 'success'
                });

                // Navigate to TourPlanner after a short delay
                setTimeout(() => {
                    navigate('/tour-planner');
                }, 1500);
            } else {
                setSnackbar({
                    open: true,
                    message: result.error || 'Login failed',
                    severity: 'error'
                });
            }
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({
            ...snackbar,
            open: false
        });
    };

    // Show auth error in snackbar if it exists
    useEffect(() => {
        if (authError) {
            setSnackbar({
                open: true,
                message: authError,
                severity: 'error'
            });
        }
    }, [authError]);

    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2, background: 'linear-gradient(to right bottom, #ffffff, #f8f9fa)' }}>
                <Typography
                    variant="h4"
                    component="h1"
                    align="center"
                    gutterBottom
                    sx={{ fontWeight: 'bold', color: '#1976d2' }}
                >
                    Welcome Back
                </Typography>

                <Typography
                    variant="body1"
                    color="text.secondary"
                    align="center"
                    sx={{ mb: 4 }}
                >
                    Sign in to continue your journey planning
                </Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Email color="primary" />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ mb: 3 }}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock color="primary" />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        sx={{ mb: 3 }}
                    />

                    {/* Regular sign in button */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        disabled={loading}
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
                        {loading ? 'Signing In...' : 'Sign In'}
                    </Button>

                    {/* Google sign in button */}
                    <Button
                        fullWidth
                        variant="outlined"
                        size="large"
                        startIcon={<GoogleIcon />}
                        onClick={() => window.location.href = 'https://voyagebot.vercel.app/api/v1/auth/google'}
                        sx={{
                            mt: 2,
                            py: 1.5,
                            borderRadius: 2,
                            borderColor: '#4285F4',
                            color: '#4285F4',
                            '&:hover': {
                                borderColor: '#3367D6',
                                backgroundColor: 'rgba(66, 133, 244, 0.04)',
                            }
                        }}
                    >
                        Sign in with Google
                    </Button>

                    {/* Sign up link */}
                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Typography variant="body2">
                            Don't have an account?{' '}
                            <Link
                                component={RouterLink}
                                to="/register"
                                underline="hover"
                                sx={{ fontWeight: 'bold', cursor: 'pointer' }}
                            >
                                Sign Up
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Paper>

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

export default Login;
