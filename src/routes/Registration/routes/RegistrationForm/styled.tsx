import styled from 'styled-components';

export const BoxWrapper = styled.div`
    width: 350px;
    max-width: 350px;
    box-sizing: border-box;
    background-color: white;
}
`;

export const SpacingY = styled.div`
    width: 100%;
    height: 60px;
}
`;

export const SpacingYSmall = styled.div`
    width: 100%;
    height: 15px;
}
`;

export const ForgotPassword = styled.a`
  color: #dddddd;
  font-family: FreightTextProBook-Regular, Georgia, sans-serif;
  color: ${(props) => props.color};
  font-size: 14px;
  line-height: 21px;
  margin-left: 15px;
  margin-top: 10px;
  -webkit-font-smoothing: antialiased;
  display: inherit;
  cursor: pointer;
`;

// just an empty container
export const EmptySocialButtons = styled.div`
  width: 320px;
  height: 119px;
  margin-top: 50px;
`;
