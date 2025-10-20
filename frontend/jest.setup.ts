import '@testing-library/jest-dom';
import React from 'react';
import { TextEncoder, TextDecoder } from 'util';

// @ts-ignore
global.TextEncoder = TextEncoder;
// @ts-ignore
global.TextDecoder = TextDecoder as unknown as typeof global.TextDecoder;

jest.mock('next/link', () => {
  return ({ children, href, ...rest }: any) =>
    React.createElement(
      'a',
      { href: typeof href === 'string' ? href : '#', ...rest },
      children
    );
});

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) =>
    React.createElement('img', { ...props, alt: props.alt || '' }),
}));

jest.mock('next/navigation', () => {
  const actual = jest.requireActual('next/navigation');
  return {
    ...actual,
    useRouter: () => ({ replace: jest.fn(), push: jest.fn() }),
    usePathname: () => '/',
    useSearchParams: () => new URLSearchParams(),
  };
});
