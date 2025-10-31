import {useEffect} from 'react';
import {runCallbackInFuture, runCallbackInMidnight} from '@/utils';

/**
 * runCallbackInFuture() 에서 이 hooks가 호출된 이후 unmount 될 때 clearTimeout()를 추가한 함수입니다.
 * 그 외 내용은 동일합니다.
 */
export function useRunCallbackInFuture(futureTimestamp: number, callback: () => void) {
  useEffect(() => {
    const timeoutId = runCallbackInFuture(futureTimestamp, callback);
    
    return () => {
      clearTimeout(timeoutId);
    }
  }, [callback, futureTimestamp]);
}

/**
 * runCallbackInMidnight() 에서 이 hooks가 호출된 이후 unmount 될 때 clearTimeout()를 추가한 함수입니다.
 * 그 외 내용은 동일합니다.
 */
export function useRunCallbackInMidnight(callback: () => void) {
  useEffect(() => {
    const timeoutId = runCallbackInMidnight(callback);

    return () => {
      clearTimeout(timeoutId);
    }
  }, [callback]);
}
