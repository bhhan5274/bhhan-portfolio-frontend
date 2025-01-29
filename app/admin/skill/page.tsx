'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { IconX } from '@tabler/icons-react';
import {
  ActionIcon,
  Badge,
  Box,
  Group,
  Image,
  NativeSelect,
  Pagination,
  Table,
  Text,
  Tooltip,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { AddSkillButton } from '@/components/Skill/AddSkillButton';
import { useRefetchCallback } from '@/hooks/fetch/fetchHooks';
import { useNotification } from '@/hooks/notification/notificationHooks';
import { Type as SkillType, useDeleteSkill, useSkills } from '@/hooks/skill/skillHooks';

function getTypeBadge(type: SkillType) {
  switch (type) {
    case 'BACKEND':
      return (
        <Badge color="var(--mantine-color-blue-6)" size="lg" radius="xl" variant="light">
          {type}
        </Badge>
      );
    case 'FRONTEND':
      return (
        <Badge color="var(--mantine-color-red-6)" size="lg" radius="xl" variant="light">
          {type}
        </Badge>
      );
    case 'DEVOPS':
      return (
        <Badge color="var(--mantine-color-green-6)" size="lg" radius="xl" variant="light">
          {type}
        </Badge>
      );
    case 'APP':
      return (
        <Badge color="var(--mantine-color-violet-6)" size="lg" radius="xl" variant="light">
          {type}
        </Badge>
      );
  }
  return undefined;
}

const PAGING_SIZE = 5;

export default function Page() {
  const [type, setType] = useState<SkillType>('ALL');
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const { isPending, data: skills, error, refetch } = useSkills(type);
  const { mutate: deleteSkill, error: deleteSkillError, data: deleteSkillData } = useDeleteSkill();

  useRefetchCallback(deleteSkillData, () => {
    notifications.show({
      title: '스킬 삭제',
      message: '스킬을 삭제했습니다.',
      color: 'blue',
    });
    refetch();
    setPage(1);
  });

  useNotification({
    status: deleteSkillError,
    title: '스킬 삭제 실패',
    description: 'API서버를 확인하세요.',
    color: 'red',
  });

  useNotification({
    status: error,
    title: '스킬 불러오기 실패',
    description: 'API서버를 확인하세요.',
    color: 'red',
  });

  useEffect(() => {
    if (skills) {
      const startIndex = (page - 1) * PAGING_SIZE;
      setRows(
        skills.slice(startIndex, startIndex + PAGING_SIZE).map((skill) => (
          <Table.Tr key={skill.name}>
            <Table.Td>
              <Image radius="md" h={50} w={50} fit="contain" src={skill.path} />
            </Table.Td>
            <Table.Td>
              <Text>{skill.name}</Text>
            </Table.Td>
            <Table.Td>{getTypeBadge(skill.type)}</Table.Td>
            <Table.Td>
              <Text>{skill.description}</Text>
            </Table.Td>
            <Table.Td>
              <Group justify="center">
                <ActionIcon
                  size={33}
                  radius="md"
                  aria-label="스킬 삭제"
                  variant="outline"
                  color="red"
                  onClick={() =>
                    modals.openConfirmModal({
                      title: '스킬 삭제',
                      children: <Text size="sm">{skill.name}를 삭제하시겠습니까?</Text>,
                      labels: { confirm: '확인', cancel: '취소' },
                      onCancel: () => {},
                      onConfirm: () => {
                        deleteSkill(skill.name);
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
  }, [skills, page]);

  return (
    <Box>
      <Group justify="end" mb="sm" align="end">
        <NativeSelect
          value={type}
          onChange={(event) => {
            setType(event.currentTarget.value);
            setPage(1);
          }}
          data={[
            { label: 'ALL', value: 'ALL' },
            { label: 'BACKEND', value: 'BACKEND' },
            { label: 'DEVOPS', value: 'DEVOPS' },
            { label: 'FRONTEND', value: 'FRONTEND' },
            { label: 'APP', value: 'APP' },
          ]}
        />
        <AddSkillButton
          successCallback={() => {
            refetch();
            setPage(1);
          }}
        />
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
                <Table.Th w={90}>
                  <Text fw={500}>이미지</Text>
                </Table.Th>
                <Table.Th w={210}>
                  <Text fw={500}>이름</Text>
                </Table.Th>
                <Table.Th w={180}>
                  <Text fw={500}>타입</Text>
                </Table.Th>
                <Table.Th>
                  <Text fw={500}>설명</Text>
                </Table.Th>
                <Table.Th w={70} />
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{isPending ? undefined : rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Group>
      {skills ? (
        skills.length > 0 ? (
          <Group justify="center" mt="sm">
            <Pagination
              value={page}
              total={Math.max(Math.ceil(skills.length / PAGING_SIZE), 1)}
              onChange={setPage}
              withEdges
            />
          </Group>
        ) : undefined
      ) : undefined}
    </Box>
  );
}
