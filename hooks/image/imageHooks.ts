import { useState } from 'react';
import { FileWithPath } from '@mantine/dropzone';
import { request } from '@/utils/axios/axios';

export type ImageUploadResponse = {
  url: string;
  originalFileName: string;
};

export const useImageListUpload = <T>(
  successCallback: (data: T[], files: File[]) => void,
  failCallback: () => void
) => {
  const [loading, setLoading] = useState(false);

  const uploadSingleImage = async (file: File | FileWithPath) => {
    const formData = new FormData();
    formData.append('uploadFiles', file);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/image`, {
      method: 'POST',
      headers: {
        Authorization: process.env.NEXT_PUBLIC_AUTHENTICATION_TOKEN,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    return response.json();
  };

  const imageListUpload = async (uploadFiles: FileWithPath[] | File[]) => {
    setLoading(true);
    const results: T[] = [];

    try {
      for (const file of uploadFiles) {
        const data = await uploadSingleImage(file);
        results.push(data[0]);
      }
      successCallback(results, uploadFiles);
    } catch (error) {
      failCallback();
    } finally {
      setLoading(false);
    }
  };

  return {
    imageListLoading: loading,
    imageListUpload,
  };
};

export const useThumbnailImageUpload = <T>(
  successCallback: (data: T) => void,
  failCallback: () => void
) => {
  const [loading, setLoading] = useState(false);

  const thumbnailImageUpload = async (uploadFiles: FileWithPath) => {
    const formData = new FormData();
    formData.append('uploadFile', uploadFiles);
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/image/thumbnail`, {
        method: 'POST',
        headers: {
          Authorization: process.env.NEXT_PUBLIC_AUTHENTICATION_TOKEN,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        successCallback(data);
        return;
      }
      failCallback();
    } catch (error) {
      failCallback();
    } finally {
      setLoading(false);
    }
  };

  return {
    thumbnailImageLoading: loading,
    thumbnailImageUpload,
  };
};

export const useImageDelete = (successCallback?: () => void, failCallback?: () => void) => {
  const [loading, setLoading] = useState(false);

  const imageDelete = (originalFileName: string) => {
    setLoading(true);
    request({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/image/${originalFileName}`,
      headers: {
        Authorization: process.env.NEXT_PUBLIC_AUTHENTICATION_TOKEN,
      },
      method: 'delete',
    })
      .then(() => successCallback?.())
      .catch(() => failCallback?.())
      .finally(() => setLoading(false));
  };

  return {
    imageDeleteLoading: loading,
    imageDelete,
  };
};
