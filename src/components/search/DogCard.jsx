import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
    Box,
    Chip
} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

const DogCard = ({ dog, isFavorite, onToggleFavorite, isMatch = false }) => {
    const { name, breed, age, zip_code, img } = dog;

    return (
        <Card 
        sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            position: 'relative',
        }}
        >
            {isMatch && (
                <Chip
                label="Your Match!"
                color="primary"
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    zIndex: 1
                }}
                />
            )}
            <CardMedia
                component="img"
                height="200"
                image={img}
                alt={name}
                sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                }}>
                    <Typography variant="h6" component="h2">
                        {name}
                    </Typography>
                    <IconButton 
                        onClick={() => onToggleFavorite(dog.id)}
                        color="primary"
                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"} // keep message consistent with action
                        size="small"
                    >
                        {isFavorite ? <Favorite /> : <FavoriteBorder />}
                    </IconButton>
                </Box>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                    {breed}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {age >= 1 ? age : 'Less than 1'} {age <= 1 ? 'year' : 'years'} old
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Zipcode: {zip_code}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default DogCard;