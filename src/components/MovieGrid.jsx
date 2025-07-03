// // src/components/MovieGrid.jsx
// import React from 'react';
// import styled from 'styled-components';
// import MovieCard from './MovieCard'; // Assuming you have this

// const MovieListContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
//   gap: 2rem;
//   padding: 2rem 0;

//   @media (max-width: 768px) {
//     grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
//     gap: 1rem;
//   }
// `;

// const NoResults = styled.p`
//   font-size: 1.5rem;
//   color: ${(props) => props.theme.textColor};
//   text-align: center;
//   grid-column: 1 / -1; /* Make it span all columns */
// `;

// const MovieGrid = ({ movies, onMovieClick }) => {
//   if (!movies || movies.length === 0) {
//     return <NoResults>No movies found. Try a different search!</NoResults>;
//   }

//   return (
//     <MovieListContainer>
//       {movies.map((movie) => (
//         <MovieCard key={movie.id} movie={movie} onClick={() => onMovieClick(movie)} />
//       ))}
//     </MovieListContainer>
//   );
// };

// export default MovieGrid;