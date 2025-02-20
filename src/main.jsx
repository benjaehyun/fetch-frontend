import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import theme from './theme.js'
import { ThemeProvider } from '@mui/material/styles'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    // pass down theme for new colors 
    <StrictMode>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </StrictMode>,
)
