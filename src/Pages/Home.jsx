import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Button } from "@mui/material";
import axios from "axios";
import Navbar from "../Components/Navbar/Navbar";
import PokemonCard from "../Components/PokemonCard/PokemonCard";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getPokemons();
  }, [currentPage]);

  const getPokemons = async () => {
    try {
      const limit = 10;
      const offset = (currentPage - 1) * limit;
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon`, {
        params: {
          limit,
          offset,
        },
      });

      const { results } = response.data;
      const pokemonData = await Promise.all(
        results.map((result) => axios.get(result.url))
      );
      const parsedData = pokemonData.map((data) => data.data);
      setPokemons(parsedData);
    } catch (error) {
      console.log(error);
    }
  };

  const pokemonFilter = async (name) => {
    if (name === "") {
      getPokemons();
    } else {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        const pokemon = response.data;
        setPokemons([pokemon]);
      } catch (error) {
        console.log(error);
        setPokemons([]);
      }
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const toggleFavorite = (pokemonName) => {
    setPokemons((prevPokemons) =>
      prevPokemons.map((pokemon) => {
        if (pokemon.name === pokemonName) {
          return { ...pokemon, isFavorite: !pokemon.isFavorite };
        }
        return pokemon;
      })
    );
  };

  return (
    <div>
      <Navbar pokemonFilter={pokemonFilter} />
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          {pokemons.map((pokemon, key) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={key}>
              <PokemonCard
                name={pokemon.name}
                image={pokemon.sprites.front_default}
                types={pokemon.types}
                isFavorite={pokemon.isFavorite}
                toggleFavorite={() => toggleFavorite(pokemon.name)}
              />
            </Grid>
          ))}
        </Grid>
        <Box mt={3} display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          <Box mx={2}>{currentPage}</Box>
          <Button variant="contained" color="primary" onClick={handleNext}>
            Próximo
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Home;
