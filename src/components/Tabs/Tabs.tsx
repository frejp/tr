import styled from 'styled-components';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { NeutralLink } from '../Link';

export const TabWrapper = styled.div`
  display: flex;
  width: 350px;
  max-width: 350px;
  margin-bottom: 10px;
`;

interface RouterPath {
  text: string;
  routerPath: string;
}
interface Props {
  routerPaths: RouterPath[];
}
export const Tabs: React.FC<Props> = ({ routerPaths }) => {
  const location = useLocation();

  return (
    <TabWrapper>
      {routerPaths.map((path: RouterPath, i) => {
        const isCurrentPath = location.pathname.includes(path.routerPath);
        return (
          <NeutralLink key={i} bgcolor={isCurrentPath ? 'grey' : 'white'} color='black' flex='1' to={path.routerPath}>
            {path.text}
          </NeutralLink>
        );
      })}
    </TabWrapper>
  );
};
