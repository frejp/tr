import styled, { css } from 'styled-components';

import { designTokens } from '../../designTokens';

const placeHolderCss = css`
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.125em;
  -webkit-font-smoothing: antialiased;
`;

const focusedInput = css`
  color: black;
  border-color: black;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: inherit;
  -webkit-font-smoothing: antialiased;
`;

const inputBaseCSS = css`
  margin: 5px 15px 5px 15px;
  width: 320px;
  position: relative;
  font-size: 14px;
  line-height: 21px;
  -webkit-font-smoothing: antialiased;
  text-transform: none;
  border-width: 1px;
  border-style: solid;
  border-image: initial;
  padding: 5px 5px;
  outline: none;
  box-sizing: border-box;
`;

interface DynamicTextInputProps {
  error: boolean;
}

export const DynamicTextInput = styled.input<DynamicTextInputProps>`
  color: ${(props) => (props.error ? designTokens.red : 'black')};
  border-color: ${(props) => (props.error ? designTokens.red : 'gray')};
  ${inputBaseCSS}
  ::placeholder,
  ::-webkit-input-placeholder {
    ${placeHolderCss}
    color: ${(props) => (props.error ? designTokens.red : designTokens.inputPlaceHolderColor)};
      border-color: ${(props) => (props.error ? designTokens.red : designTokens.inputPlaceHolderColor)};

    opacity: 0.54
  }
  :-ms-input-placeholder {
    ${placeHolderCss}
    color: ${(props) => (props.error ? designTokens.red : designTokens.inputPlaceHolderColor)};
          border-color: ${(props) => (props.error ? designTokens.red : designTokens.inputPlaceHolderColor)};
    opacity: 0.54

  }
  :focus-within {
    ${focusedInput}
        color: ${(props) => (props.error ? designTokens.red : 'black')};
          border-color: ${(props) => (props.error ? designTokens.red : 'black')};
  }
`;
