import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

// URL: http://localhost:3000/image/responsive-product-thumbnail
export default function Page() {
  return (
    <ResponsiveBorder>
      <ResponsiveThumbnail width={900} height={900} quality={100} src={PRODUCT_THUMBNAIL} alt="썸네일이미지"/>
    </ResponsiveBorder>
  )
}

const PRODUCT_THUMBNAIL ='https://gdimg.gmarket.co.kr/3139889011/still/400/'

const ResponsiveThumbnail = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 1/1;
  display: block;
`;

const ResponsiveBorder = styled.div`
  aspect-ratio: 1/1;
  border: 10px solid red;
`;
