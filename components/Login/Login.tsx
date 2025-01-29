'use client';

import { Button, Paper, PasswordInput, TextInput, useMantineTheme } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { Logo } from '@/components/Logo/Logo';
import { id, pw } from '@/constants/constants';
import classes from './Login.module.css';

type Props = {
  successCallback: () => void;
};
export function Login({ successCallback }: Props) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { id: '', password: '' },
    validate: {
      id: isNotEmpty('아이디를 입력하세요.'),
      password: isNotEmpty('패스워드를 입력하세요.'),
    },
  });

  return (
    <Paper className={classes.form} radius={0} p={30} miw={isMobile ? '100%' : 450}>
      <Logo />
      <form
        onSubmit={form.onSubmit((values) => {
          if (id === values.id && pw === values.password) {
            successCallback();
            return;
          }
          notifications.show({
            title: '로그인 실패',
            message: '아이디와 패스워드를 확인하세요.',
            color: 'red',
          });
        })}
      >
        <TextInput
          data-autofocus
          label="아이디"
          placeholder="ID"
          key={form.key('id')}
          {...form.getInputProps('id')}
        />
        <PasswordInput
          mt="sm"
          label="패스워드"
          placeholder="PASSWORD"
          key={form.key('password')}
          {...form.getInputProps('password')}
        />
        <Button fullWidth mt="xl" type="submit" size="md">
          로그인
        </Button>
      </form>
    </Paper>
  );
}
