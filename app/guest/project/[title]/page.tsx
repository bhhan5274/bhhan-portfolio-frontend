'use client';

import * as React from 'react';
import { useProject } from '@/hooks/project/projectHooks';
import { useNotification } from '@/hooks/notification/notificationHooks';
import { Box, Button, Group, Text } from '@mantine/core';
import { ProjectView } from '@/components/ProjectView/ProjectView';
import { IconArrowLeft } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

export default function Page({ params }: { params: Promise<{ title: string }> }) {
  const { title } = React.use(params);
  const { data: project, error } = useProject(title);
  const router = useRouter();

  useNotification({
    status: error,
    title: '프로젝트 불러오기 실패',
    description: 'API서버를 확인하세요.',
    color: 'red',
  });

  return (
    <Box>
      {project ? <ProjectView project={project} /> : undefined}
      <Group justify="center" my="lg">
        <Button
          variant="outline"
          size="xl"
          mt="xl"
          leftSection={<IconArrowLeft size={18} />}
          radius="xl"
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
        >
          <Text fw={700} size="md">
            목록 보기
          </Text>
        </Button>
      </Group>
    </Box>
  );
}
