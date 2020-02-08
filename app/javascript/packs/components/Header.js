import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.nav`
  display: flex;
  height: 56px;
  align-items: center;
  padding: 0 24px;

  a {
    text-decoration: none;
    color: #999;
    margin-left: 16px;

    &:first-of-type {
      margin-left: 0;
    }
  }
`;

class Header extends Component {
  render() {
    return (
      <Wrapper>
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
      </Wrapper>
    );
  }
}

export default Header;
