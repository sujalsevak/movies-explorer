// src/components/Header.js
import React from 'react';
import styled from 'styled-components';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

const HeaderContainer = styled.header`
  background-color: ${(props) => props.theme.headerBackground};
  color: ${(props) => props.theme.textColor};
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between; /* Pushes items to LHS, Middle, RHS */
  align-items: center; /* Vertically align items */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, color 0.3s ease;
  width: 100%;
  box-sizing: border-box;
  gap: 1rem; /* Space between flex items on larger screens */

  @media (max-width: 768px) {
    flex-direction: column; /* Stack items vertically on smaller screens */
    padding: 1rem;
    gap: 1rem; /* Space between stacked items */
  }
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${(props) => props.theme.textColor};
  text-decoration: none;
  white-space: nowrap; /* Prevent title from wrapping */
  flex-shrink: 0; /* Prevent it from shrinking */

  @media (max-width: 768px) {
    font-size: 1.5rem;
    order: 1; /* Ensure title is first when stacked */
    margin-bottom: 0.5rem; /* Space below title when stacked */
  }
`;

const SearchInput = styled.input`
  width: 100%; /* Take full width of its parent wrapper */
  max-width: 350px; /* Limit max width for desktop search bar */
  padding: 10px;
  border: 2px solid ${(props) => props.theme.highlightColor};
  border-radius: 4px;
  font-size: 1rem;
  background-color: ${(props) => props.theme.cardBackground};
  color: ${(props) => props.theme.textColor};
  outline: none;
  transition: border-color 0.3s ease-in-out, background-color 0.3s ease, color 0.3s ease;

  &:focus {
    border-color: ${(props) => props.theme.activeColor};
  }

  &::placeholder {
    color: ${(props) => props.theme.textColor}80;
  }
`;

const SearchInputWrapper = styled.div`
  flex-grow: 1; /* Takes up available space in the middle */
  display: flex;
  justify-content: center; /* Centers SearchInput within this wrapper */
  align-items: center;

  @media (max-width: 768px) {
    order: 2; /* Place search bar in the middle when stacked */
    width: 100%; /* Take full width of header on smaller screens */
  }
`;

const ThemeToggleButton = styled.button`
  background: none;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 8px 15px;
  color: ${(props) => props.theme.textColor};
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  white-space: nowrap; /* Prevent button text from wrapping */
  flex-shrink: 0; /* Prevent it from shrinking */


  &:hover {
    background-color: ${(props) => props.theme.cardBackground};
  }

  svg {
    margin-left: 0.5rem;
  }

  @media (max-width: 768px) {
    order: 3; /* Place toggle last when stacked */
    margin-top: 0.5rem; /* Space above toggle when stacked */
  }
`;

// Header component now receives search handlers and query from App.js
const Header = ({ toggleTheme, currentTheme, onSearchQueryChange, currentSearchQuery }) => {
  const handleSearch = (e) => {
    const query = e.target.value;
    onSearchQueryChange(query); // Pass the query up to App.js
  };

  return (
    <HeaderContainer>
      <Title>Movie App</Title> {/* LHS */}

      <SearchInputWrapper> {/* Middle */}
        <SearchInput
          type="text"
          placeholder="Search movies..."
          onChange={handleSearch}
          value={currentSearchQuery} // Controlled input from App.js
        />
      </SearchInputWrapper>

      <ThemeToggleButton onClick={toggleTheme}> {/* RHS */}
        {currentTheme === 'light' ? (
          <>
            ડાર્ક મોડ <MdDarkMode />
          </>
        ) : (
          <>
            લાઇટ મોડ <MdLightMode />
          </>
        )}
      </ThemeToggleButton>
    </HeaderContainer>
  );
};

export default Header;