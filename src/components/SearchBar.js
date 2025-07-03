// src/components/SearchBar.js
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
  font-weight: bold;
`;

// SearchBar now accepts searchQuery, onSearchResults, and onError props from App.js
const SearchBar = ({ searchQuery, onSearchResults, onError }) => {
  const initialMount = useRef(true); // To prevent initial empty search

  useEffect(() => {
    // Prevent immediate search on first render (when searchQuery is initially empty)
    if (initialMount.current) {
      initialMount.current = false;
      return;
    }

    // Only search if query is not empty
    if (searchQuery.trim() !== "") {
      searchMovie(searchQuery);
    } else {
      // Clear results and errors if search query becomes empty
      onSearchResults([]);
      onError("");
    }
  }, [searchQuery]); // Re-run effect when searchQuery changes

  async function searchMovie(query) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=f43ec82a5f24fe6190891894b7436c7a&query=${query}`
      );

      if (response.ok) {
        const data = await response.json();
        onSearchResults(data.results); // Pass results up to App.js
        onError(""); // Clear any previous error
      } else {
        onSearchResults([]); // Clear results on error
        onError("Failed to fetch movies.");
      }
    } catch (error) {
      onSearchResults([]); // Clear results on error
      onError("An error occurred while fetching movies.");
    }
  }

  return (
    // This component no longer renders UI elements directly,
    // it just handles the search logic based on the searchQuery prop.
    // Error message will be displayed in App.js
    <></>
  );
};

export default SearchBar;