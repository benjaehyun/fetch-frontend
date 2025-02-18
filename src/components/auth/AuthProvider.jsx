import React, {createContext, useContext, useState, useEffect} from 'react';
import FetchAPI from '../../utils/api';
import { AUTH_ERROR_EVENT } from '../../utils/api';

const AuthContext = createContext(null); 

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // check to see if the user is currently in a valid session with an initial call 
    useEffect(() => {
        const verifySession = async () => {
            try {
                // check cookie with a call to breeds endpoint, this way we don't store any auth related information even session duration
                await FetchAPI.getBreeds();
                // at this point, we have a valid session
                setUser({ isAuthenticated: true });
                setError(null);
            } catch (error) {
                setUser(null);
                setError('Session expired');
            } finally {
                setIsLoading(false);
            }
        };

        verifySession();
    }, []);

    // using window event listener for auth errors (ie. auth is revoked) to avoid looping issues
    useEffect(() => {
        // clear user state when authorization is revoked
        const handleAuthError = () => {
            setUser(null);
        };
        window.addEventListener(AUTH_ERROR_EVENT, handleAuthError);
        
        return () => {
            window.removeEventListener(AUTH_ERROR_EVENT, handleAuthError);
        };
    }, []);

    const login = async (name, email) => {
        setIsLoading(true);
        try {
            await FetchAPI.login({ name, email });
            // Login successful, we can set user immediately
            setUser({ name, email, isAuthenticated: true });
            setError(null);
            return true;
        } catch (error) {
            setUser(null);
            setError('Login failed');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await FetchAPI.logout();
            // Logout successful, clear user 
            setUser(null);
            setError(null);
        } catch (error) {
            setError('Logout failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, error, isLoading }} >
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
  
