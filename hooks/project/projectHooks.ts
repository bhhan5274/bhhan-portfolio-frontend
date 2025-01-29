import { useMutation, useQuery } from '@tanstack/react-query';
import { request } from '@/utils/axios/axios';

export type Period = {
  startDate: string;
  endDate: string;
};

export type SkillItem = {
  name: string;
  image: string;
};

export type Project = {
  pk: string;
  sk: string;
  title: string;
  member: number;
  summary: string;
  description: string;
  thumbnail: string;
  period: Period;
  imageGallery: {
    images: string[];
  };
  skillList: {
    images: SkillItem[];
  };
};

export type AddProjectRequest = {
  title: string;
  member: number;
  summary: string;
  description: string;
  startDate: string;
  endDate: string;
  thumbnail: string;
  images: string[];
  skills: SkillItem[];
};

export const useProject = (title: string) =>
  useQuery<Project>({
    queryKey: ['project', title],
    queryFn: () => fetchProject(title),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: 'always',
  });

const fetchProject = (title: string) =>
  request({
    url: `/api/v1/project/${title}`,
    method: 'get',
  }).then((res) => res.data);

export const useProjects = () =>
  useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: () => fetchProjects(),
  });

const fetchProjects = () =>
  request({
    url: '/api/v1/project',
    method: 'get',
  }).then((res) => res.data);

export const useDeleteProject = () =>
  useMutation({
    mutationFn: deleteProject,
  });

const deleteProject = (title: string) =>
  request({
    url: `/api/v1/project/${title}`,
    method: 'delete',
  });

export const useAddProject = () =>
  useMutation({
    mutationFn: addProject,
  });

const addProject = (addProjectRequest: AddProjectRequest) =>
  request({
    url: '/api/v1/project',
    method: 'post',
    data: addProjectRequest,
  });

export const useUpdateProject = () =>
  useMutation({
    mutationFn: updateProject,
  });

const updateProject = (addProjectRequest: AddProjectRequest) => {
  const { title, ...updateRequest } = addProjectRequest;

  return request({
    url: `/api/v1/project/${title}`,
    method: 'put',
    data: updateRequest,
  });
};
