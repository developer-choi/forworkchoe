import BaseError from '@/utils/error/class';

/**
 * 로그인이 되어있는 상태에서
 * 로그인이 안되야만 가능한 액션을 했을 때 발생하는 에러.
 */
export class AlreadyLoggedInError extends BaseError {
  readonly name = 'AlreadyLoggedInError';
  constructor(message = '이미 로그인이 되어있어서 해당 동작을 실행할 수 없습니다.') {
    super(message, {level: 'info'});
  }
}

export class NotAuthenticatedError extends BaseError {
  readonly name = 'NotAuthenticatedError';
  readonly loginUrlWithRedirect: string; // 로그인페이지 URL에 리다이랙트 URL까지 포함된 값 ex: /guest/login?redirect=...

  constructor(message: string, loginUrlWithRedirect = '/') {
    super(message, {level: 'info'});
    this.loginUrlWithRedirect = loginUrlWithRedirect;
  }
}

export interface LoginFailErrorOptions {
  channel: string; // 로그인 수단 (아이디 비번, SNS 로그인 등)
  email: string;
  data?: any;
}

/**
 * 로그인을 시도했는데 예상하지 못한 에러가 발생한 경우
 * FetchError 대신 던지려고 만든 에러입니다.
 */
export class LoginFailError extends BaseError {
  readonly name = 'LoginFailError';
  readonly options: LoginFailErrorOptions;

  constructor(message: string, options: LoginFailErrorOptions) {
    super(message, {level: 'fatal'});
    this.options = options;
  }
}
