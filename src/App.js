// src/App.js
import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/themes';
import { GlobalStyle } from './styles/globalStyles';
import Header from './components/Header'; // Your Header component
import SearchBar from './components/SearchBar'; // Your SearchBar component (now logic-only)
import Movie from './components/Movie'; // Your Movie component (for search results)
import DefaultList from './components/DefaultList'; // Your DefaultList component (for initial movies)

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${(props) => props.theme.bodyBackground};
  color: ${(props) => props.theme.textColor};
  transition: background-color 0.3s ease, color 0.3s ease;
  width: 100%;
  box-sizing: border-box;
`;

const ContentWrapper = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centers children (Movie or DefaultList) horizontally */
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 20px;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
  font-weight: bold;
`;


function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' ? 'dark' : 'light';
  });
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Managed here, passed to Header and SearchBar
  const [searchError, setSearchError] = useState(""); // Managed here, displayed in App

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
  };

  const handleSearchError = (error) => {
    setSearchError(error);
  };

  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <AppWrapper>
        {/* Header component with theme toggle AND search input */}
        <Header
          toggleTheme={toggleTheme}
          currentTheme={theme}
          onSearchQueryChange={handleSearchQueryChange} // Pass handler for search input
          currentSearchQuery={searchQuery} // Pass current query for controlled input
        />

        {/* SearchBar component (logic only) */}
        <SearchBar
          searchQuery={searchQuery} // Pass the query down
          onSearchResults={handleSearchResults} // Pass handler for search results
          onError={handleSearchError} // Pass handler for errors
        />

        <ContentWrapper>
          {searchError && <ErrorMessage>{searchError}</ErrorMessage>} {/* Display error here */}
          {searchQuery ? ( // If there's a search query, show search results
            <Movie movies={searchResults} />
          ) : ( // Otherwise, show the default list
            <DefaultList />
          )}
        </ContentWrapper>
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;