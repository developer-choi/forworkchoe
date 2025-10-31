import BaseError from '@/utils/error/class';

/**
 * 개발자가 프로젝트에서 정한 코드관련 정책을 지키지 않은 경우 발생함.
 *
 * 1. client side에서만 호출되기를 기대하고 작성한 함수를 server side에서 호출했거나
 * 2. 1 | 2 | 3 등 자연수만 전달되기를 기대하고 작성한 함수에 소수점같은 값을 전달한다거나,
 */
export default class InvalidDevelopPolicyError extends BaseError {
  readonly name = 'InvalidDevelopPolicyError';
  readonly data: any | undefined;

  constructor(message: string, data?: any) {
    super(message, {level: 'warning'});
    this.data = data;
  }
}
