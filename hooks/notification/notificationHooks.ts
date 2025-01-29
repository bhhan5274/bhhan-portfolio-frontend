import { useEffect } from 'react';
import { notifications } from '@mantine/notifications';

export function useNotification({
  status,
  title,
  description,
  color,
}: {
  status: any;
  title: string;
  description: string;
  color: string;
}) {
  useEffect(() => {
    if (status) {
      notifications.show({
        title,
        message: description,
        color,
      });
    }
  }, [status]);
}
