import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container,
  Box,
  Paper,
  TextField,
  Button,
  Typography
} from '@mui/material';
import { useAuth } from '../components/auth/AuthProvider';


const Login = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });
    const [isLoading, setIsLoading] = useState(false); 
    const navigate = useNavigate(); 
    const {login} = useAuth();  

    const handleSubmit = async (e) => {
        e.prevenDefault(); 
        setIsLoading(true); 

        try {
            const success = await login(formData.name.trim(), formData.email.trim());
            if(success) {
                navigate('/'); 
            }
        } catch (error) {
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
                        />

                        <Button 
                        type='submit'
                        fullWidth
                        variant='contained'
                        size='large'
                        disabled={isLoading}
                        sx={{py:1.5}}
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