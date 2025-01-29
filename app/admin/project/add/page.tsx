'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  IconCalendar,
  IconDoorExit,
  IconPencilPlus,
  IconPhotoScan,
  IconUpload,
  IconUser,
} from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  FileInput,
  Flex,
  Group,
  LoadingOverlay,
  MultiSelect,
  MultiSelectProps,
  rem,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { DatePickerInput, DatesProvider } from '@mantine/dates';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { isNotEmpty, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { WriteEditor } from '@/components/CustomEditor/WriterEditor';
import { ImageHolder } from '@/components/ImageHolder/ImageHolder';
import { useRefetchCallback } from '@/hooks/fetch/fetchHooks';
import {
  ImageUploadResponse,
  useImageDelete,
  useImageListUpload,
  useThumbnailImageUpload,
} from '@/hooks/image/imageHooks';
import { useNotification } from '@/hooks/notification/notificationHooks';
import { AddProjectRequest, useAddProject } from '@/hooks/project/projectHooks';
import { useSkills } from '@/hooks/skill/skillHooks';
import { findSkillsByExactNames, formatDate, getSeoulTime } from '@/utils/common/common';
import classes from '../project.module.css';

export default function Page() {
  const [date, setDate] = useState<[Date | null, Date | null]>([getSeoulTime(), getSeoulTime()]);
  const [number, setNumber] = useState<string | null>('1');
  const [content, setContent] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    mutate: addProject,
    data: addProjectData,
    error: addProjectError,
    isPending: addProjectPending,
  } = useAddProject();

  const { data: skills, error: skillError } = useSkills('ALL');

  useNotification({
    status: skillError,
    title: '스킬 불러오기 실패',
    description: 'API서버를 확인하세요.',
    color: 'red',
  });

  useNotification({
    status: addProjectError,
    title: '프로젝트 추가 실패',
    description: 'API서버를 확인하세요.',
    color: 'red',
  });

  useRefetchCallback(addProjectData, () => {
    notifications.show({
      title: '프로젝트 추가',
      message: '프로젝트를 추가했습니다.',
      color: 'blue',
    });
    queryClient.invalidateQueries({ queryKey: ['projects'] });
    router.push('/admin/project');
  });

  const handleAdd = (addProjectRequest: AddProjectRequest) => {
    addProject(addProjectRequest);
  };

  const handleAddError = (errors: typeof form.errors) => {
    if (errors) {
      notifications.show({
        title: '프로젝트 추가 실패',
        message: '입력된 정보를 다시 확인해주세요.',
        color: 'red',
      });
    }
  };

  const renderMultiSelectionOption: MultiSelectProps['renderOption'] = ({ option }) => (
    <Group gap="sm" align="center">
      <Avatar
        src={skills?.find((skill) => skill.name === option.value).path}
        size={25}
        radius="xl"
      />
      <Text size="sm">{option.value}</Text>
    </Group>
  );

  const { thumbnailImageLoading, thumbnailImageUpload } =
    useThumbnailImageUpload<ImageUploadResponse>(
      (data) => {
        // if (form.getValues().thumbnail !== '') {
        //   imageDelete(getOriginalFileName(form.getValues().thumbnail));
        // }

        form.setValues({
          thumbnail: data.url,
        });
      },
      () => {
        notifications.show({
          title: '썸네일 업로드 실패',
          message: 'API서버를 확인하세요.',
          color: 'red',
        });
      }
    );

  const { imageListLoading, imageListUpload } = useImageListUpload<ImageUploadResponse>(
    (data, files) => {
      setImages(files);
      // if (form.getValues().images.length > 0) {
      //   form.getValues().images.forEach((image) => imageDelete(getOriginalFileName(image)));
      // }

      form.setValues({
        images: data.map((value) => value.url),
      });
    },
    () => {
      notifications.show({
        title: '이미지 파일 리스트 업로드 실패',
        message: 'API서버를 확인하세요.',
        color: 'red',
      });
    }
  );

  const { imageDeleteLoading, imageDelete } = useImageDelete(
    () => {},
    () => {
      notifications.show({
        title: '이미지 삭제',
        message: '이미지 삭제에 실패했습니다.',
        color: 'red',
      });
    }
  );

  useEffect(() => {
    if (date[0] && date[1]) {
      form.setValues({
        startDate: formatDate(date[0]),
        endDate: formatDate(date[1]),
      });
    }
  }, [date]);

  useEffect(() => {
    form.setValues({
      member: Number(number),
    });
  }, [number]);

  useEffect(() => {
    form.setValues({
      description: content.replace(/<p>\s*<\/p>/g, '<br>'),
    });
  }, [content]);

  const ImageValueComponent = ({ value }: { value: File[] }) => (
    <Text truncate>{value.length > 0 ? `${value.length} files selected` : ''}</Text>
  );

  const handleFileChange = (newFiles: File[] | null) => {
    if (newFiles && newFiles.length > 0) {
      imageListUpload(newFiles);
    }
  };

  const form = useForm<AddProjectRequest>({
    mode: 'controlled',
    initialValues: {
      title: '',
      member: 1,
      summary: '',
      description: '',
      startDate: '',
      endDate: '',
      thumbnail: '',
      images: [],
      skills: [],
    },
    validate: {
      title: isNotEmpty('제목을 입력하세요.'),
      summary: isNotEmpty('요약을 입력하세요.'),
      description: isNotEmpty('상세 내용을 입력하세요.'),
      startDate: isNotEmpty('날짜를 입력하세요.'),
      endDate: isNotEmpty('날짜를 입력하세요.'),
      thumbnail: isNotEmpty('썸네일 업로드하세요.'),
      images: isNotEmpty('이미지 업로드하세요.'),
      skills: isNotEmpty('스킬을 선택하세요.'),
    },
  });

  return (
    <Box>
      <Stack pos="relative" align="stretch" maw={{ base: '100%', xl: 1100 }} mx="auto" mt="lg">
        <form onSubmit={form.onSubmit(handleAdd, handleAddError)}>
          <LoadingOverlay
            visible={imageDeleteLoading || imageListLoading}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
          />
          <Group justify="end" mb="sm" align="center" gap="sm">
            <Button
              leftSection={<IconPencilPlus size={18} />}
              variant="outline"
              type="submit"
              loading={addProjectPending}
            >
              프로젝트 추가
            </Button>
            <Button
              variant="outline"
              leftSection={<IconDoorExit size={18} />}
              onClick={() => {
                router.push('/admin/project');
              }}
            >
              뒤로가기
            </Button>
          </Group>
          <Box>
            <Flex
              direction={{
                base: 'column',
                md: 'row',
              }}
              gap={{
                base: 'xs',
                md: 'xl',
              }}
            >
              <Box flex={1}>
                <TextInput
                  data-autofocus
                  withAsterisk
                  label="Title"
                  placeholder="제목을 입력하세요."
                  key={form.key('title')}
                  {...form.getInputProps('title')}
                />
                <DatesProvider
                  settings={{
                    locale: 'ko',
                    firstDayOfWeek: 0,
                    weekendDays: [0],
                    timezone: 'Asia/Seoul',
                  }}
                >
                  <DatePickerInput
                    mt="md"
                    maxDate={new Date()}
                    allowSingleDateInRange
                    leftSection={
                      <IconCalendar
                        style={{ width: rem(25), height: rem(25) }}
                        stroke={1.5}
                        color="var(--mantine-color-blue-6)"
                      />
                    }
                    valueFormat="YYYY-MM-DD"
                    type="range"
                    label="조회 기간"
                    placeholder="기간을 선택하세요."
                    value={date}
                    onChange={setDate}
                    error={form.errors.startDate || form.errors.endDate}
                  />
                </DatesProvider>
              </Box>
              <Box flex={1}>
                <MultiSelect
                  classNames={{ pill: classes.pill }}
                  withAsterisk
                  renderOption={renderMultiSelectionOption}
                  label="Skill"
                  hidePickedOptions
                  onChange={(event) => {
                    form.setValues({
                      skills: findSkillsByExactNames(skills, event),
                    });
                  }}
                  error={form.errors.skills}
                  data={skills?.map((skill) => skill.name) || []}
                />
                <Select
                  mt="md"
                  allowDeselect={false}
                  leftSection={<IconUser />}
                  checkIconPosition="right"
                  label="Member"
                  withAsterisk
                  data={['1', '2', '3', '4', '5']}
                  value={number}
                  onChange={setNumber}
                  error={form.errors.member}
                />
              </Box>
            </Flex>
            <Textarea
              mt="md"
              label="Summary"
              withAsterisk
              placeholder="요약을 입력하세요."
              key={form.key('summary')}
              {...form.getInputProps('summary')}
              autosize
              minRows={4}
              maxRows={4}
            />
            <Box mt="md">
              <Group align="center" gap="xs">
                <Text size="sm">Description</Text>
                {form.errors.description ? (
                  <Text size="xs" c="red">
                    ({form.errors.description})
                  </Text>
                ) : undefined}
              </Group>
              <WriteEditor initialData={content} onChange={setContent} />
            </Box>
            <Flex
              direction={{
                base: 'column',
                md: 'row',
              }}
              gap={{
                base: 'xs',
                md: 'xl',
              }}
            >
              <Box mt="md" flex={1}>
                <Group align="center" mb="xs" gap="xs">
                  <Text size="sm">Thumbnail</Text>
                  {form.errors.thumbnail ? (
                    <Text size="xs" c="red">
                      ({form.errors.thumbnail})
                    </Text>
                  ) : undefined}
                </Group>
                <Box mb="xs">
                  <ImageHolder
                    radius="sm"
                    height="auto"
                    width="100%"
                    src={form.getValues().thumbnail}
                  />
                </Box>
                <Dropzone
                  onDrop={(dropFiles) => {
                    thumbnailImageUpload(dropFiles[0]);
                  }}
                  loading={thumbnailImageLoading}
                  accept={IMAGE_MIME_TYPE}
                  maxSize={30 * 1024 ** 2}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ActionIcon
                    size={50}
                    radius="md"
                    aria-label="upload image"
                    variant="transparent"
                    color="blue"
                    style={{ pointerEvents: 'all' }}
                  >
                    <Tooltip position="bottom" offset={10} label="썸네일 업로드">
                      <IconUpload style={{ width: '60%', height: '60%' }} stroke={2} />
                    </Tooltip>
                  </ActionIcon>
                </Dropzone>
              </Box>
              <FileInput
                flex={1}
                mt="md"
                multiple
                leftSection={<IconPhotoScan />}
                label="Images"
                withAsterisk
                placeholder="이미지 파일을 업로드하세요."
                value={images}
                onChange={handleFileChange}
                error={form.errors.images}
                valueComponent={ImageValueComponent}
              />
            </Flex>
          </Box>
        </form>
      </Stack>
    </Box>
  );
}
