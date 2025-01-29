'use client';

import * as React from 'react';
import parse from 'html-react-parser';
import { Box } from '@mantine/core';

type Props = {
  content: string;
};

export default function ReadEditor({ content }: Props) {
  return <Box>{parse(content)}</Box>;
}
