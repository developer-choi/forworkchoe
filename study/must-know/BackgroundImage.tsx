import React, {ComponentProps} from 'react';
import styled from 'styled-components';
import RatioBox from './RatioBox';

export interface BackgroundImageProp extends Omit<ComponentProps<'div'>, 'ref'> {
  src: string;
  aspectRatio: number;
}

export default function BackgroundImage({children, aspectRatio, src, ...rest}: BackgroundImageProp) {

  return (
      <RatioBox aspectRatio={aspectRatio}>
        <Img style={{backgroundImage: `url(${src})`}} {...rest}>
          {children}
        </Img>
      </RatioBox>
  );
}

const Img = styled.div`
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
`;
