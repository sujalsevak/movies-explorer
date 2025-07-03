// src/components/SearchBar.js
import React, { useEffect, useRef, useCallback } from "react";

const SearchBar = ({ searchQuery, onSearchResults, onError }) => {
  const initialMount = useRef(true);

  // useCallback ensures 'searchMovie' has a stable identity across renders
  const searchMovie = useCallback(async (query) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=f43ec82a5f24fe6190891894b7436c7a&query=${query}`
      );

      if (response.ok) {
        const data = await response.json();
        onSearchResults(data.results);
        onError("");
      } else {
        onSearchResults([]);
        onError("Failed to fetch movies.");
      }
    } catch (error) {
      onSearchResults([]);
      onError("An error occurred while fetching movies.");
    }
  }, [onSearchResults, onError]);

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      return;
    }

    if (searchQuery.trim() !== "") {
      searchMovie(searchQuery);
    } else {
      onSearchResults([]);
      onError("");
    }
  }, [searchQuery, searchMovie, onSearchResults, onError]);

  return <></>;
};

export default SearchBar;
