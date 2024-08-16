import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {range} from '@util/extend/data-type/number';

export default function Page() {
  const [fixed, setFixed] = useState(false);

  useEffect(() => {
    const scrollListener = () => {
      setFixed(document.documentElement.scrollTop > 10);
    };

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

  return (
    <>
      <Header className={fixed ? 'fixed' : ''}/>
      {range(1, 100).map(value => (
        <Row key={value}>{value}</Row>
      ))}
    </>
  );
}

const Header = styled.header`
  height: 60px;
  background-color: red;
  width: 100%;
  
  &.fixed {
    position: fixed;
  }
`;

const Row = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
`;