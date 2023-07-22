import React from "react";
import { Box, Container, Grid } from "@mui/material";
import PokemonCard from "../Components/PokemonCard/PokemonCard";

const Favorites = ({ favorites }) => {
  return (
    <Container maxWidth={false}>
      <Box mt={3}>
        <Grid container spacing={3}>
          {favorites.map((pokemon, key) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={key}>
              <PokemonCard
                name={pokemon.name}
                image={pokemon.sprites.front_default}
                types={pokemon.types}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Favorites;
