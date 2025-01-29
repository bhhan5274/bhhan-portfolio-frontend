'use client';

import * as React from 'react';
import { Avatar, Badge, Box, Divider, Flex, Group, Image, Text, Title } from '@mantine/core';
import { Project, SkillItem } from '@/hooks/project/projectHooks';
import { IconCalendar, IconUser } from '@tabler/icons-react';
import ReadEditor from '@/components/CustomEditor/ReadEditor';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

type Props = {
  project: Project;
};

export function getSkillBadge(skill: SkillItem) {
  return (
    <Badge size="lg" radius="md" variant="default">
      <Group gap="xs">
        <Avatar size="20" radius="xl" src={skill.image} />
        {skill.name}
      </Group>
    </Badge>
  );
}

export function ProjectView({ project }: Props) {
  return (
    <Box>
      <Title order={3}>{project.title}</Title>
      <Group gap="xs" mt="lg">
        <IconCalendar color="var(--mantine-color-red-4)" />
        <Text>
          {project.period.startDate.substring(0, 7)} ~ {project.period.endDate.substring(0, 7)}
        </Text>
      </Group>
      <Group gap="xs" mt="xs">
        <IconUser color="var(--mantine-color-blue-4)" />
        <Text>{project.member}인 프로젝트</Text>
      </Group>
      <Flex
        align="center"
        mt="sm"
        wrap="wrap"
        w={{
          base: '100%',
          sm: 400,
          md: 500,
          lg: 600,
        }}
        gap="xs"
      >
        {project.skillList.images.map((skill) => (
          <Box key={skill.name}>{getSkillBadge(skill)}</Box>
        ))}
      </Flex>
      <Box mt="xl">
        <ReadEditor content={project.description} />
      </Box>
      <Divider my="lg" />
      <Box>
        <Box
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1rem',
          }}
        >
          {project.imageGallery.images.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={`프로젝트 이미지 ${i}`}
              style={{
                width: '100%',
                height: '150px',
                objectFit: 'fill',
                cursor: 'pointer',
              }}
              onClick={() => {
                Fancybox.show(
                  project.imageGallery.images.map((src) => ({ src })),
                  {
                    startIndex: i,
                    animated: false,
                    showClass: false,
                    hideClass: false,
                    dragToClose: false,
                    Images: { zoom: false },
                    Toolbar: {
                      display: {
                        left: [],
                        middle: [],
                        right: ['close'],
                      },
                    },
                    Carousel: {
                      transition: false,
                    },
                  }
                );
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
