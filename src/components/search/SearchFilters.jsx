import React, { useState } from 'react';
import { 
    Paper, 
    Box, 
    Slider, 
    TextField, 
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Collapse,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { 
    FilterList as FilterListIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
    Clear as ClearIcon,
} from '@mui/icons-material';

const styles = {
    paper: {
        p: 2,
        position: { md: 'sticky' },
        top: { md: 16 }
    },
    mobileHeader: {
        p: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    contentContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2
    },
    buttonContainer: {
        display: 'flex',
        gap: 1
    },
    clearIcon: {
        fontSize: 20,
        width: 20,
        height: 20, 
        mr: 0
    }
};

const sortOptions = [
    { value: 'breed:asc', label: 'Breed (A-Z)' },
    { value: 'breed:desc', label: 'Breed (Z-A)' },
    { value: 'name:asc', label: 'Name (A-Z)' },
    { value: 'name:desc', label: 'Name (Z-A)' },
    { value: 'age:asc', label: 'Age (Youngest First)' },
    { value: 'age:desc', label: 'Age (Oldest First)' }
];

const SearchFilters = ({ 
    searchState,
    onSearchUpdate,
    onSearch
}) => {
    const [expanded, setExpanded] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleAgeRangeChange = (_, newValue) => {
        onSearchUpdate('update', {
        ageMin: newValue[0],
        ageMax: newValue[1]
        });
    };

    const handleZipCodeChange = (event) => {
        const value = event.target.value.replace(/\D/g, '').slice(0, 5);
        onSearchUpdate('update', {
        zipCodes: value ? [value] : []
        });
    };

    const handleSortChange = (event) => {
        onSearchUpdate('update', {
        sort: event.target.value
        });
    };

    const handleReset = () => {
        onSearchUpdate('reset');
    };

    const filterContent = (
        <Box sx={styles.contentContainer}>
            <Box>
                <Typography variant="subtitle2" gutterBottom>
                    Age Range (years)
                </Typography>
                <Slider
                size="small"
                value={[searchState.ageMin, searchState.ageMax]}
                onChange={handleAgeRangeChange}
                valueLabelDisplay="auto"
                min={0}
                max={14}
                step={1}
                />
            </Box>

            <TextField
            label="Zip Code"
            value={searchState.zipCodes[0] || ''}
            onChange={handleZipCodeChange}
            slotProps={{
                input: {
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    'aria-label': 'Filter by zip code'
                }
            }}
            size="small"
            />

            <FormControl size="small">
                <InputLabel>Sort By</InputLabel>
                <Select
                value={searchState.sort}
                label="Sort By"
                onChange={handleSortChange}
                >
                    {sortOptions.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Box sx={styles.buttonContainer}>
                <Button
                variant="contained"
                onClick={onSearch}
                >
                    Search
                </Button>
                <Button
                variant="outlined"
                onClick={handleReset}
                startIcon={<ClearIcon sx={styles.clearIcon} />}
                >
                    Reset
                </Button>
            </Box>
        </Box>
    );

    if (isMobile) {
        return (
        <Paper sx={styles.paper}>
            <Box sx={styles.mobileHeader}>
                <Button
                startIcon={<FilterListIcon />}
                endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                onClick={() => setExpanded(!expanded)}
                fullWidth
                >
                    Filters
                </Button>
            </Box>
            <Collapse in={expanded}>
                <Box sx={{ p: 2 }}>
                    {filterContent}
                </Box>
            </Collapse>
        </Paper>
        );
    }

    return (
        <Paper sx={styles.paper}>
            {filterContent}
        </Paper>
    );
};

export default SearchFilters;