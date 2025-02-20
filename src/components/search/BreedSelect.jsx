import React, { useState, useEffect } from 'react';
import { 
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Chip,
    Alert,
    IconButton
} from '@mui/material';
import { Close as CloseIcon, Search as SearchIcon } from '@mui/icons-material';
import FetchAPI from '../../utils/api';

const styles = {
    selectionContainer: {
        display: 'flex',
        gap: 1
    },
    formControl: {
        flex: 1
    },
    searchButton: {
        alignSelf: 'start',
        mt: 1  
    },
    chipContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1,
        mt: 1
    },
    chip: {
        mb: 1
    }
};

const BreedSelect = ({ selectedBreeds, onBreedsChange, onSearch }) => {
    const [breeds, setBreeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // get most up-to date list of breeds from api when we mount this component 
    useEffect(() => {
        const fetchBreeds = async () => {
        try {
            const breedList = await FetchAPI.getBreeds();
            setBreeds(breedList);
            setError(null);
        } catch (err) {
            setError('Failed to load breeds');
        } finally {
            setLoading(false);
        }
        };

        fetchBreeds();
    }, []);

    // adjust to append to array of breeds for multiple selection
    const handleBreedSelect = (event) => {
        const breed = event.target.value;
        if (!breed) return;

        const newBreeds = [...selectedBreeds, breed];
        onBreedsChange(newBreeds.length === breeds.length ? [] : newBreeds);
    };

    const handleRemoveBreed = (breedToRemove) => {
        onBreedsChange(selectedBreeds.filter(breed => breed !== breedToRemove));
    };

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    // Filter out already selected breeds
    const availableBreeds = breeds.filter(breed => !selectedBreeds.includes(breed));

    return (
        <Box>
            <Box sx={styles.selectionContainer}>
                <FormControl sx={styles.formControl}>
                    <InputLabel>Filter by Breed</InputLabel>
                    <Select
                        value=""
                        label="Filter by Breed"
                        onChange={handleBreedSelect}
                        disabled={loading || availableBreeds.length === 0}
                        // added for aria warning
                        MenuProps={{
                            autoFocus: false, 
                            disableAutoFocusItem: true
                        }}
                    >
                        {availableBreeds.map((breed) => (
                            <MenuItem key={breed} value={breed}>
                                {breed}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {/* Second search button for easy way to search on mobile and desktop */}
                <IconButton 
                onClick={onSearch}
                sx={styles.searchButton}
                aria-label="Search dogs"
                >
                    <SearchIcon />
                </IconButton>
            </Box>
            
            {/* Chips with selected breeds that can be removed with a click */}
            <Box sx={styles.chipContainer}>
                {selectedBreeds.length === 0 ? (
                    <Chip 
                    label="All Breeds" 
                    variant="outlined" 
                    sx={styles.chip}
                    />
                ) : (
                    selectedBreeds.map((breed) => (
                        <Chip
                        key={breed}
                        label={breed}
                        onDelete={() => handleRemoveBreed(breed)}
                        deleteIcon={<CloseIcon />}
                        sx={styles.chip}
                        />
                    ))
                )}
            </Box>
        </Box>
    );
};

export default BreedSelect;