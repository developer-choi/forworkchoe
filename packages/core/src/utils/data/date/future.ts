import {getDiffDate} from '@/utils/data/date/util.ts';

/**
 * @param futureTimestamp 미래의 timestamp
 * @param callback 미래에 실행할 콜백
 * @return NodeJS.Timeout
 * @description 미래에, 전달한 timestamp가 되면, callback을 실행합니다.
 * 반드시, 필요없는 경우 clearTimeout를 호출해야합니다.
 */
export function runCallbackInFuture(futureTimestamp: number, callback: () => void) {
  const timeout = futureTimestamp - Date.now();

  if (timeout < 0) {
    console.warn('futureTimestamp is not more future than present. The callback is not executed.');
    return;
  }

  return setTimeout(callback, timeout);
}

/**
 * 내일 자정이 되면 전달받은 callback을 실행합니다.
 * 그 외 내용은 runCallbackInFuture()와 동일합니다.
 */
export function runCallbackInMidnight(callback: () => void) {
  const midnight = getDiffDate(new Date(), [0, 0, 1]);
  return runCallbackInFuture(midnight.getTime(), callback);
}
