'use client';

import * as React from 'react';
import { Box, LoadingOverlay, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export function Loading() {
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);

  return (
    <Box
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <LoadingOverlay
        visible
        zIndex={100}
        overlayProps={{ radius: 'none', blur: 2 }}
        loaderProps={{ size: matches ? 'xl' : 'md' }}
      />
    </Box>
  );
}
