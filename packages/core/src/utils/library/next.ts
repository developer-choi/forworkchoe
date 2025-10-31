import type {PropsWithChildren} from 'react';

export interface PageServerComponentProps {
  params: Record<string, string | undefined>;
  searchParams: Record<string, string | string[] | undefined>;
}

// Layout 컴포넌트를 Server Component로 만드는 경우 전달될 수 있는 props
export type LayoutProps = PropsWithChildren<Pick<PageServerComponentProps, 'params'>>;

export interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export function isServer() {
  return typeof window === 'undefined';
}
