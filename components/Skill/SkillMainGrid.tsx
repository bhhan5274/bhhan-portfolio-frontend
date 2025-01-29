'use client';

import * as React from 'react';
import { useMemo } from 'react';
import { Skill } from '@/hooks/skill/skillHooks';
import { Anchor, Avatar, Card, Group, SimpleGrid, Text, UnstyledButton } from '@mantine/core';
import classes from './SkillMainGrid.module.css';
import { useRouter } from 'next/navigation';

type Props = {
  skills: Skill[];
};

const SKILLS_LIMIT = 9;

export function SkillMainGrid({ skills }: Props) {
  const router = useRouter();

  const { displayedSkills, remainingCount } = useMemo(() => {
    if (!skills) return { displayedSkills: [], remainingCount: 0 };

    return {
      displayedSkills: skills.slice(0, SKILLS_LIMIT),
      remainingCount: Math.max(0, skills.length - SKILLS_LIMIT),
    };
  }, [skills]);

  const items = displayedSkills.map((skill) => (
    <UnstyledButton key={skill.name} className={classes.item}>
      <Avatar src={skill.path} size={50} radius="xl" />
      <Text size="md" mt={7}>
        {skill.name}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Card
      withBorder
      radius="md"
      className={classes.card}
      w={{
        base: '100%',
        md: '600',
        lg: '800',
        xl: '1000',
      }}
    >
      <Group justify="space-between">
        <Anchor
          underline="never"
          size="sm"
          variant="text"
          onClick={(e) => {
            e.preventDefault();
            router.push('/guest/about#tech-stack');
          }}
        >
          기술 스택 보기
        </Anchor>
        {remainingCount > 0 && (
          <Text size="sm" color="gray">
            +{remainingCount} other skills
          </Text>
        )}
      </Group>
      <SimpleGrid cols={3} mt="md">
        {items}
      </SimpleGrid>
    </Card>
  );
}
