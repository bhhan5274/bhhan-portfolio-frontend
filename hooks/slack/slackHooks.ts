import { useMutation } from '@tanstack/react-query';
import { request } from '@/utils/axios/axios';

export type SlackRequest = {
  tel: string;
  email: string;
  description: string;
};

export const useSendSlackRequest = () =>
  useMutation({
    mutationFn: sendSlackRequest,
  });

const sendSlackRequest = (slackRequest: SlackRequest) =>
  request({
    url: '/api/v1/slack',
    method: 'post',
    data: slackRequest,
  });
