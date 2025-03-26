import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
// Update the API_URL to point to the deployed backend
const API_URL = 'https://voyagebot-git-main-tahmidul-islam-omis-projects.vercel.app/api/v1/auth';

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Check if user is already logged in
    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');
            if (token && storedUser) {
                setUser(JSON.parse(storedUser));
                setIsAuthenticated(true);
            }
        };

        checkAuth();
    }, []);

    const login = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            // Send login request to backend
            const response = await axios.post(`${API_URL}/login`, {
                email: userData.email,
                password: userData.password
            });
            
            // Save token and user data
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            
            // Update state
            setUser(user);
            setIsAuthenticated(true);
            setLoading(false);
            return { success: true };
        } catch (err) {
            setLoading(false);
            const errorMessage = err.response?.data?.message || 'Login failed';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    const register = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            // Send registration request to backend
            // eslint-disable-next-line no-unused-vars
            const response = await axios.post(`${API_URL}/register`, {
                name: userData.name,
                email: userData.email,
                password: userData.password
            });
            
            // Registration successful
            setLoading(false);
            return { success: true };
        } catch (err) {
            setLoading(false);
            const errorMessage = err.response?.data?.message || 'Registration failed';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ 
            isAuthenticated, 
            user, 
            login, 
            register, 
            logout,
            loading,
            error
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);