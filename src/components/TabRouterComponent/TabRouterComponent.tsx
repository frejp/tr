import React from 'react';
import styled from 'styled-components';

import { Tabs } from '../Tabs/Tabs';

interface RouterPath {
  text: string;
  routerPath: string;
}
interface Props {
  children: React.ReactNode;
  routerPaths: RouterPath[];
}

const Wrapper = styled.div`
  background-color: white;
  padding-top: 10px;
  width: 350px;
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TabRouterComponent = (props: Props) => {
  return (
    <FlexWrapper>
      <Wrapper>
        <Tabs routerPaths={props.routerPaths} />
        <div>{props.children}</div>
      </Wrapper>
    </FlexWrapper>
  );
};
