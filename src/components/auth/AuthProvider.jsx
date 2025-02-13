import React, {createContext, useContext, useState} from 'react';
import FetchAPI from '../../utils/api';

const AuthContext = createContext(null); 

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 

    const login = async (name, email) => {
        try {
            await FetchAPI.login({ name, email });
            setUser({ name, email });
            return true;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    }

    const logout = async () => {
        try {
            await FetchAPI.logout();
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
  
