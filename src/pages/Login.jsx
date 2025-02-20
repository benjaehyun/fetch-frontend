import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container,
  Box,
  Paper,
  TextField,
  Button,
  Typography, 
  Alert
} from '@mui/material';
import { useAuth } from '../components/auth/AuthProvider';


const Login = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });
    const [isLoading, setIsLoading] = useState(false); 
    const [error, setError] = useState('');

    const navigate = useNavigate(); 
    const {login} = useAuth();  

    // validate email using regex
    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validation = useMemo(() => {
        const nameValid = formData.name.trim().length > 0; 
        const emailValid = isValidEmail(formData.email); 
        return {
            isValid: nameValid && emailValid,
            nameError: formData.name.length > 0 && !nameValid ? 'Name is required' : '',
            emailError: formData.email.length > 0 && !emailValid ? 'Please enter a valid email' : ''
        };
    }, [formData.name, formData.email])

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        // early return if form is not valid 
        if (!validation.isValid) { 
            return;
        }
        setIsLoading(true); 
        setError('');

        try {
            const success = await login(formData.name.trim(), formData.email.trim());
            if(success) {
                navigate('/'); 
            } else {
                setError('Login failed. Please try again.');
            }
        } catch (error) {
            setError('An unexpected error occurred. Please try again.');
            console.error(error);
        } finally {
            setIsLoading(false); 
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target; 
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        if (error) setError(''); // need to be sure to clear the error when making changes to form 
    };

    return (
        <Box
        sx={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
        }}
        >
            <Container maxWidth='sm'>
                <Paper
                elevation={3}
                sx={{
                    p: {xs: 3, sm: 4},
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
                >
                    <Typography 
                    variant='h4'
                    gutterBottom
                    sx={{
                        fontSize: {xs: '1.75rem', sm: '2.125rem'}
                    }}
                    >
                        Welcome to Fetch
                    </Typography>

                    <Typography
                    variant='subtitle1'
                    color='text.secondary'
                    sx={{ mb: 3}}
                    >
                        Find the newest addition to your home
                    </Typography>

                    {error && (
                        <Alert 
                        severity='error'
                        sx={{ width: '100%', mb: 2}}
                        >
                            {error}
                        </Alert>
                    )}

                    <Box 
                    component='form'
                    onSubmit={handleSubmit}
                    sx={{ width: '100%'}}
                    >
                        <TextField
                        fullWidth
                        required
                        label='Name'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isLoading}
                        sx={{mb:2}}
                        error={!!validation.nameError} // error bool 
                        helperText={validation.nameError} // displaying error msg
                        />
                        
                        <TextField
                        fullWidth
                        required
                        label='Email'
                        name='email'
                        type='email'
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isLoading}
                        sx={{mb:2}}
                        error={!!validation.emailError}
                        helperText={validation.emailError}
                        />

                        <Button 
                        type='submit'
                        fullWidth
                        variant='contained'
                        size='large'
                        disabled={isLoading || !validation.isValid} // conditions for when users can submit the login request 
                        sx={{
                            py:1.5,
                            bgcolor: !validation.isValid ? 'action.disabledBackground' : 'primary.main'
                        }}
                        >
                            {isLoading ? 'Logging in' : 'Login'}
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    )
};

export default Login;