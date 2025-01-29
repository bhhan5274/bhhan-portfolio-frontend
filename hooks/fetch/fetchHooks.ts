import { useEffect } from 'react';

export function useRefetchCallback(status: any, successCallback: () => void) {
  useEffect(() => {
    if (status) {
      successCallback();
    }
  }, [status]);
}
