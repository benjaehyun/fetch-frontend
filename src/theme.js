import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#230F2F',  
            light: '#2d1440',  
            dark: '#1a0b23',   
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#130C21',  
            light: '#1a112b',
            dark: '#0c0715',
            contrastText: '#ffffff',
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
            root: {
                backgroundColor: '#130C21', 
            },
            },
        },
        MuiSlider: {
            styleOverrides: {
                root: {
                    color: '#230F2F', 
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    '&.MuiButton-contained': {
                        backgroundColor: '#230F2F',
                        '&:hover': {
                            backgroundColor: '#2d1440',
                        },
                    },
                    '&.MuiButton-outlined': {
                        borderColor: '#230F2F',
                        color: '#230F2F',
                        '&:hover': {
                            borderColor: '#2d1440',
                            backgroundColor: 'rgba(35,15,47,0.04)',
                        },
                    },
                },
            },
        },
        MuiBadge: {
            styleOverrides: {
                badge: {
                    backgroundColor: '#ffffff', 
                    color: '#130C21',          
                    border: '1px solid #130C21'
                }
            }
        },
    },
});
  
  export default theme;