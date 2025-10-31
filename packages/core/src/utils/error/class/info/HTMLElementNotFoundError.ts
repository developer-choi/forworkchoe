import BaseError from '@/utils/error/class';

/**
 * @class HTMLElementNotFoundError
 * @description CSS 셀렉터로 DOM 요소를 찾지 못했을 때 발생하는 사용자 정의 에러입니다.
 */
export default class HTMLElementNotFoundError extends BaseError {
  readonly name = 'HTMLElementNotFoundError';
  readonly selector: string;

  constructor({selector, message}: {selector: string; message?: string}) {
    super(message ?? `Could not find the element for selector: "${selector}"`, {level: 'warning'});
    this.selector = selector;
  }
}