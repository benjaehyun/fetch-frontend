import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Alert, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../components/auth/AuthProvider';
import DogCard from '../components/search/DogCard';
import MatchDisplay from '../components/favorites/MatchDisplay';
import FetchAPI from '../utils/api';

const Favorites = () => {
  const { favorites, toggleFavorite, matchState, generateMatch } = useAuth();
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // sort dogs to show matched dog first, memoization will be useful when we persist dogs list
  const organizedDogs = React.useMemo(() => {
    if (!matchState.matchedDogId || dogs.length === 0) return dogs;
    return dogs.sort((a, b) => 
      a.id === matchState.matchedDogId ? -1 : b.id === matchState.matchedDogId ? 1 : 0
    );
  }, [dogs, matchState.matchedDogId]);

  // Initial fetch for most up-to-date info on favorites
  useEffect(() => {
    const fetchFavoriteDogs = async () => {
      if (favorites.size === 0) {
        setDogs([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const dogIds = Array.from(favorites);
        const fetchedDogs = await FetchAPI.getDogsByIds(dogIds);
        setDogs(fetchedDogs);
        setError(null);
      } catch (err) {
        setError('Failed to fetch favorite dogs');
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteDogs();
  }, []); 

  // Local handler for favorite toggle that updates state immediately, no need to refetch 
  const handleToggleFavorite = (dogId) => {
    toggleFavorite(dogId);
    setDogs(prev => prev.filter(dog => dog.id !== dogId));
  };

  

    if (loading) {
        return (
            <Container maxWidth="lg">
                <Box sx={{ py: 4, textAlign: 'center' }}>
                <CircularProgress />
                </Box>
            </Container>
        );
    }

    if (error) {
        return (
          <Container maxWidth="lg">
            <Box sx={{ py: 4 }}>
              <Alert severity="error">{error}</Alert>
            </Box>
          </Container>
        );
    }

  if (dogs.length === 0) {
    return (
        <Container maxWidth="lg">
            <Box sx={{ 
            py: 4, 
            textAlign: 'center' 
            }}>
                <Typography variant="h5" gutterBottom>
                    You haven't favorited any dogs yet!
                </Typography>
                <Button 
                    component={Link} 
                    to="/" 
                    variant="contained"
                >
                    Browse Dogs
                </Button>
            </Box>
        </Container>
    );
  }

  return (
    <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
            {/* Header with title and button to match */}
            <Box sx={{ 
                mb: 4, 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2
            }}>
                <Typography variant="h4">
                Favorited Dogs ({dogs.length})
                </Typography>
                {/* only render button if no match has been generated */}
                {!matchState.matchedDogId && (
                <Button
                    variant="contained"
                    onClick={generateMatch}
                    disabled={dogs.length === 0}
                >
                    Find Your Match!
                </Button>
                )}
            </Box>
            
    
            {/* main content */}
            <Box sx={{ position: 'relative' }}>
                {/* animated match display */}
                <AnimatePresence mode="wait">
                    {matchState.matchedDogId && !matchState.isExpanded && (
                    // Used absolute positioning and opacity for grid to avoid animation bug 
                    <Box sx={{ position: 'absolute', width: '100%', zIndex: 1 }}> 
                        <MatchDisplay 
                        key="match-display"
                        matchedDog={dogs.find(dog => dog.id === matchState.matchedDogId)}
                        onRemove={handleToggleFavorite}
                        />
                    </Box>
                    )}
                </AnimatePresence>
        
                {/* use similar grid layout for displaying favorites */}
                <Box sx={{ 
                    opacity: matchState.matchedDogId && !matchState.isExpanded ? 0 : 1,
                    transition: 'opacity 0.2s ease-in-out',
                    visibility: matchState.matchedDogId && !matchState.isExpanded ? 'hidden' : 'visible' 
                }}>
                    <Grid container spacing={2}>
                    {organizedDogs.map((dog) => (
                        <Grid key={dog.id} size={{xs: 12, sm: 6, md: 4, lg: 3}} >
                            <Box sx={{ height: '100%', p: 1 }}>
                                <DogCard
                                dog={dog}
                                isFavorite={true}
                                isMatch={dog.id === matchState.matchedDogId}
                                onToggleFavorite={() => handleToggleFavorite(dog.id)}
                                />
                            </Box>
                        </Grid>
                    ))}
                    </Grid>
                </Box>
            </Box>
        </Box>
    </Container>
  );
};

export default Favorites;