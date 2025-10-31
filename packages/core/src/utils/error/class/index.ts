import {isServer} from '@/utils/library/next.ts';

// https://docs.google.com/document/d/1fDdCty-17daSr-SgSyGtf31vmpOpSAbEct_wk1j9Pds/edit?tab=t.0
type SeverityLevel = 'fatal' | 'error' | 'warning' | 'log' | 'info' | 'debug';

export interface SentryOption {
  level: SeverityLevel;
  tags?: Record<string, string | number>;

  /**
   * false면 해당 에러인스턴스는 Sentry로 전송되지 않습니다.
   * 용도 1. ApiResponseError처럼 request, response를 모두 담고있는 인스턴스가있는데 인증관련 API에서 발생한 경우 민감한 정보가 Sentry로 보내지지 않기 위함
   * 용도 2. 403 에러처럼 Sentry로 보내지지않아도 되는 경우
   */
  report?: boolean;
}

export interface BaseErrorOption {
  cause?: Error;
}

/**
 * Doc: https://docs.google.com/document/d/1_p3OS_WSc1oh18QIELCfpRqODdzhaX57aRF9hsu_UD8/edit?tab=t.0
 * @description 모든 커스텀 에러에 공통적으로 적용되야하는 설계를 반영
 */
export default abstract class BaseError extends Error {
  readonly abstract name: string;

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
