// src/components/Footer.jsx
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: ${(props) => props.theme.cardBackground}; /* Uses your theme's card background for consistency */
  color: ${(props) => props.theme.textColor};
  padding: 3rem 2rem; /* More padding for a substantial look */
  margin-top: 4rem; /* Adds space between main content and footer */
  border-top: 1px solid ${(props) => props.theme.borderColor}; /* A subtle separator */
  text-align: center;
  font-size: 0.9rem;
  line-height: 1.6;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem; /* Space between sections */

  @media (max-width: 768px) {
    padding: 2rem 1rem; /* Adjust padding for smaller screens */
    margin-top: 2rem;
    gap: 1rem;
  }
`;

const FooterSection = styled.div`
  max-width: 800px; /* Limits content width for readability */
  width: 100%;
`;

const PurposeText = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  color: ${(props) => props.theme.highlightColor}; /* Uses your theme's highlight color */
  margin-bottom: 1rem; /* Space below the purpose text */

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const AttributionText = styled.p`
  margin-top: 1rem;
  color: ${(props) => props.theme.secondaryTextColor}; /* Muted text color */
  a {
    color: ${(props) => props.theme.highlightColor}; /* Link color from theme */
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const BuiltWithText = styled.p`
  color: ${(props) => props.theme.secondaryTextColor}; /* Muted text color */
`;

const CopyrightText = styled.p`
  margin-top: 1.5rem;
  font-size: 0.85rem;
  color: ${(props) => props.theme.secondaryTextColor}; /* Muted text color */
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterSection>
        {/* Purpose of the Web (placeholder content) */}
        <PurposeText>
          Your ultimate destination for discovering trending movies, detailed information, and engaging trailers.
        </PurposeText>
        {/* Attribution (placeholder content) */}
        <AttributionText>
          All movie data provided by <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">The Movie Database (TMDb)</a>.
        </AttributionText>
        {/* Built With (placeholder content) */}
        <BuiltWithText>
          Crafted with React, Styled Components, and modern web technologies.
        </BuiltWithText>
      </FooterSection>
      {/* Copyright Information */}
      <CopyrightText>
        © {new Date().getFullYear()} Movie Explorer. All rights reserved.
      </CopyrightText>
    </FooterContainer>
  );
};

export default Footer;