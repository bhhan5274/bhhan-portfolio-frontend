'use client';

import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { useProjects } from '@/hooks/project/projectHooks';
import { useNotification } from '@/hooks/notification/notificationHooks';
import { ProjectMainCard } from '@/components/Project/ProjectMainCard';
import { IconArrowRight, IconSearch } from '@tabler/icons-react';
import { SkillMainGrid } from '@/components/Skill/SkillMainGrid';
import { useSkills } from '@/hooks/skill/skillHooks';

export default function HomePage() {
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`);
  const router = useRouter();
  const { data: projects, error: projectsError } = useProjects();
  const { data: skills, error: skillsError } = useSkills('ALL');

  useNotification({
    status: projectsError,
    title: '프로젝트 불러오기 실패',
    description: 'API서버를 확인하세요.',
    color: 'red',
  });

  useNotification({
    status: skillsError,
    title: '스킬 불러오기 실패',
    description: 'API서버를 확인하세요.',
    color: 'red',
  });

  return (
    <Box>
      <Box
        style={{
          position: 'relative',
        }}
      >
        {matches ? undefined : (
          <Box
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundImage: `url(${process.env.NEXT_PUBLIC_URL || ''}/main.webp)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: 0.1,
            }}
          />
        )}
        <Flex
          direction={{
            base: 'column',
            lg: 'row',
          }}
        >
          <Box py="30px" px="lg" flex={1}>
            <Title
              order={3}
              fw={700}
              style={{
                fontFamily: 'Monaco, Courier, monospace',
              }}
            >
              Hi, I am Bhhan
            </Title>
            <Title
              order={3}
              fw={700}
              style={{
                fontFamily: 'Monaco, Courier, monospace',
              }}
            >
              Backend Developer
            </Title>
            <Text
              size="lg"
              mt="xl"
              fw={{
                base: 500,
              }}
              c={{
                lg: 'var(--mantine-color-gray-7)',
              }}
            >
              안녕하세요! 안정적이고 효율적인 서버 개발로 가치를 만드는 백엔드 개발자입니다.
            </Text>
            <Text
              size="lg"
              fw={{
                base: 500,
              }}
              c={{
                lg: 'var(--mantine-color-gray-7)',
              }}
            >
              사용자와 서비스를 이어주는 견고한 시스템을 만듭니다.{' '}
            </Text>
            <Text
              size="lg"
              fw={{
                base: 500,
              }}
              c={{
                lg: 'var(--mantine-color-gray-7)',
              }}
            >
              지금까지의 여정이 담긴 포트폴리오를 소개합니다.
            </Text>
            <Button
              variant="outline"
              size="xl"
              mt="xl"
              rightSection={<IconArrowRight size={18} />}
              radius="xl"
              onClick={(e) => {
                e.preventDefault();
                router.push('/guest/about');
              }}
            >
              <Text fw={700} size="md">
                개발자 소개
              </Text>
            </Button>
          </Box>
          <Box flex={1} visibleFrom="lg">
            <Box w="100%" h={400} p="lg">
              <Image radius="md" src="/main.webp" w="100%" fit="contain" h="100%" />
            </Box>
          </Box>
        </Flex>
      </Box>
      <Divider my="50" />
      <Box px="lg">
        <Group align="end">
          <Group>
            <Title order={3} c="blue">
              Featured
            </Title>
            <Title order={3}>Works</Title>
          </Group>
          <Text
            size="lg"
            ml={{
              base: undefined,
              md: 'sm',
            }}
            fw={{
              base: 500,
            }}
            c={{
              base: 'var(--mantine-color-gray-7)',
            }}
          >
            프로젝트를 진행하면서 다져진 경험이 스며들어 있습니다.
          </Text>
        </Group>
        <Box mt="sm">
          {projects?.slice(0, 3).map((project) => (
            <Box key={project.title}>
              <ProjectMainCard project={project} />
            </Box>
          ))}
        </Box>
        <Center>
          <Button
            variant="outline"
            size="xl"
            mt="xl"
            rightSection={<IconSearch size={18} />}
            radius="xl"
            onClick={(e) => {
              e.preventDefault();
              router.push('/guest/project');
            }}
          >
            <Text fw={700} size="md">
              프로젝트 살펴보기
            </Text>
          </Button>
        </Center>
      </Box>
      <Divider my="50" />
      <Stack align="center" mb={50}>
        <Group>
          <Title order={3}>Tech</Title>
          <Title order={3} c="blue">
            Stack
          </Title>
        </Group>
        <Box>
          <Text
            ta="center"
            mt="sm"
            size="lg"
            fw={{
              base: 500,
            }}
            c={{
              base: 'var(--mantine-color-gray-7)',
            }}
          >
            개발에 필요한 다양한 기술 스택을 보유하고 있습니다.
          </Text>
          <Text
            ta="center"
            size="lg"
            fw={{
              base: 500,
            }}
            c={{
              base: 'var(--mantine-color-gray-7)',
            }}
          >
            분야별 기술에 대한 자세한 내용은 소개 페이지에서 확인하실 수 있습니다.
          </Text>
        </Box>
        <SkillMainGrid skills={skills} />
      </Stack>
    </Box>
  );
}
