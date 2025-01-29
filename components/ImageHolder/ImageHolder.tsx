import * as React from 'react';
import { IconX } from '@tabler/icons-react';
import { Box, Image, rem } from '@mantine/core';

type ImageHolderProps = {
  radius: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  src?: string;
  height: number | string;
  width: number | string;
  deleteCallback?: () => void;
  useDelete?: boolean;
};

export function ImageHolder({
  radius,
  src,
  width,
  height,
  deleteCallback,
  useDelete,
}: ImageHolderProps) {
  return (
    <Box style={{ position: 'relative' }}>
      {src ? (
        <Image
          radius={radius}
          src={src}
          w={width}
          h={height}
          style={{
            objectFit: 'contain',
          }}
          fallbackSrc="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        />
      ) : undefined}
      {useDelete ? (
        <IconX
          style={{
            width: rem(20),
            height: rem(20),
            borderRadius: 2,
            color: 'white',
            background: 'var(--mantine-color-blue-6)',
            position: 'absolute',
            top: 0,
            right: 0,
            cursor: 'pointer',
          }}
          onClick={() => deleteCallback?.()}
        />
      ) : undefined}
    </Box>
  );
}
