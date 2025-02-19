import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box
} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

const DogCard = ({ dog, isFavorite, onToggleFavorite }) => {
    const { name, breed, age, zip_code, img } = dog;

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
            component="img"
            height="200"
            image={img}
            alt={name}
            sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Typography variant="h6" component="h2">
                    {name}
                </Typography>
                <IconButton 
                onClick={() => onToggleFavorite(dog)}
                color="primary"
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                    {isFavorite ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
                </Box>
                <Typography variant="body1" color="text.secondary">
                    {breed}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {age} {age === 1 ? 'year' : 'years'} old
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Zipcode: {zip_code}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default DogCard;