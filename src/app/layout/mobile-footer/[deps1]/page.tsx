import React from 'react';
import {H1} from '@/components/element/typography';
import {ServerComponentProps} from '@/type/declaration/next';
import layoutStyles from '@/util/style/layout.module.scss';

// URL: http://localhost:3000/layout/mobile-footer/product
// Doc: https://docs.google.com/document/d/1FmklHJmf9oTMpfqTxHReefj8iSXqphABXP1yoq2nh8M/edit#heading=h.7wqddqz571pa
export default function Page({params}: ServerComponentProps) {
  return (
    <div className={layoutStyles.mobilePageContent}>
      <H1 style={{textTransform: 'capitalize'}}>{params.deps1}</H1>
    </div>
  );
}
