import React, {useCallback, useState} from 'react';
import {Button, ReactButton} from '@components/atom/button/button-presets';
import styled from 'styled-components';
import classNames from 'classnames';

export default function OpacityWithVisibilityPage() {
  
  const [active, setActive] = useState(true);
  
  const onClick = useCallback(() => {
    alert('Clicked');
  }, []);
  
  const toggle = useCallback(() => {
    setActive(prevState => !prevState);
  }, []);
  
  return (
    <div>
      <Button onClick={toggle}>Toggle</Button>
      <CustomButton className={classNames({active})} onClick={onClick}>CLICK ME</CustomButton>
      <OpacityVisibilityButton className={classNames({active})} onClick={onClick}>
        CLICK ME
      </OpacityVisibilityButton>
    </div>
  );
}

const CustomButton = styled(ReactButton)`
  transition: opacity 2s, visibility 30s, background-color 0.5s;
  opacity: 0;
  visibility: hidden;
  
  &.active {
    opacity: 1;
    visibility: visible;
    background-color: red;
  }
`;

const OpacityVisibilityButton = styled(ReactButton)`
  transition: opacity, visibility, 1s;
  opacity: 0;
  visibility: hidden;
  
  &.active {
    opacity: 1;
    visibility: visible;
  }
`;
