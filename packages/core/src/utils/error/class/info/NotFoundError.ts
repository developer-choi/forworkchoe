import BaseError from '@/utils/error/class';

/**
 * 1. API 호출했는데 404가 응답된 경우
 * 2. 없는 웹페이지 pathname으로 접근 해서 404가 응답된 경우
 */
export interface NotFoundOptions {
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  url: string;
}

export default class NotFoundError extends BaseError {
  readonly name = 'NotFoundError';

  constructor(options: NotFoundOptions) {
    super(`${options.method} ${options.url}`, {
      level: 'info'
    });
  }
}
