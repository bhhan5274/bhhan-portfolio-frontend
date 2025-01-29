import { useMutation, useQuery } from '@tanstack/react-query';
import { request } from '@/utils/axios/axios';

export type Type = 'ALL' | 'BACKEND' | 'DEVOPS' | 'FRONTEND' | 'APP';

export type Skill = {
  pk: string;
  sk: string;
  name: string;
  path: string;
  description: string;
  type: Type;
};

export type AddSkillRequest = {
  name: string;
  path: string;
  description: string;
  type: Type;
};

export const useSkills = (type: Type) =>
  useQuery<Skill[]>({
    queryKey: ['skills', type],
    queryFn: () => fetchSkills(type),
  });

const fetchSkills = (type: Type) =>
  request({
    url: `/api/v1/skill?type=${type}`,
    method: 'get',
  }).then((res) => res.data);

export const useAddSkill = () =>
  useMutation({
    mutationFn: addSkill,
  });

const addSkill = (addSkillRequest: AddSkillRequest) =>
  request({
    url: '/api/v1/skill',
    method: 'post',
    data: addSkillRequest,
  });

export const useDeleteSkill = () =>
  useMutation({
    mutationFn: deleteSkill,
  });

const deleteSkill = (name: string) =>
  request({
    url: `/api/v1/skill/${name}`,
    method: 'delete',
  });
