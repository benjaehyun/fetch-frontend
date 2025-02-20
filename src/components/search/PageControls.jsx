import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';

const PAGE_SIZE = 25; 

const PageControls = ({ 
    totalResults,
    currentPage,
    hasNextPage,
    hasPrevPage,
    onPageChange
}) => {
  // Calculate the current range being displayed
    const startIndex = (currentPage - 1) * PAGE_SIZE + 1;
    const endIndex = Math.min(currentPage * PAGE_SIZE, totalResults);

    return (
        <Box
        sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 2,
            px: 1
        }}
        >
            <Button
            startIcon={<NavigateBefore />}
            onClick={() => onPageChange('prev')}
            disabled={!hasPrevPage}
            >
                Previous
            </Button>

            <Typography variant="body2" color="text.secondary">
                Showing {startIndex}-{endIndex} of {totalResults}
            </Typography>

            <Button
            endIcon={<NavigateNext />}
            onClick={() => onPageChange('next')}
            disabled={!hasNextPage}
            >
                Next
            </Button>
        </Box>
    );
};

export default PageControls;