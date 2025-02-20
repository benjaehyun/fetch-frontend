import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import DogCard from '../search/DogCard';
import { useAuth } from '../auth/AuthProvider';

const MatchDisplay = ({ matchedDog, onRemove }) => {
    const { toggleMatchExpanded } = useAuth();
    
    if (!matchedDog) return null;

    return (
        // use the bounce animation when we get a match 
        <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: -20 }}
        transition={{ type: "spring", duration: 0.6 }}
        >
            <Box 
            sx={{ 
                maxWidth: 400,
                mx: 'auto',
                mb: 4
            }}>
                {/* reuse DogCard with new props for handling additional match ui */}
                <DogCard 
                dog={matchedDog} 
                isMatch={true}
                isFavorite={true}
                onToggleFavorite={onRemove}
                />
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                >
                    <Stack 
                        direction="row" 
                        spacing={2} 
                        justifyContent="center" 
                        sx={{ mt: 2 }}
                    >
                        <Button
                        variant="contained"
                        onClick={toggleMatchExpanded}
                        >
                            Show All Favorites
                        </Button>
                        <Button
                        variant="outlined"
                        color="error"
                        onClick={() => onRemove(matchedDog.id)}
                        >
                        Remove Match
                        </Button>
                    </Stack>
                </motion.div>
            </Box>
        </motion.div>
    );
};

export default MatchDisplay;