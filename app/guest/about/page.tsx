'use client';

import * as React from 'react';
import { useState } from 'react';
import { Type, useSkills } from '@/hooks/skill/skillHooks';
import { useNotification } from '@/hooks/notification/notificationHooks';
import {
  Badge,
  Box,
  Divider,
  Flex,
  Group,
  Image,
  rem,
  SimpleGrid,
  Text,
  useMantineTheme,
} from '@mantine/core';
import {
  IconAppWindow,
  IconBrandHtml5,
  IconFlame,
  IconHeartHandshake,
  IconProgressCheck,
  IconServer,
  IconServerCog,
  IconWorldWww,
} from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

function getTypeBadge(type: Type) {
  switch (type) {
    case 'BACKEND':
      return (
        <Badge color="var(--mantine-color-blue-6)" size="sm" radius="xl" variant="light">
          {type}
        </Badge>
      );
    case 'FRONTEND':
      return (
        <Badge color="var(--mantine-color-red-6)" size="sm" radius="xl" variant="light">
          {type}
        </Badge>
      );
    case 'DEVOPS':
      return (
        <Badge color="var(--mantine-color-green-6)" size="sm" radius="xl" variant="light">
          {type}
        </Badge>
      );
    case 'APP':
      return (
        <Badge color="var(--mantine-color-violet-6)" size="sm" radius="xl" variant="light">
          {type}
        </Badge>
      );
  }
  return undefined;
}

const items = [
  {
    icon: IconWorldWww,
    text1: '웹개발자',
    text2: 'Bhhan',
  },
  {
    icon: IconServer,
    text1: '전문분야',
    text2: '백엔드',
  },
  {
    icon: IconProgressCheck,
    text1: '유연한',
    text2: '문제해결',
  },
  {
    icon: IconFlame,
    text1: '도전하는',
    text2: '개발자',
  },
  {
    icon: IconHeartHandshake,
    text1: '핵심가치',
    text2: '신뢰',
  },
];

