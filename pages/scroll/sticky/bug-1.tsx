import React from 'react';
import styled from 'styled-components';
import {range} from '@util/extend/data-type/number';

/**
 * FHD (데스크탑) 에서
 * 스크롤 내리다가
 * 20번 쯤 지나갈 쯤부터 갑자기 헤더가 위로 사라져버리는현상이 있음.
 */
export default function Page() {
  return (
    <>
      <Header/>
      <Main>
        <Aside/>
        <Article>
          {range(1, 100).map(value => (
            <Row key={value}>{value}</Row>
          ))}
        </Article>
      </Main>
    </>
  );
}

const Header = styled.header`
  position: sticky;
  height: 50px;
  background-color: red;
  top: 0;
  left: 0;
  right: 0;
`;

const Aside = styled.aside`
  position: sticky;
  left: 0;
  width: 250px;
  height: 500px;
  z-index: 1;
  top: 150px;
  background-color: green;
`;

const Main = styled.main`
  display: flex;
`;

const Article = styled.article`
  flex-grow: 1;
  background-color: lightgray;
`;

const Row = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  font-size: 20px;
  font-weight: bold;
`;
