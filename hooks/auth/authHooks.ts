import { useEffect, useState } from 'react';
import { useLocalStorage } from '@mantine/hooks';

export type AuthStatus = 'success' | 'fail';

export const useAuthenticate = () => {
  const [authenticate, setAuthenticate] = useState<AuthStatus>('fail');
  const [login, setLogin] = useLocalStorage<boolean>({
    key: 'login',
    defaultValue: false,
  });

  useEffect(() => {
    login ? setAuthenticate('success') : setAuthenticate('fail');
  }, [login]);

  return { authenticate, setLogin, login };
};
