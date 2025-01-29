'use client';

import * as React from 'react';
import { IconPencilPlus, IconUpload } from '@tabler/icons-react';
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Modal,
  NativeSelect,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { ImageHolder } from '@/components/ImageHolder/ImageHolder';
import { useRefetchCallback } from '@/hooks/fetch/fetchHooks';
import { ImageUploadResponse, useImageDelete, useImageListUpload } from '@/hooks/image/imageHooks';
import { useNotification } from '@/hooks/notification/notificationHooks';
import { Skill, useAddSkill } from '@/hooks/skill/skillHooks';
import { getOriginalFileName } from '@/utils/common/common';

type Props = {
  successCallback: () => void;
};

export function AddSkillButton({ successCallback }: Props) {
  const [addModalOpened, { open: addModalOpen, close: addModalClose }] = useDisclosure(false);
  const {
    mutate: addSkill,
    data: addSkillData,
    error: addSkillError,
    isPending: addPending,
  } = useAddSkill();
  const { imageDelete } = useImageDelete(
    () => {},
    () => {
      notifications.show({
        title: '이미지 추가',
        message: '이미지 추가에 실패했습니다.',
        color: 'red',
      });
    }
  );

  useRefetchCallback(addSkillData, () => {
    notifications.show({
      title: '스킬 추가',
      message: '스킬을 추가했습니다.',
      color: 'blue',
    });
    addModalClose();
    successCallback();
  });

  useNotification({
    status: addSkillError,
    title: '이미지 추가 실패',
    description: 'API서버를 확인하세요.',
    color: 'red',
  });

  const { imageListLoading, imageListUpload } = useImageListUpload<ImageUploadResponse>(
    (data) => {
      if (form.getValues().path !== '') {
        imageDelete(getOriginalFileName(form.getValues().path));
      }
      form.setValues({
        path: data[0].url,
      });
    },
    () => {
      notifications.show({
        title: '파일 업로드 실패',
        message: 'API서버를 확인하세요.',
        color: 'red',
      });
    }
  );

  const form = useForm<Skill>({
    mode: 'uncontrolled',
    initialValues: {
      pk: '',
      sk: '',
      name: '',
      description: '',
      type: 'BACKEND',
      path: '',
    },
    validate: {
      name: isNotEmpty('이름을 입력하세요.'),
      description: isNotEmpty('상세 내용을 입력하세요.'),
      path: isNotEmpty('이미지를 업로드 하세요.'),
    },
  });

  const handleAdd = (skill: Skill) => {
    addSkill({
      name: skill.name,
      path: skill.path,
      description: skill.description,
      type: skill.type,
    });
  };

  const handleAddError = (errors: typeof form.errors) => {
    if (errors) {
      notifications.show({
        title: '스킬 추가 실패',
        message: '입력된 정보를 다시 확인해주세요.',
        color: 'red',
      });
    }
  };

  return (
    <Box>
      <Button
        leftSection={<IconPencilPlus size={18} />}
        variant="outline"
        onClick={() => {
          form.reset();
          addModalOpen();
        }}
      >
        스킬 추가
      </Button>
      <Modal
        opened={addModalOpened}
        onClose={() => {
          addModalClose();
          form.reset();
        }}
        title="스킬 추가"
      >
        <form onSubmit={form.onSubmit(handleAdd, handleAddError)}>
          <TextInput
            data-autofocus
            withAsterisk
            label="Name"
            placeholder="이름"
            key={form.key('name')}
            {...form.getInputProps('name')}
          />
          <Box mt="sm">
            <Group align="center" mb="xs" gap="xs">
              <Text size="sm">Image</Text>
              {form.errors.path ? (
                <Text size="xs" c="red">
                  ({form.errors.path})
                </Text>
              ) : undefined}
            </Group>
            <Group>
              <Box>
                <Dropzone
                  onDrop={(dropFiles) => {
                    imageListUpload([dropFiles[0]]);
                  }}
                  loading={imageListLoading}
                  accept={IMAGE_MIME_TYPE}
                  maxSize={30 * 1024 ** 2}
                >
                  <ActionIcon
                    size={50}
                    radius="md"
                    aria-label="upload image"
                    variant="transparent"
                    color="blue"
                    style={{ pointerEvents: 'all' }}
                  >
                    <Tooltip position="bottom" offset={10} label="이미지 업로드">
                      <IconUpload style={{ width: '60%', height: '60%' }} stroke={2} />
                    </Tooltip>
                  </ActionIcon>
                </Dropzone>
              </Box>
              <Box>
                <ImageHolder radius="sm" height={84} width={84} src={form.getValues().path} />
              </Box>
            </Group>
          </Box>
          <TextInput
            mt="sm"
            withAsterisk
            label="Description"
            placeholder="상세 내용"
            key={form.key('description')}
            {...form.getInputProps('description')}
          />
          <NativeSelect
            mt="sm"
            label="Type"
            description="select type"
            value={form.getValues().type}
            onChange={(event) => {
              form.setValues({
                type: event.currentTarget.value,
              });
            }}
            data={[
              { label: 'BACKEND', value: 'BACKEND' },
              { label: 'DEVOPS', value: 'DEVOPS' },
              { label: 'FRONTEND', value: 'FRONTEND' },
              { label: 'APP', value: 'APP' },
            ]}
          />
          <Button fullWidth mt="xl" type="submit" loading={addPending}>
            확인
          </Button>
        </form>
      </Modal>
    </Box>
  );
}
