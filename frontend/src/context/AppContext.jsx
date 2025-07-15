import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    
    const navigate = useNavigate();

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    const fetchUser =  async () => {
        try {
            const {data} = await axios.get('/api/v1/user/userData');
            if( data.success == true ){
                setUser(data.data);
            }else{
                navigate('/');
            }
        }
        catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const logout = async () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        axios.defaults.headers.common[`Authorization`] = ``
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            axios.defaults.headers.common[`Authorization`] = `Bearer ${storedToken}`;
            fetchUser();
        }
    }, []);

    const value = {
        navigate,
        logout,
        fetchUser,
        token,
        setToken,
        user,
        setUser,
        axios
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
