// src/components/MovieDetailModal.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoCloseCircleOutline } from 'react-icons/io5';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s forwards;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContent = styled.div`
  background-color: ${(props) => props.theme.cardBackground};
  color: ${(props) => props.theme.textColor};
  padding: 2rem;
  border-radius: 10px;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transform: scale(0.9);
  animation: popIn 0.3s forwards cubic-bezier(0.68, -0.55, 0.27, 1.55);

  @keyframes popIn {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  @media (max-width: 768px) {
    width: 90%;
    padding: 1rem;
    gap: 1rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 2.5rem;
  color: ${(props) => props.theme.closeButtonColor};
  fill: currentColor;
  cursor: pointer;
  transition: color 0.2s ease;
  z-index: 1010;

  &:hover {
    color: ${(props) => props.theme.highlightColor};
  }
`;

const MovieHeader = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
  }
`;

const MoviePoster = styled.img`
  width: 250px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    width: 180px;
  }
`;

const MovieInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const MovieTitle = styled.h2`
  font-size: 2.2rem;
  color: ${(props) => props.theme.textColor};
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const MovieOverview = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${(props) => props.theme.textColor};
`;

const MovieDetailsText = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.textColor};
  span {
    font-weight: bold;
    color: ${(props) => props.theme.highlightColor};
  }
`;

const MovieRating = styled.p`
  background-color: ${(props) => props.theme.ratingBackgroundColor};
  color: ${(props) => props.theme.ratingTextColor};
  font-weight: bolder;
  padding: 0.3rem 0.6rem;
  border-radius: 5px;
  align-self: flex-start;
`;

const ExternalLinks = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: flex-start;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const LinkButton = styled.a`
  background-color: ${(props) => props.theme.highlightColor};
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.2s ease, transform 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.activeColor};
    transform: translateY(-2px);
  }
`;

// NEW STYLED COMPONENTS FOR YOUTUBE EMBED
const YouTubeEmbedContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  height: 0;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-top: 1rem; /* Space from above content */
`;

const YouTubeIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

const MovieDetailModal = ({ movie, onClose }) => {
  const [imdbId, setImdbId] = useState(null);
  const [youtubeKey, setYoutubeKey] = useState(null);

  // Effect to fetch external IDs (IMDb)
  useEffect(() => {
    if (movie && movie.id) {
      const fetchExternalIds = async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}/external_ids?api_key=f43ec82a5f24fe6190891894b7436c7a`
          );
          if (response.ok) {
            const data = await response.json();
            setImdbId(data.imdb_id);
          } else {
            console.error("Failed to fetch external IDs.");
            setImdbId(null);
          }
        } catch (error) {
          console.error("Error fetching external IDs:", error);
          setImdbId(null);
        }
      };
      fetchExternalIds();
    }
  }, [movie]);

  // Effect to fetch video links (YouTube)
  useEffect(() => {
    if (movie && movie.id) {
      const fetchVideos = async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=f43ec82a5f24fe6190891894b7436c7a`
          );
          if (response.ok) {
            const data = await response.json();
            // Find a YouTube trailer if available
            const trailer = data.results.find(
              (video) => video.site === 'YouTube' && video.type === 'Trailer'
            );
            setYoutubeKey(trailer ? trailer.key : null);
          } else {
            console.error("Failed to fetch videos.");
            setYoutubeKey(null);
          }
        } catch (error) {
          console.error("Error fetching videos:", error);
          setYoutubeKey(null);
        }
      };
      fetchVideos();
    }
  }, [movie]);

  if (!movie) return null;

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `https://via.placeholder.com/500x750?text=No+Image`;

  const tmdbLink = `https://www.themoviedb.org/movie/${movie.id}`;
  const imdbLink = imdbId ? `https://www.imdb.com/title/${imdbId}/` : null;

  // The YouTube embed URL format
  const youtubeEmbedUrl = youtubeKey ? `https://www.youtube.com/embed/${youtubeKey}` : null;


  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <IoCloseCircleOutline />
        </CloseButton>
        <MovieHeader>
          <MoviePoster src={imageUrl} alt={movie.title} />
          <MovieInfo>
            <MovieTitle>{movie.title}</MovieTitle>
            <MovieDetailsText><span>Release Date:</span> {movie.release_date}</MovieDetailsText>
            {movie.vote_average > 0 && (
              <MovieRating>Rating: {movie.vote_average.toFixed(1)} / 10</MovieRating>
            )}
            <MovieOverview>{movie.overview || "No overview available."}</MovieOverview>
          </MovieInfo>
        </MovieHeader>

        {/* Embedded YouTube Trailer Section */}
        {youtubeEmbedUrl && (
          <YouTubeEmbedContainer>
            <YouTubeIframe
              src={youtubeEmbedUrl}
              title={`${movie.title} Trailer`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></YouTubeIframe>
          </YouTubeEmbedContainer>
        )}

        {/* External Links Section (no YouTube link button needed now that it's embedded) */}
        <ExternalLinks>
          <LinkButton href={tmdbLink} target="_blank" rel="noopener noreferrer">
            View on TMDB
          </LinkButton>
          {imdbLink && (
            <LinkButton href={imdbLink} target="_blank" rel="noopener noreferrer">
              View on IMDb
            </LinkButton>
          )}
        </ExternalLinks>
      </ModalContent>
    </ModalOverlay>
  );
};

export default MovieDetailModal;