import {isServer} from '@/utils/library/next';

/** 현재 목적
 * fatal = 현재 작업 중단하고 바로 확인해야하는 에러
 * error = unhandled
 * warning = 처리를 하긴 해야하지만, 바로 확인할 필요는 없는 에러
 * info = 짧은 기간안에 아주 많이 발생한 경우에만 확인 할 에러
 *
 * 예시 1. ResourceLoadError ==> 어드민에서 배너이미지를 없는 경로로 지정하는 경우에 짧은기간동안 많은 ResourceLoadError 에러가 발생하게 될텐데, 이걸 감지하기 위함
 * 예시 2. NotFoundError ==> 어드민에서 배너이미지에 클릭 시 이동할 웹페이지 URL 링크를 잘못 건 경우 (이하 생략)
 */
type SeverityLevel = 'fatal' | 'error' | 'warning' | 'log' | 'info' | 'debug';

export interface SentryOption {
  level: SeverityLevel;
  tags?: Record<string, string | number>;
}

export interface BaseErrorOption {
  cause?: Error;
}

/**
 * 모든 커스텀 에러에 공통적으로 적용되야하는 설계를 반영
 */
export default abstract class BaseError extends Error {
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
