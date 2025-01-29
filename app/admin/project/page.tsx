'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconCalendar, IconEraser, IconFilePlus, IconSearch, IconX } from '@tabler/icons-react';
import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Group,
  Modal,
  Pagination,
  rem,
  Table,
  Text,
  Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { ProjectView } from '@/components/ProjectView/ProjectView';
import { useRefetchCallback } from '@/hooks/fetch/fetchHooks';
import { useNotification } from '@/hooks/notification/notificationHooks';
import { Project, useDeleteProject, useProjects } from '@/hooks/project/projectHooks';

const PAGING_SIZE = 5;

export default function Page() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [project, setProject] = useState<Project | null>(null);
  const [addModalOpened, { open: addModalOpen, close: addModalClose }] = useDisclosure(false);
  const { isPending, data: projects, error, refetch } = useProjects();
  const {
    mutate: deleteProject,
    error: deleteProjectError,
    data: deleteProjectData,
  } = useDeleteProject();

  useRefetchCallback(deleteProjectData, () => {
    notifications.show({
      title: '프로젝트 삭제',
      message: '프로젝트를 삭제했습니다.',
      color: 'blue',
    });
    refetch();
    setPage(1);
  });

  useNotification({
    status: deleteProjectError,
    title: '프로젝트 삭제 실패',
    description: 'API서버를 확인하세요.',
    color: 'red',
  });

  useNotification({
    status: error,
    title: '프로젝트 불러오기 실패',
    description: 'API서버를 확인하세요.',
    color: 'red',
  });

  useEffect(() => {
    if (projects) {
      const startIndex = (page - 1) * PAGING_SIZE;
      setRows(
        projects.slice(startIndex, startIndex + PAGING_SIZE).map((project) => (
          <Table.Tr key={project.title}>
            <Table.Td w={210}>
              <Text w={210} truncate="end">
                {project.title}
              </Text>
            </Table.Td>
            <Table.Td w={270}>
              <Group align="center" gap="xs">
                <IconCalendar
                  color="var(--mantine-color-blue-6)"
                  style={{ width: rem(25), height: rem(25) }}
                  stroke={1.5}
                />
                <Text>
                  {project.period.startDate.substring(0, 7)} ~{' '}
                  {project.period.endDate.substring(0, 7)}
                </Text>
              </Group>
            </Table.Td>
            <Table.Td w={70}>
              <Badge size="lg" variant="light" circle color="var(--mantine-color-blue-6)">
                {project.member}
              </Badge>
            </Table.Td>
            <Table.Td>
              <Avatar.Group>
                {project.skillList.images.map((item) => (
                  <Avatar key={item.name} src={item.image} bg="var(--mantine-color-blue-0)" />
                ))}
              </Avatar.Group>
            </Table.Td>
            <Table.Td w={180}>
              <Group justify="center">
                <ActionIcon
                  size={33}
                  radius="md"
                  aria-label="프로젝트 미리보기"
                  variant="outline"
                  color="blue"
                  onClick={() => {
                    setProject(project);
                    addModalOpen();
                  }}
                >
                  <Tooltip position="bottom" offset={10} label="미리보기">
                    <IconSearch style={{ width: '60%', height: '60%' }} stroke={2} />
                  </Tooltip>
                </ActionIcon>
                <ActionIcon
                  size={33}
                  radius="md"
                  aria-label="프로젝트 수정"
                  variant="outline"
                  color="green"
                  onClick={() => {
                    router.push(`/admin/project/update/${project.title}`);
                  }}
                >
                  <Tooltip position="bottom" offset={10} label="수정하기">
                    <IconEraser style={{ width: '60%', height: '60%' }} stroke={2} />
                  </Tooltip>
                </ActionIcon>
                <ActionIcon
                  size={33}
                  radius="md"
                  aria-label="프로젝트 삭제"
                  variant="outline"
                  color="red"
                  onClick={() =>
                    modals.openConfirmModal({
                      title: '프로젝트 삭제',
                      children: <Text size="sm">{project.title}를 삭제하시겠습니까?</Text>,
                      labels: { confirm: '확인', cancel: '취소' },
                      onCancel: () => {},
                      onConfirm: () => {
                        deleteProject(project.title);
                      },
                    })
                  }
                >
                  <Tooltip position="bottom" offset={10} label="삭제">
                    <IconX style={{ width: '60%', height: '60%' }} stroke={2} />
                  </Tooltip>
                </ActionIcon>
              </Group>
            </Table.Td>
          </Table.Tr>
        ))
      );
    }
  }, [projects, page]);

  return (
    <Box>
      <Modal
        size="70%"
        opened={addModalOpened}
        onClose={() => {
          addModalClose();
        }}
        title="미리보기"
      >
        <ProjectView project={project} />
      </Modal>
      <Group justify="end" mb="sm" align="end">
        <Button
          leftSection={<IconFilePlus />}
          variant="outline"
          onClick={() => {
            router.push('/admin/project/add');
          }}
        >
          프로젝트 추가
        </Button>
      </Group>
      <Group justify="flex-end">
        <Table.ScrollContainer minWidth={1200}>
          <Table
            horizontalSpacing="md"
            verticalSpacing="md"
            highlightOnHover
            withTableBorder
            withColumnBorders
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th w={230}>
                  <Text fw={500}>제목</Text>
                </Table.Th>
                <Table.Th w={220}>
                  <Text fw={500}>기간</Text>
                </Table.Th>
                <Table.Th w={90}>
                  <Text fw={500}>멤버</Text>
                </Table.Th>
                <Table.Th>
                  <Text fw={500}>기술스택</Text>
                </Table.Th>
                <Table.Th w={180} />
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{isPending ? undefined : rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Group>
      {projects ? (
        projects.length > 0 ? (
          <Group justify="center" mt="sm">
            <Pagination
              value={page}
              total={Math.max(Math.ceil(projects.length / PAGING_SIZE), 1)}
              onChange={setPage}
              withEdges
            />
          </Group>
        ) : undefined
      ) : undefined}
    </Box>
  );
}
