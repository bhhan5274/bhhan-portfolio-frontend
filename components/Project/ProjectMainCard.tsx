'use client';

import * as React from 'react';
import { Project } from '@/hooks/project/projectHooks';
import { Box, Flex, Image, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

type Props = {
  project: Project;
};

export function ProjectMainCard({ project }: Props) {
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  return (
    <Flex
      py="lg"
      gap="md"
      direction={{
        base: 'column',
        md: 'row',
      }}
      style={
        matches
          ? {
              boxShadow: 'var(--mantine-shadow-sm)',
            }
          : undefined
      }
      my={matches ? 'md' : undefined}
      px={matches ? 'sm' : undefined}
    >
      <Box flex={3}>
        <Image radius="md" h="100%" w="100%" fit="fill" src={project.thumbnail} />
      </Box>
      <Box flex={7}>
        <Stack>
          <Title order={5} fw={700}>
            {project.title}
          </Title>
          {/*<Flex*/}
          {/*  align="center"*/}
          {/*  wrap="wrap"*/}
          {/*  w={{*/}
          {/*    base: '100%',*/}
          {/*    lg: 450,*/}
          {/*  }}*/}
          {/*  gap="xs"*/}
          {/*>*/}
          {/*  {project.skillList.images.map((skill) => (*/}
          {/*    <Box key={skill.name}>{getSkillBadge(skill)}</Box>*/}
          {/*  ))}*/}
          {/*</Flex>*/}
          <Text
            w={{
              base: '100%',
              lg: 600,
            }}
            lineClamp={5}
            c="var(--mantine-color-gray-7)"
            fw={500}
            style={{
              whiteSpace: 'pre-wrap',
            }}
          >
            {project.summary}
          </Text>
        </Stack>
      </Box>
    </Flex>
  );
}
