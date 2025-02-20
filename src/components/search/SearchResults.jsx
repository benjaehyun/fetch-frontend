import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import { CircularProgress, Alert, Box } from '@mui/material';
import FetchAPI from '../../utils/api';
import DogCard from './DogCard';
import PageControls from './PageControls';

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

const PAGE_SIZE = 25; // number of results from api 

const SearchResults = ({ searchState }) => {
    const [results, setResults] = useState({
        dogs: [],
        loading: true,
        error: null
    });
    const [favorites, setFavorites] = useState(new Set());
    const [pagination, setPagination] = useState({
        from: 0,
        total: 0
    });

    const fetchDogs = async (from = 0) => {
        setResults(prev => ({ ...prev, loading: true, error: null }));
        
        try {
        // build search params
        const params = {
            sort: searchState.sort,
            from,
        };

        if (searchState.breeds.length > 0) {
            params.breeds = searchState.breeds;
        }
        if (searchState.zipCodes.length > 0) {
            params.zipCodes = searchState.zipCodes;
        }
        if (searchState.ageMin > 0) {
            params.ageMin = searchState.ageMin;
        }
        if (searchState.ageMax < 20) {
            params.ageMax = searchState.ageMax;
        }

        const searchResults = await FetchAPI.searchDogs(params);
        
        // Be sure to reset relevant state when there are no results 
        if (searchResults.resultIds.length === 0) {
            setResults({
                dogs: [],
                loading: false,
                error: null
            });
            setPagination({ from: 0, total: 0 });
            return;
        }

        const dogDetails = await FetchAPI.getDogsByIds(searchResults.resultIds);
        setResults({
            dogs: dogDetails,
            loading: false,
            error: null
        });
        

        setPagination({
            from,
            total: searchResults.total
        });

        } catch (err) {
            setResults({
                dogs: [],
                loading: false,
                error: 'Failed to fetch dogs. Please try again.'
            });
        }
    };

    // initial search and subsequent searches that are triggered
    useEffect(() => {
        if (!results.loading && !searchState.isSearching) return;
        fetchDogs(0); // Reset to first page on new search
    }, [searchState.isSearching]);

    const handlePageChange = (direction) => {
        const newFrom = direction === 'next' 
        ? pagination.from + PAGE_SIZE 
        : Math.max(0, pagination.from - PAGE_SIZE);
        
        fetchDogs(newFrom);
    };

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

    const currentPage = Math.floor(pagination.from / PAGE_SIZE) + 1;
    const hasNextPage = pagination.from + PAGE_SIZE < pagination.total;
    const hasPrevPage = pagination.from > 0;

    return (
        <Box>
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
            
            <PageControls
            totalResults={pagination.total}
            currentPage={currentPage}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            onPageChange={handlePageChange}
            />
        </Box>
    );
}

export default SearchResults;