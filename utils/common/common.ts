import { LocalDate, ZonedDateTime, ZoneId } from '@js-joda/core';

import '@js-joda/timezone';
import { Skill } from '@/hooks/skill/skillHooks';
import { SkillItem } from '@/hooks/project/projectHooks';

export const getSeoulTime = (): Date => {
  const seoulZone = ZoneId.of('Asia/Seoul');
  const seoulZonedDateTime = ZonedDateTime.now(seoulZone);
  const epochMillis = seoulZonedDateTime.toInstant().toEpochMilli();
  return new Date(epochMillis);
};

export const parseSeoulDate = (dateStr: string): Date => {
  const seoulZone = ZoneId.of('Asia/Seoul');
  const localDate = LocalDate.parse(dateStr);
  const zonedDateTime = localDate.atStartOfDay(seoulZone);
  const epochMillis = zonedDateTime.toInstant().toEpochMilli();
  return new Date(epochMillis);
};

export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const getOriginalFileName = (path: string): string => {
  const parts = path.split('/');
  return parts[parts.length - 1];
};

export const findSkillsByExactNames = (
  skills: Skill[] = [],
  searchNames: string[] = []
): SkillItem[] => {
  if (!skills?.length || !searchNames?.length) return [];

  return skills
    .filter((skill) =>
      searchNames.some((name) => skill?.name?.toLowerCase() === name.toLowerCase())
    )
    .map((skill) => ({
      name: skill.name,
      image: skill.path,
    }));
};

export const convertUrlsToFiles = async (imageUrls: string[]): Promise<File[]> => {
  try {
    const filePromises = imageUrls.map(async (url) => {
      const blob = new Blob();
      return new File([blob], url.split('/').pop(), {
        type: 'image/jpeg',
      });
    });

    return await Promise.all(filePromises);
  } catch (error) {
    console.error('이미지 URL을 File로 변환 실패:', error);
    return [];
  }
};
