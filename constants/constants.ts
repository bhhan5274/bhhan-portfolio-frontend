export type MenuItem = {
  name: string;
  path: string;
  internal: boolean;
};

export type Mode = 'GUEST' | 'ADMIN';

const guestMenus: MenuItem[] = [
  {
    name: 'ABOUT',
    path: '/guest/about',
    internal: true,
  },
  {
    name: 'PROJECT',
    path: '/guest/project',
    internal: true,
  },
  {
    name: 'GITHUB',
    path: 'https://github.com/bhhan5274',
    internal: false,
  },
];

const adminMenus: MenuItem[] = [
  {
    name: 'SKILL',
    path: '/admin/skill',
    internal: true,
  },
  {
    name: 'PROJECT',
    path: '/admin/project',
    internal: true,
  },
];

export function getMenus(mode: Mode): MenuItem[] {
  if (mode === 'GUEST') {
    return guestMenus;
  }

  return adminMenus;
}

export const id = process.env.NEXT_PUBLIC_USER_NAME;
export const pw = process.env.NEXT_PUBLIC_PASSWORD;
