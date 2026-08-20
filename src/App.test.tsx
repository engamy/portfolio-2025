import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// App calls useLocation, so it has to be rendered inside a router.
const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );

test('renders the home page with its case study cards', () => {
  renderAt('/');

  expect(
    screen.getByRole('heading', { name: /case studies/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', {
      name: /designing the trend shop for marshalls\.com/i,
    })
  ).toBeInTheDocument();
});

test('renders the design page', () => {
  renderAt('/design');

  expect(
    screen.getByRole('heading', { name: /^case studies$/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: /^collections$/i })
  ).toBeInTheDocument();
});

test('renders the code page', () => {
  renderAt('/code');

  expect(
    screen.getByRole('heading', { name: /^projects$/i })
  ).toBeInTheDocument();
});

test('renders the art page', () => {
  renderAt('/art');

  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
});

test('renders the about page', () => {
  renderAt('/about');

  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
});
