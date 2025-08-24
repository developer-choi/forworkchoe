'use client';

import {Suspense} from 'react';
import type {LinkProps} from 'next/link';
import classNames from 'classnames';
import {usePathname, useSearchParams} from 'next/navigation';
import CustomLink, {type CustomLinkProps} from '@/components/element/link/CustomLink';
import {doesPathStartWithSegment} from '@/utils/data/string';

export type LinkActiveMode = 'startsWith' | 'exact' | boolean;

export interface ActiveLinkProps extends CustomLinkProps {
  /**
   * [startsWith mode]
   * pathname으로만 비교함. querystring은 고려대상이 아님. (사이드바 메뉴에서 하위뎁스에 링크가 액티브인지 체크할 때, 쿼리스트링 상관없이 사용 가능)
   *
   * 현재 위치한 URL이 /community/list 이고,
   * to가 /community 이면
   * active 상태로 판단
   *
   * [exact mode]
   * pathname, querystring까지 정확하게 일치해야 active 상태가됨.
   * Usage는, /same/path?query=anotherValue 처럼 링크마다 쿼리스트링만 다른 케이스에서 사용
   */
  active: LinkActiveMode;
}

/**
 * Doc : [Active Link] https://docs.google.com/document/d/1FmklHJmf9oTMpfqTxHReefj8iSXqphABXP1yoq2nh8M/edit
 */
export default function ActiveLink(props: ActiveLinkProps) {
  // https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
  return (
    <Suspense>
      <InnerLink {...props} />
    </Suspense>
  );
}

/**
 * href는 "?query=value"와 "/current/path?query=value" 모두 지원함.
 * 이거 export하면 가끔 쓸일 있음 (/mobile-footer 하위 페이지 참고)
 */
export function useCheckHrefIsActive(href: LinkProps['href'], active: LinkActiveMode): 'active' | undefined {
  const currentPathname = usePathname();
  const searchParams = useSearchParams();

  const stringHref = convertHrefToString(href);

  /**
   * /path1/path2/path?query=value 대신에
   * ?query=value 도 대응될 수 있도록 하기위함.
   */
  const nextUrl = stringHref.startsWith('/') ? stringHref : currentPathname + stringHref;

  let isActive = false;

  if (typeof active === 'boolean') {
    return 'active';
  }

  switch (active) {
    case 'exact': {
      // console.log(encodeURIComponent(nextUrl).replaceAll('%20', '+'), searchParams.toString());
      isActive = areUrlsIdentical(nextUrl, currentPathname + (searchParams.size === 0 ? '' : '?' + searchParams.toString()));
      break;
    }
    case 'startsWith':
      isActive = doesPathStartWithSegment(nextUrl, currentPathname);
      break;
  }

  if (isActive) {
    return 'active';
  } else {
    return undefined;
  }
}

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/
function InnerLink({ className, href, active, ...rest }: ActiveLinkProps) {
  const activeClass = useCheckHrefIsActive(href, active);
  return <CustomLink href={href} className={classNames(className, activeClass)} {...rest} />;
}

function convertHrefToString(href: LinkProps['href']) {
  if (typeof href === 'string') {
    return href;
  }

  if (!href.pathname) {
    return '';
  }

  const url = new URL(href.pathname);

  if (href.query && typeof href.query === 'object') {
    Object.entries(href.query).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  return url.pathname + url.search;
}

/**
 * @param originalUrl 링크에 지정한 URL /path?query=value 형식 (앞에 오리진 없어야함)
 * @param compareUrl 비교할 URL (현재 유저가 접속한 URL 등) /path?query=value 형식 (앞에 오리진 없어야함)
 * @description +와 공백을 서로 구분할 수 없음. 'pl+us'와 'pl us'를 비교하게 될 경우 같다고 반환됨.
 * 예제 케이스는, http://localhost:3000/markup/module/active-link/community 참고
 */
function areUrlsIdentical(originalUrl: string, compareUrl: string): boolean {
  // 1. 일단 URL이 서로 같으면 true (쿼리스트링에 특수문자 없는경우)
  if (originalUrl === compareUrl) {
    return true;
  }

  const original = new URL(`https://domain.com${originalUrl}`);
  const compare = new URL(`https://domain.com${compareUrl}`);
  return decodeURIComponent(original.href).replaceAll('+', ' ') === decodeURIComponent(compare.href.replaceAll('+', ' '));
}
