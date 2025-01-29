'use client';

import * as React from 'react';
import { Project, SkillItem } from '@/hooks/project/projectHooks';
import { Avatar, Badge, Box, Card, Group, Image, Text } from '@mantine/core';
import classes from './ProjectCard.module.css';
import { useRouter } from 'next/navigation';

type Props = {
  project: Project;
};

function getSkillBadge(skill: SkillItem) {
  return (
    <Badge
      key={skill.name}
      size="lg"
      radius="md"
      variant="default"
      style={{
        cursor: 'pointer',
      }}
    >
      <Group gap="xs">
        <Avatar size="20" radius="xl" src={skill.image} />
        {skill.name}
      </Group>
    </Badge>
  );
}

export function ProjectCard({ project }: Props) {
  const router = useRouter();
  const skills = project.skillList.images.map((skill) => getSkillBadge(skill));

  return (
    <Card
      shadow="sm"
      withBorder
      radius="md"
      padding="lg"
      className={classes.card}
      onClick={(e) => {
        e.preventDefault();
        router.push(`/guest/project/${project.title}`);
      }}
    >
      <Card.Section>
        <Image src={project.thumbnail} alt={project.title} height={180} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group justify="apart" gap="xs">
          <Text fz="lg" fw={500}>
            {project.title}
          </Text>
          <Badge
            size="sm"
            variant="light"
            style={{
              cursor: 'pointer',
            }}
          >
            {project.period.startDate.substring(0, 4)}
          </Badge>
        </Group>
        <Text
          fz="sm"
          mt="xs"
          lineClamp={4}
          h={85}
          style={{
            whiteSpace: 'pre-wrap',
          }}
        >
          {project.summary}
        </Text>
      </Card.Section>

      <Card.Section className={classes.section} h={120}>
        <Group gap={7} mt={15}>
          {skills}
        </Group>
        <Box className={classes.fadeEffect} />
      </Card.Section>
    </Card>
  );
}
