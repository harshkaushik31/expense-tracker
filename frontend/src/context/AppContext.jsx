// frontend/src/context/AppContext.jsx

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const navigate = useNavigate();

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // To handle loading state

    // Centralized login function
    const login = async (email, password) => {
        setLoading(true);
        try {
            const { data } = await axios.post('/api/v1/user/login', { email, password });
            if (data.success) {
                const { token: receivedToken, user: userData } = data.data;

                // Set token and user data
                setToken(receivedToken);
                setUser(userData);
                axios.defaults.headers.common['Authorization'] = `Bearer ${receivedToken}`;
                localStorage.setItem('token', receivedToken);
                navigate('/home'); // Navigate to home after successful login
            }
        } catch (error) {
            console.error("Login failed:", error);
            // Optionally: show an error toast to the user
        } finally {
            setLoading(false);
        }
    };
    
    // Function to fetch the user's complete data
    const fetchUser = async () => {
        if (token) {
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const { data } = await axios.get('/api/v1/user/userData');
                if (data.success) {
                    setUser(data.data);
                } else {
                    // If token is invalid, log the user out
                    logout();
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                logout();
            }
        }
        setLoading(false);
    };

    // Centralized logout function
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
        navigate('/login');
    };

    // Effect to run on initial app load
    useEffect(() => {
        fetchUser();
    }, [token]);

    const value = {
        token,
        setToken,
        user,
        setUser,
        login,
        logout,
        fetchUser,
        loading, // Provide loading state to components
        axios
    };

    return (
        <AppContext.Provider value={value}>
            {!loading && children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};