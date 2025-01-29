'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { MantineProvider } from '@mantine/core';
import { theme } from '@/theme/theme';

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const [isMount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  if (!isMount) {
    return null;
  }

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme} forceColorScheme="light">
      {children}
    </MantineProvider>
  );
}
