// src/components/Movie.jsx
import React, { useState } from "react";
import styled from "styled-components";
import MovieCard from "./MovieCard";
import MovieDetailModal from "./MovieDetailModal"; // Import the modal component

const MovieListContainer = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 1rem auto;
  padding: 1rem;
  outline: 1px solid ${(props) => props.theme.highlightColor};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  justify-items: center;
  border-radius: 10px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    width: 95%;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    width: 98%;
    padding: 0.5rem;
  }
`;

const Movie = (props) => {
  const { movies } = props;
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <>
      <MovieListContainer>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={handleCardClick} // Pass the click handler to MovieCard
          />
        ))}
      </MovieListContainer>

      {isModalOpen && selectedMovie && (
        <MovieDetailModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default Movie;