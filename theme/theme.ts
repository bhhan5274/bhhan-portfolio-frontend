'use client';

import { createTheme, rem } from '@mantine/core';

export const breakpoints = {
  xs: '320px', // 모바일 소형 (iPhone SE 등)
  sm: '576px', // 모바일 대형 (iPhone Pro Max 등)
  md: '768px', // 태블릿 세로
  lg: '1024px', // 태블릿 가로 & 작은 노트북
  xl: '1280px', // 데스크탑
};

export const theme = createTheme({
  primaryColor: 'blue',
  cursorType: 'pointer',
  focusRing: 'auto',
  primaryShade: 6,
  fontSizes: {
    xs: rem('0.694rem'),
    sm: rem('0.833rem'),
    md: rem('1rem'),
    lg: rem('1.125rem'),
    xl: rem('1.44rem'),
  },
  lineHeights: {
    xs: '1.4',
    sm: '1.5',
    md: '1.6',
    lg: '1.7',
    xl: '1.8',
  },
  spacing: {
    xs: rem('0.5rem'),
    sm: rem('0.75rem'),
    md: rem('1rem'),
    lg: rem('1.25rem'),
    xl: rem('2rem'),
  },
  breakpoints: {
    xs: breakpoints.xs,
    sm: breakpoints.sm,
    md: breakpoints.md,
    lg: breakpoints.lg,
    xl: breakpoints.xl,
  },
  headings: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
    fontWeight: '500',
    textWrap: 'pretty',
    sizes: {
      h1: {
        fontSize: rem('2.986rem'),
        lineHeight: '1.6',
      },
      h2: {
        fontSize: rem('2.488rem'),
        lineHeight: '1.5',
      },
      h3: {
        fontSize: rem('2.074rem'),
        lineHeight: '1.45',
      },
      h4: {
        fontSize: rem('1.728rem'),
        lineHeight: '1.4',
      },
      h5: {
        fontSize: rem('1.44rem'),
        lineHeight: '1.35',
      },
      h6: {
        fontSize: rem('1.2rem'),
        lineHeight: '1.3',
      },
    },
  },
});
