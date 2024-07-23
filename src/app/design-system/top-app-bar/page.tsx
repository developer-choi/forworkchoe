import styles from './page.module.scss';
import React from 'react';
import layoutStyles from '@/util/style/layout.module.scss';
import TopAppBar from '@/components/layout/TopAppBar';
import {Body2} from '@/components/element/typography';

// URL: http://localhost:3000/design-system/top-app-bar
export default async function Page() {
  const title =
    'Update on Policies and a New Feature inUpdate on Policies and a New Feature inUpdate on Policies and a New Feature inUpdate on Policies and a New Feature in';
  const content = `The Langdy KakaoTalk channel, which experienced a temporary error yesterday and today, has beed restored.

We are no longer using the temporary communicationchannel, so please contact us through the KakaoTalk channel for any needs of communication.

Once again, we would like to apologize for the inconvenience caused to you, and thank you for your understanding and cooperation : )`;

  const appBarTitle = `[Notice] ${title}`;
  const isMobile = true;

  return (
    <div className={isMobile ? layoutStyles.horizontalPaddingContainer : layoutStyles.pageContentMedium}>
      <TopAppBar>{appBarTitle}</TopAppBar>
      <Body2 className={styles.content}>{content.repeat(10)}</Body2>
    </div>
  );
}
