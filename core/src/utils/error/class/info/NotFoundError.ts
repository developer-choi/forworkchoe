import BaseError from '@/utils/error/class';

/**
 * 1. API 호출했는데 404가 응답된 경우
 * 2. 이미지 / 동영상 등 외부 리소스를 가져오려고 헀는데 404가 응답된 경우
 *
 * 몇건 발생했다면 대응하지 않아도 되는 오류지만,
 * 짧은기간안에 많이 발생했다면, 대응을 해야하는 오류 입니다.
 * 예시로, 어드민에서 배너이미지를 없는 경로로 지정하는 경우에 짧은기간동안 많은 NotFoundError 에러가 발생할 수 있습니다.
 */
export interface NotFoundOptions {
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  url: string;
  type: string; // image, video, api, 기타등등
  data?: any; // 기타 첨부하고싶은 데이터가 있는 경우. API 404인 경우라면 request가 될 수 있음.
}

export default class NotFoundError extends BaseError {
  readonly name = 'NotFoundError';

  constructor(options: NotFoundOptions) {
    super(`${options.method} ${options.url}`, {
      level: 'info',
      tags: {
        type: options.type,
      },
    });
  }
}
