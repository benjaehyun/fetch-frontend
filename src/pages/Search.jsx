import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Container } from '@mui/material';
import SearchFilters from '../components/search/SearchFilters';
import SearchResults from '../components/search/SearchResults';
import BreedSelect from '../components/search/BreedSelect';

const defaultSearchState = {
    breeds: [],
    ageMin: 0,
    ageMax: 20,
    zipCodes: [],
    sort: 'breed:asc',
    isSearching: false
};

const styles = {
    container: {
        py: 4
    },
    breedSelect: {
        p: 2,
        mb: 2,
        bgcolor: 'background.paper',
        borderRadius: 1
    },
    
};

const Search = () => {
    const [searchState, setSearchState] = useState(defaultSearchState);
  
    const handleSearchUpdate = (type, payload) => {
        switch (type) {
            case 'reset':
                    setSearchState(defaultSearchState);
                break;
            case 'update':
                setSearchState(prev => ({
                    ...prev,
                    ...payload,
                    isSearching: false 
                }));
                break;
            case 'search':
                setSearchState(prev => ({
                    ...prev,
                    isSearching: true
                }));
                break;
            default:
                console.warn('Unknown update type:', type);
            }
    };

    const handleSearch = () => {
        handleSearchUpdate('search');
    };


    return (
    <Container maxWidth="lg" sx={styles.container}>
      {/* top bar with changes for deprecated grid version*/}
        <Grid item size={{xs: 12}} sx={styles.breedSelect}>  
                <BreedSelect 
                    selectedBreeds={searchState.breeds}
                    onBreedsChange={breeds => handleSearchUpdate('update', { breeds })}
                    onSearch={handleSearch}
                />
            </Grid>

            {/* main content grid */}
            <Grid container spacing={3}>
                <Grid item size={{xs: 12, md: 3}}>
                <SearchFilters 
                    searchState={searchState}
                    onSearchUpdate={handleSearchUpdate}
                    onSearch={handleSearch}
                />
                </Grid>
                
                {/* Results */}
                <Grid item size={{xs: 12, md: 9}}>
                <SearchResults 
                    searchState={searchState}
                />
                </Grid>
        </Grid>
    </Container>
  );
};

export default Search;