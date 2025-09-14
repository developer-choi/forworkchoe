import {BaseError} from '@/utils';

export interface ValidationErrorOptions<T extends string> {
  /**
   * 에러가 발생한 원인 or 폼요소 위치를 구분하기 위한 값
   * 목적 1. react-hook-form의 register()로 전달하는 name값을 전달해서 사용
   * 목적 2. 파일 유효성검증하다가 원인이 파일명 유효성검증 규칙이면 SYNTAX가 될 수도 있고, 용량이면 SIZE가 될 수도 있음.
   */
  reason?: T;

  /**
   * 에러가 발생한 당시 폼 데이터 전체 혹은 일부.
   * 혹은 함수로 전달된 매개변수.
   * 필요 시 전달 (Sentry로 보내서 원인 파악을 위함)
   */
  data: object;
}

export class ValidationError<L extends string = string> extends BaseError {
  readonly name = 'ValidationError';
  readonly options: ValidationErrorOptions<L>;

  constructor(message: string, options: ValidationErrorOptions<L>) {
    super(message, {level: 'info'});
    this.options = options;
  }
}
