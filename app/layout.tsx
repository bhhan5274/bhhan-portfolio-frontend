'use client';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/dates/styles.css';
import '@/theme/global.css';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Box, Burger, Drawer, Flex, Group, Modal, Text, UnstyledButton } from '@mantine/core';
import { useDisclosure, useHotkeys } from '@mantine/hooks';
import { ModalsProvider } from '@mantine/modals';
import { notifications, Notifications } from '@mantine/notifications';
import { AuthenticateProvider } from '@/auth/AuthenticateProvider';
import { Login } from '@/components/Login/Login';
import { Logo } from '@/components/Logo/Logo';
import { getMenus } from '@/constants/constants';
import { useAuthenticate } from '@/hooks/auth/authHooks';
import ThemeProvider from '@/theme/ThemeProvider';
import classes from './layout.module.css';
import { SlackIcon } from '@/components/SlackIcon/SlackIcon';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 30,
      retry: 1,
      retryDelay: 1000 * 2,
    },
  },
});

export default function RootLayout({ children }: { children: any }) {
  const router = useRouter();
  const pathName = usePathname();
  const [opened, { open, close }] = useDisclosure();
  const [menu, setMenu] = useState<string[]>([]);

  const [showModal, setShowModal] = useState<boolean>(false);
  useHotkeys([['mod+shift+H', () => setShowModal(true)]]);

  const { authenticate, setLogin, login } = useAuthenticate();

  const menus = getMenus(authenticate !== 'success' ? 'GUEST' : 'ADMIN');

  useEffect(() => {
    setMenu(
      pathName
        .replace(/\/$/, '')
        .split('/')
        .map((path) => path.toUpperCase())
    );
  }, [pathName]);

  const items = [
    ...menus.map((item) =>
      item.internal ? (
        <UnstyledButton
          key={item.name}
          className={classes.control}
          onClick={(event) => {
            event.preventDefault();
            setMenu([item.name]);
            close();
            router.push(item.path);
          }}
          data-selected={menu.includes(item.name)}
        >
          <Text>{item.name}</Text>
        </UnstyledButton>
      ) : (
        <UnstyledButton
          key={item.name}
          className={classes.control}
          onClick={(event) => {
            event.preventDefault();
            close();
            window.open(item.path, '_blank', 'noopener,noreferrer');
          }}
        >
          <Text>{item.name}</Text>
        </UnstyledButton>
      )
    ),
    authenticate === 'success' ? (
      <UnstyledButton
        key="logout"
        className={classes.control}
        onClick={(event) => {
          event.preventDefault();
          close();
          setLogin(false);
          setMenu([]);
          router.push('/');
          notifications.show({
            title: '로그아웃',
            message: '폴트폴리오를 로그아웃 했습니다.',
            color: 'blue',
          });
        }}
      >
        <Text>LOGOUT</Text>
      </UnstyledButton>
    ) : undefined,
  ];

  return (
    <html lang="ko">
      <head>
        <link rel="shortcut icon" href="/favicon.png" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <title>Bhhan | Portfolio</title>
      </head>
      <body>
        <ThemeProvider>
          <AuthenticateProvider login={login} pathName={pathName}>
            <ModalsProvider>
              <QueryClientProvider client={queryClient}>
                <Notifications
                  position="bottom-right"
                  zIndex={1000}
                  limit={5}
                  containerWidth={300}
                />
                <Modal
                  opened={showModal}
                  onClose={() => setShowModal(false)}
                  title={<Text fw={700}>로그인</Text>}
                  withinPortal
                  size="auto"
                >
                  <Login
                    successCallback={() => {
                      setShowModal(false);
                      setLogin(true);
                      notifications.show({
                        title: '로그인 성공',
                        message: '폴트폴리오에 로그인 했습니다.',
                        color: 'blue',
                      });
                      router.push('/');
                    }}
                  />
                </Modal>
                <Box className={classes.container}>
                  <Box className={classes.header}>
                    <Burger
                      opened={opened}
                      onClick={open}
                      hiddenFrom="sm"
                      size="sm"
                      lineSize={2}
                      mr="auto"
                    />
                    <Logo
                      route={() => {
                        close();
                        router.push('/');
                        setMenu([]);
                      }}
                    />
                    <Group ml="xl" gap={0} visibleFrom="sm">
                      {items}
                    </Group>
                  </Box>
                  <Drawer
                    size="xs"
                    opened={opened}
                    onClose={close}
                    title={
                      <Group>
                        <Logo
                          route={() => {
                            close();
                            setMenu([]);
                            router.push('/');
                          }}
                        />
                      </Group>
                    }
                  >
                    {items}
                  </Drawer>
                  <Box className={classes.main}>{children}</Box>
                  {authenticate === 'success' ? undefined : (
                    <Box className={classes.wrapper}>
                      <Box className={classes.footer}>
                        <Box>
                          <Flex align="center">
                            <Text fw={500} size="sm">
                              Bhhan
                            </Text>
                            <Text mx="sm" size="sm" c="dimmed">
                              이메일
                            </Text>
                            <Group gap="xs">
                              <Text fw={500} size="sm">
                                hbh5274@gmail.com
                              </Text>
                              <SlackIcon />
                            </Group>
                          </Flex>
                          <Text size="sm" mt="sm" c="dimmed" visibleFrom="sm">
                            본 사이트는 Chrome, Edge, Whale 등 최신 브라우저에 최적화되어 있습니다.
                          </Text>
                          <Text size="sm" c="dimmed">
                            Copyright © Bhhan. All Rights Reserved.
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Box>
              </QueryClientProvider>
            </ModalsProvider>
          </AuthenticateProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
