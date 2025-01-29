'use client';

import * as React from 'react';
import {
  ActionIcon,
  Button,
  Dialog,
  Group,
  LoadingOverlay,
  rem,
  Stack,
  Text,
  Textarea,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { IconBrandSlack } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { isNotEmpty, useForm, isEmail } from '@mantine/form';
import { SlackRequest, useSendSlackRequest } from '@/hooks/slack/slackHooks';
import { notifications } from '@mantine/notifications';
import { useNotification } from '@/hooks/notification/notificationHooks';
import { useEffect } from 'react';

export function SlackIcon() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const form = useForm<SlackRequest>({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      tel: '',
      description: '',
    },

    validate: {
      email: isEmail('Invalid Email'),
      tel: (value) => {
        if (value === '') return null;
        const phoneRegex = /^010-[0-9]{3,4}-[0-9]{4}$/;
        return phoneRegex.test(value) ? null : 'Invalid phone number (010-xxxx-xxxx)';
      },
      description: isNotEmpty('Description is not empty'),
    },
  });
  const {
    mutate: sendSlackRequest,
    isSuccess,
    error: sendSlackRequestError,
    isPending: sendSlackRequestPending,
  } = useSendSlackRequest();

  useEffect(() => {
    if (isSuccess) {
      notifications.show({
        title: '슬랙 메시지 전송',
        message: '메세지를 전송했습니다.',
        color: 'blue',
      });
      close();
      form.reset();
    }
  }, [isSuccess]);

  useNotification({
    status: sendSlackRequestError,
    title: '슬랙 메시지 전송 실패',
    description: 'API서버를 확인하세요.',
    color: 'red',
  });

  const handleAdd = (slackRequest: SlackRequest) => {
    sendSlackRequest(slackRequest);
  };

  const handleAddError = (errors: typeof form.errors) => {
    if (errors) {
      notifications.show({
        title: '슬랙 메시지 전송 실패',
        message: '입력된 정보를 다시 확인해주세요.',
        color: 'red',
      });
    }
  };

  return (
    <>
      <Tooltip label="Send Slack Message">
        <ActionIcon size="md" variant="transparent" aria-label="Open Slack Modal" onClick={toggle}>
          <IconBrandSlack style={{ width: rem(50), height: rem(50) }} stroke={1.3} />
        </ActionIcon>
      </Tooltip>
      <Dialog
        opened={opened}
        withCloseButton
        onClose={() => {
          close();
          form.reset();
        }}
        size="md"
        radius="md"
      >
        <LoadingOverlay
          visible={sendSlackRequestPending}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />
        <Text size="sm" mb="xs" fw={500}>
          Send Slack Message
        </Text>

        <Stack>
          <form onSubmit={form.onSubmit(handleAdd, handleAddError)}>
            <TextInput
              mt="xs"
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              key={form.key('email')}
              {...form.getInputProps('email')}
            />
            <TextInput
              mt="xs"
              label="Tel"
              placeholder="010-1234-5678"
              key={form.key('tel')}
              {...form.getInputProps('tel')}
            />
            <Textarea
              mt="xs"
              label="Description"
              withAsterisk
              placeholder="내용을 입력하세요."
              key={form.key('description')}
              {...form.getInputProps('description')}
              autosize
              minRows={4}
              maxRows={4}
            />

            <Group justify="flex-end" mt="md">
              <Button type="submit" fullWidth>
                Submit
              </Button>
            </Group>
          </form>
        </Stack>
      </Dialog>
    </>
  );
}
