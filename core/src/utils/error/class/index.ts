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
  readonly sentry: Partial<SentryOption> | undefined;
  // readonly platform: 'server' | 'client'; 공통적으로 저장하고 싶은 데이터가 있다면 추가

  protected constructor(message: string, option: SentryOption & BaseErrorOption) {
    const {cause, ...sentry} = option ?? {};
    super(message, {cause});
    this.sentry = sentry;
    // this.platform = isServer() ? 'server' : 'client';
  }
}

export interface ValidationErrorOptions<T extends string> {
  /**
   * 목적: 에러가 발생한 폼 요소를 구분할 수 있는 값.
   * - 주로 react-hook-form의 register()로 전달하는 name값을 location에 전달하는 경우가 많습니다.
   */
  location?: T;

  /**
   * 에러가 발생한 당시 폼 데이터 전체 혹은 일부.
   * 혹은 함수로 전달된 매개변수.
   * 필요 시 전달 (Sentry로 보내서 원인 파악을 위함)
   */
  data: object;
}

export class ValidationError<L extends string = string> extends BaseError {
  readonly options: ValidationErrorOptions<L>;
  readonly name = 'ValidationError';

  constructor(message: string, options: ValidationErrorOptions<L>) {
    super(message, {level: 'info'});
    this.options = options;
  }
}
