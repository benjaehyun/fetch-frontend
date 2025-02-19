import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import { CircularProgress, Alert, Box } from '@mui/material';
import FetchAPI from '../../utils/api';
import DogCard from './DogCard';

const styles = {
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    p: 4
  },
  gridItem: {
    width: {
      xs: '100%',
      sm: '50%',
      md: '33.333%',
      lg: '25%'
    }
  }
};

// Helper to build clean search params without extra utility state
const buildSearchParams = (state) => {
  const params = { sort: state.sort };

  if (state.breeds.length > 0) {
    params.breeds = state.breeds
  }
  if (state.zipCodes.length > 0) {
    params.zipCodes = state.zipCodes
  }

  // Only add age filters if they are different from the default values
  if (state.ageMin > 0) {
    params.ageMin = state.ageMin;
  }
  if (state.ageMax < 20) {
    params.ageMax = state.ageMax;
  }

  return params;
};

const SearchResults = ({ searchState }) => {
    const [results, setResults] = useState({
      dogs: [],
      loading: true,
      error: null
    });
    const [favorites, setFavorites] = useState(new Set());
  
    useEffect(() => {
      const fetchDogs = async () => {
        if (!results.loading && !searchState.isSearching) return;
  
        setResults(prev => ({ ...prev, loading: true, error: null }));
        
        try {
          // build search params
          const searchParams = buildSearchParams(searchState);
          const searchResults = await FetchAPI.searchDogs(searchParams);
          
          if (searchResults.resultIds.length === 0) {
            setResults({
              dogs: [],
              loading: false,
              error: null
            });
            return;
          }
  
          const dogDetails = await FetchAPI.getDogsByIds(searchResults.resultIds);
          setResults({
            dogs: dogDetails,
            loading: false,
            error: null
          });
  
        } catch (err) {
          setResults({
            dogs: [],
            loading: false,
            error: 'Failed to fetch dogs. Please try again.'
          });
        }
      };
  
      fetchDogs();
    }, [searchState.isSearching]);
  
    const handleToggleFavorite = (dog) => {
      setFavorites(prev => {
        const newFavorites = new Set(prev);
        if (newFavorites.has(dog.id)) {
          newFavorites.delete(dog.id);
        } else {
          newFavorites.add(dog.id);
        }
        return newFavorites;
      });
    };
  
    if (results.loading) {
      return (
        <Box sx={styles.loadingContainer}>
          <CircularProgress />
        </Box>
      );
    }
  
    if (results.error) {
      return <Alert severity="error">{results.error}</Alert>;
    }
  
    if (results.dogs.length === 0) {
      return <Alert severity="info">No dogs found matching your criteria. Try adjusting your filters!</Alert>;
    }
  
    return (
      <Grid container>
        {results.dogs.map((dog) => (
          <Grid key={dog.id} item sx={styles.gridItem}>
            <Box p={1}>
              <DogCard
                dog={dog}
                isFavorite={favorites.has(dog.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  };
  
  export default SearchResults;