import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { vi, test, expect } from 'vitest';
import LoginPage from './LoginPage';

function renderLogin(mockHandleSignUpOrLogin = vi.fn()) {
  render(
    <MemoryRouter>
      <LoginPage handleSignUpOrLogin={mockHandleSignUpOrLogin} />
    </MemoryRouter>
  );
  return mockHandleSignUpOrLogin;
}

test('good user logs in successfully', async () => {
  const mockHandleSignUpOrLogin = renderLogin();
  const user = userEvent.setup();

  await user.type(screen.getByPlaceholderText(/email/i), 'good@user.com');
  await user.type(screen.getByPlaceholderText(/password/i), 'correctpass');
  await user.click(screen.getByRole('button', { name: /login/i }));

  await waitFor(() => {
    expect(mockHandleSignUpOrLogin).toHaveBeenCalled();
  });
});

test('bad user sees an error', async () => {
  const mockHandleSignUpOrLogin = renderLogin();
  const user = userEvent.setup();

  await user.type(screen.getByPlaceholderText(/email/i), 'bad@user.com');
  await user.type(screen.getByPlaceholderText(/password/i), 'wrongpass');
  await user.click(screen.getByRole('button', { name: /login/i }));

  await waitFor(() => {
    expect(screen.getByText(/check terminal and console/i)).toBeInTheDocument();
  });

  expect(mockHandleSignUpOrLogin).not.toHaveBeenCalled();
});