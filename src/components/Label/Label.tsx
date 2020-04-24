import styled from 'styled-components';

interface labelProps {
  htmlFor: string;
}
export const Label = styled.label<labelProps>`
  margin: 15px;
`;
