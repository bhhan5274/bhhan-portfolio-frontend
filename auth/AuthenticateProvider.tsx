'use client';

import * as React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box } from '@mantine/core';

type Props = {
  children: React.ReactNode;
  login: string;
  pathName: string;
};

export function AuthenticateProvider({ children, login, pathName }: Props) {
  const router = useRouter();
  useEffect(() => {
    if (!login && pathName.startsWith('/admin')) {
      router.push('/');
    }
  }, [login, pathName]);

  return <Box>{children}</Box>;
}
