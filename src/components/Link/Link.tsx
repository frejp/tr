import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface FormErrorMessageProp {
  flex: string;
  bgcolor: string;
}

export const NeutralLink = styled(Link)<FormErrorMessageProp>`
  text-decoration: none;
  color: ${(props) => props.color};
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  flex: ${(props) => props.flex};
  background-color: ${(props) => props.bgcolor};
  flex: 1;
  text-align: center;
  border: 1px solid black;
`;
