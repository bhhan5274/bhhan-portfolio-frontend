'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Group, Pagination, SimpleGrid, Text } from '@mantine/core';
import { useProjects } from '@/hooks/project/projectHooks';
import { useNotification } from '@/hooks/notification/notificationHooks';
import { ProjectCard } from '@/components/Project/ProjectCard';

export default function Page() {
  const { data: projects, error: projectsError } = useProjects();
  const [rows, setRows] = useState([]);

  useNotification({
    status: projectsError,
    title: '프로젝트 불러오기 실패',
    description: 'API서버를 확인하세요.',
    color: 'red',
  });

  useEffect(() => {
    if (projects) {
      setRows(
        projects.map((project) => (
          <Box key={project.title}>
            <ProjectCard project={project} />
          </Box>
        ))
      );
    }
  }, [projects]);

  return (
    <Box px="sm">
      <Box mt="lg">
        <Text size="xl" fw={500}>
          개발을 통해 작은 문제를 해결하고 개선한
        </Text>
        <Text size="xl" fw={500}>
          프로젝트들을 정리 했어요
        </Text>
      </Box>
      <SimpleGrid
        spacing="lg"
        verticalSpacing="lg"
        cols={{
          base: 1,
          sm: 2,
          md: 2,
          lg: 3,
        }}
        mt="xl"
      >
        {rows}
      </SimpleGrid>
      {/*{projects ? (*/}
      {/*  projects.length > 0 ? (*/}
      {/*    <Group justify="center" mt={30} mb={15}>*/}
      {/*      <Pagination*/}
      {/*        value={page}*/}
      {/*        total={Math.max(Math.ceil(projects.length / PAGING_SIZE), 1)}*/}
      {/*        onChange={setPage}*/}
      {/*        withEdges*/}
      {/*      />*/}
      {/*    </Group>*/}
      {/*  ) : undefined*/}
      {/*) : undefined}*/}
    </Box>
  );
}
