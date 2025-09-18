import {doesPathStartWithSegment, extractPathname} from '@/utils/data/string';

export interface NavigationGuardOptions {
  startsWith: {
    private: string[];
    guest: string[];
  };
  exact: {
    private: string[];
    guest: string[];
  };
  loginPath: string; // ex: '/guest/login'
  homePath: string; // ex: '/'
}

export class NavigationGuard {
  private readonly options: NavigationGuardOptions;

  constructor(options: NavigationGuardOptions) {
    this.options = options;
  }

  determineNextPath({nextUrl, isLoggedIn}: NavigationParams): NavigationResolution {
    const allowedResult: NavigationResolution = {
      type: 'allowed',
      nextUrl
    };

    const nextPathname = extractPathname(nextUrl);

    // 여기서 거르지않으면 밑에서 isPrivate, isNotPrivate에서 둘 다 true가 할당됨.
    if (nextPathname === '/') {
      return allowedResult;
    }

    const isGuest = this.options.exact.guest.includes(nextPathname) || this.options.startsWith.guest.some((pathname) => doesPathStartWithSegment(pathname, nextPathname));
    const isPrivate = this.options.exact.private.includes(nextPathname) || this.options.startsWith.private.some((pathname) => doesPathStartWithSegment(pathname, nextPathname));

    if (isPrivate && !isLoggedIn) {
      return {
        type: 'not-authenticated',
        nextUrl: `${this.options.loginPath}?redirect=${nextUrl}`
      };
    } else if (isGuest && isLoggedIn) {
      return {
        type: 'already-authenticated',
        nextUrl: this.options.homePath,
      };

    } else {
      return allowedResult;
    }
  }
}

export interface NavigationParams {
  nextUrl: string; // pathname + querystring
  isLoggedIn: boolean;
}

export type NavigationResolution = {
  type: 'not-authenticated';
  nextUrl: string;
} | {
  type: 'already-authenticated';
  nextUrl: string;
} | {
  type: 'allowed',
  nextUrl: string; // parameter로 전달했던 nextUrl과 같은 값
};
