// src/components/DefaultList.jsx
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import MovieCard from "./MovieCard";
import MovieDetailModal from "./MovieDetailModal";

const DefaultListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Center items horizontally */
  width: 100%; /* Ensure it takes full width of its parent */
`;

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

const ViewMoreButton = styled.button`
  background-color: ${(props) => props.theme.highlightColor};
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 2rem;
  margin-bottom: 2rem;
  transition: background-color 0.3s ease, transform 0.2s ease;
  width: fit-content;
  align-self: center; /* Center the button in the parent DefaultListContainer */

  &:hover {
    background-color: ${(props) => props.theme.activeColor};
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const DefaultList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1); // Start at page 1 for pagination
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasMore, setHasMore] = useState(true); // To track if there are more pages

  // Use a ref to ensure useEffect runs only once on initial mount
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true; // Mark as mounted
      getMovies(page); // Fetch initial movies for page 1
    }
  }, [page]); // Empty dependency array means it runs only once on mount

  async function getMovies(pageNumber) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=f43ec82a5f24fe6190891894b7436c7a&page=${pageNumber}`,
        {
          headers: {
            "Content-type": "application/json",
          },
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Append new movies to the existing list
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
        // Check if there are more pages to load
        setHasMore(pageNumber < data.total_pages);
      } else {
        console.error("Failed to fetch movies.");
        setHasMore(false); // No more movies if fetch fails
      }
    } catch (error) {
      console.error("An error occurred while fetching movies:", error);
      setHasMore(false); // No more movies if fetch fails
    }
  }

  const handleViewMore = () => {
    const nextPage = page + 1;
    setPage(nextPage); // Increment page number
    getMovies(nextPage); // Fetch movies for the next page
  };

  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <DefaultListContainer> {/* Use the new container to center button */}
      <MovieListContainer>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={handleCardClick}
          />
        ))}
      </MovieListContainer>

      {hasMore && ( // Only show button if there are more movies
        <ViewMoreButton onClick={handleViewMore}>
          View More Movies
        </ViewMoreButton>
      )}

      {isModalOpen && selectedMovie && (
        <MovieDetailModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </DefaultListContainer>
  );
};

export default DefaultList;