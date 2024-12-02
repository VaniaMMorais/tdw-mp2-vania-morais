import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Styled Components
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #ffefba, #ffffff);
  z-index: 9999;
  font-family: "Comic Sans MS", "Comic Neue", sans-serif;
`;

const Spinner = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 10px solid #f3f3f3;
  border-top: 10px solid #e62429; 
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  font-size: 3rem;
`;

const LoadingText = styled.p`
  margin-top: 1rem;
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 2px 2px #000;
  color: #e62429;
  text-transform: uppercase;
`;

function Loading() {
  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>Loading, Hero!</LoadingText>
    </LoadingContainer>
  );
}

export default Loading;