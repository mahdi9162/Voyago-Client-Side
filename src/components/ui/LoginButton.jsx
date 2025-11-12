import React from 'react';
import styled from 'styled-components';

const Button = ({ children }) => {
  return (
    <StyledWrapper>
      <button>{children}</button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    width: 100%;
    padding: 10px 30px;
    border: 0;
    border-radius: 100px;
    background-color: #2ba8fb;
    color: #ffffff;
    font-weight: Bold;
    transition: all 0.5s;
    -webkit-transition: all 0.5s;
    cursor: pointer;
    display: inline-block;
  }

  button:hover {
    background-color: #6fc5ff;
    box-shadow: 0 0 20px #6fc5ff50;
    transform: scale(1.04);
  }

  button:active {
    background-color: #3d94cf;
    transition: all 0.25s;
    -webkit-transition: all 0.25s;
    box-shadow: none;
    transform: scale(0.98);
  }
`;

export default Button;
