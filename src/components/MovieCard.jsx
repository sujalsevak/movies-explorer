// src/components/MovieCard.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const CardContainer = styled.div`
  width: 100%;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.textColor};
  padding: 1rem;
  background-color: ${(props) => props.theme.cardBackground};
  transition: transform 0.2s ease-in-out, background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  cursor: pointer; /* Important for indicating clickability */
  overflow: hidden;
  gap: 1rem;
  animation: ${fadeIn} 0.5s ease-in-out;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  max-height: 20rem;
  overflow: hidden;
  border-radius: 10px;
  margin-bottom: 1rem;
`;

const MoviePoster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MovieDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
`;

const MovieTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
  color: ${(props) => props.theme.textColor};
  line-height: 1.3;
`;

const MovieOverview = styled.p`
  font-size: 1rem;
  line-height: 1.3;
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  color: ${(props) => props.theme.textColor};
`;

const MovieReleaseDate = styled.p`
  font-size: 1rem;
  line-height: 1.3;
  color: ${(props) => props.theme.textColor};
`;

const MovieRating = styled.p`
  background-color: ${(props) => props.theme.ratingBackgroundColor};
  color: ${(props) => props.theme.ratingTextColor};
  font-weight: bolder;
  padding: 0.1rem;
  margin-top: auto;
  align-self: flex-start;
  border-radius: 3px;
`;

const MovieCard = ({ movie, onClick }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <CardContainer onClick={() => onClick(movie)}>
      <ImageContainer>
        <MoviePoster src={imageUrl} alt={movie.title} />
      </ImageContainer>
      <MovieDetails>
        <MovieTitle>{movie.title}</MovieTitle>
        <MovieOverview>Plot: {movie.overview}</MovieOverview>
        <MovieReleaseDate>Release Date: {movie.release_date}</MovieReleaseDate>
        {movie.vote_average > 0 && (
          <MovieRating>Rating: {movie.vote_average.toFixed(1)}</MovieRating>
        )}
      </MovieDetails>
    </CardContainer>
  );
};

export default MovieCard;