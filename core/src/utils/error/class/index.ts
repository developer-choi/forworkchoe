import {isServer} from '@/utils/library/next';

type SeverityLevel = 'fatal' | 'error' | 'warning' | 'log' | 'info' | 'debug';

export interface SentryOption {
  level: SeverityLevel;
}

export interface BaseErrorOption {
  cause?: Error;
}

/**
 * 모든 커스텀 에러에 공통적으로 적용되야하는 설계를 반영
 */
export abstract class BaseError extends Error {
  readonly abstract name: string; // 반드시 overriding 해야하고, 이후 수정 못하게 설정

  /**
   * 외부에서 sentryOptions를 재할당 하지 못하게 하기 위해 readonly를 설정했습니다.
   * 예를들어, FetchError의 에러인스턴스의 sentry event level를 상향 하고 싶은 경우,
   * error.sentryOptions.level = 'fatal' 하는것이 아니라,
   * PaymentFetchError 같은 에러 클래스를 별도로 만들고 그 인스턴스를 던지는것을 의도했습니다.
   */
  readonly sentryOptions: SentryOption;
  readonly platform: 'server' | 'client';

  protected constructor(message: string, option: SentryOption & BaseErrorOption) {
    const {cause, ...sentry} = option ?? {};
    super(message, {cause});
    this.sentryOptions = sentry;
    this.platform = isServer() ? 'server' : 'client';
  }
}

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
