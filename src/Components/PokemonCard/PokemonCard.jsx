// Arquivo: PokemonCard.jsx
import React from "react";
import { Card, CardContent, Chip, Typography, IconButton } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const PokemonCard = ({ name, image, types, isFavorite, toggleFavorite }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <img src={image} alt={name} title={name} />
        <Typography variant="subtitle1">Types:</Typography>
        {types.map((type, index) => (
          <Chip key={index} label={type.type.name} />
        ))}
        <IconButton onClick={toggleFavorite} title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
          {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
