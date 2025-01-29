'use client';

import { Image } from '@mantine/core';

type Props = {
  route?: () => void;
  close?: () => void;
};

export const Logo = ({ route, close }: Props) => (
  <Image
    py="xs"
    src="/logo.png"
    alt="Logo"
    width={190}
    height={60}
    fit="cover"
    onClick={() => {
      route?.();
      close?.();
    }}
    style={{ cursor: 'pointer' }}
  />
);