export default function Page() {
  const { data: skills, error: skillsError } = useSkills('ALL');
  const [status, setStatus] = useState<Type | null>(null);
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`);

  const mouseEnterIcon = (type: Type) => setStatus(type);
  const mouseLeaveIcon = () => setStatus(null);

  useNotification({
    status: skillsError,
    title: '스킬 불러오기 실패',
    description: 'API서버를 확인하세요.',
    color: 'red',
  });

  return (
    <Box px="sm">
      <Box mt="lg">
        <Text size="xl" fw={500}>
          웹 브라우저로 사람을 연결하는 개발자
        </Text>
        <Text size="xl" fw={500}>
          Bhhan에 대해 알아보세요!
        </Text>
      </Box>
      <SimpleGrid
        cols={{
          base: 2,
          md: 3,
          lg: 5,
        }}
        mt="xl"
      >
        {items.map((item, i) => (
          <Flex
            py="lg"
            px="40"
            key={i}
            style={{
              backgroundColor: '#f5f5f5',
              borderRadius: 10,
            }}
            direction={{
              base: 'column',
            }}
            justify="center"
            align="center"
          >
            <item.icon
              style={{ width: rem(50), height: rem(50) }}
              stroke={1}
              color="var(--mantine-color-blue-filled)"
            />
            <Box mt="sm">
              <Text ta="center">{item.text1}</Text>
              <Text ta="center">{item.text2}</Text>
            </Box>
          </Flex>
        ))}
      </SimpleGrid>
      <Box mt="50">
        <Text size="xl" fw={500}>
          개발자 소개
        </Text>
        <Box mt="lg">
          <Text size="lg" c="var(--mantine-color-gray-7)">
            웹 브라우저를 통해 사람을 연결하고 다양한 문제를 해결 및 개선하는 매력에 푹 빠져 웹
            개발에 길을 걷고 있습니다.
          </Text>
          <Text size="lg" c="var(--mantine-color-gray-7)">
            백엔드를 전문적으로 다루고 있으며 안정적인 서버 구축과 데이터베이스 설계를 통해
            효율적이고 확장 가능한 시스템을 개발하고 있습니다.
          </Text>
        </Box>
        <Box mt="lg">
          <Text size="lg" c="var(--mantine-color-gray-7)">
            문제의식과 해결의 과정으로 성장하고 있으며 항상 새로운 기술에 적극적으로 도전하며
          </Text>
          <Text size="lg" c="var(--mantine-color-gray-7)">
            다양한 프로젝트를 통해 얻어진 노하우를 바탕으로 프로젝트를 진행하고 있습니다.
          </Text>
        </Box>
      </Box>
      <Divider my="50" />
      <Box>
        <Flex justify="space-between" align="flex-end">
          <Box>
            <Text id="tech-stack" size="xl" fw={500}>
              기술스택 소개
            </Text>
            <Box mt="lg">
              <Text size="lg" c="var(--mantine-color-gray-7)">
                프로젝트를 수행하기 위해 사용해본 경험이 있는 기술스택입니다.
              </Text>
              <Text size="lg" c="var(--mantine-color-gray-7)">
                언급된 기술은 결과물을 도출해본 경험이 있으며 개발된 소스코드를 이해할 수 있습니다.
              </Text>
            </Box>
          </Box>
          <Group
            gap="md"
            visibleFrom="lg"
            onMouseLeave={(e) => {
              e.preventDefault();
              mouseLeaveIcon();
            }}
          >
            <Flex
              style={{
                cursor: 'pointer',
              }}
              align="center"
              justify="center"
              direction="column"
              onMouseEnter={(e) => {
                e.preventDefault();
                mouseEnterIcon('BACKEND');
              }}
            >
              <IconBrandHtml5
                style={{ width: rem(40), height: rem(40) }}
                stroke={1}
                color="var(--mantine-color-blue-filled)"
              />
              <Text
                c={
                  status === 'BACKEND'
                    ? 'var(--mantine-color-blue-6)'
                    : 'var(--mantine-color-gray-7)'
                }
              >
                Backend
              </Text>
            </Flex>
            <Flex
              style={{
                cursor: 'pointer',
              }}
              align="center"
              justify="center"
              direction="column"
              onMouseEnter={(e) => {
                e.preventDefault();
                mouseEnterIcon('DEVOPS');
              }}
            >
              <IconServerCog
                style={{ width: rem(40), height: rem(40) }}
                stroke={1}
                color="var(--mantine-color-green-filled)"
              />
              <Text
                c={
                  status === 'DEVOPS'
                    ? 'var(--mantine-color-blue-6)'
                    : 'var(--mantine-color-gray-7)'
                }
              >
                Devops
              </Text>
            </Flex>
            <Flex
              style={{
                cursor: 'pointer',
              }}
              align="center"
              justify="center"
              direction="column"
              onMouseEnter={(e) => {
                e.preventDefault();
                mouseEnterIcon('FRONTEND');
              }}
            >
              <IconBrandHtml5
                style={{ width: rem(40), height: rem(40) }}
                stroke={1}
                color="var(--mantine-color-red-filled)"
              />
              <Text
                c={
                  status === 'FRONTEND'
                    ? 'var(--mantine-color-blue-6)'
                    : 'var(--mantine-color-gray-7)'
                }
              >
                Frontend
              </Text>
            </Flex>
            <Flex
              style={{
                cursor: 'pointer',
              }}
              align="center"
              justify="center"
              direction="column"
              onMouseEnter={(e) => {
                e.preventDefault();
                mouseEnterIcon('APP');
              }}
            >
              <IconAppWindow
                style={{ width: rem(40), height: rem(40) }}
                stroke={1}
                color="var(--mantine-color-violet-filled)"
              />
              <Text
                c={status === 'APP' ? 'var(--mantine-color-blue-6)' : 'var(--mantine-color-gray-7)'}
              >
                Application
              </Text>
            </Flex>
          </Group>
        </Flex>
        <SimpleGrid
          cols={{
            base: '1',
            sm: '2',
            md: '3',
            lg: '4',
          }}
          my="50"
        >
          {skills?.map((skill, i) => (
            <Box
              key={i}
              py="sm"
              style={{
                opacity: status === skill.type || status === null ? 1 : 0.1,
                transition: 'opacity 0.5s ease',
              }}
            >
              <Group>
                <Image radius="md" h={40} w={40} fit="contain" src={skill.path} />
                <Box flex={1}>
                  <Group gap="sm">
                    <Text c="var(--mantine-color-gray-7)" fw={500} tt="capitalize">
                      {skill.name}
                    </Text>
                    {matches ? getTypeBadge(skill.type) : undefined}
                  </Group>
                  <Box>
                    <Text size="sm" c="var(--mantine-color-gray-7)" fw={400} lineClamp={1}>
                      {skill.description}
                    </Text>
                  </Box>
                </Box>
              </Group>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
