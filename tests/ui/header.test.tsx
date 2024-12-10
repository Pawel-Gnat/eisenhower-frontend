import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { AuthContext } from '@/context/auth-context';
import { ModalContext } from '@/context/modal-context';

import { Header } from '../../src/components/header';

describe('Header component', () => {
  it('should render heading', () => {
    render(<Header />);

    const heading = screen.getByRole('heading', { name: 'Eisenhower Matrix' });
    expect(heading).toBeInTheDocument();
  });

  it('should render the header with "Login" button when user is not logged in', () => {
    const mockDispatch = vi.fn();
    const mockHandleLogout = vi.fn();

    render(
      <AuthContext.Provider
        value={{
          isLoading: false,
          isUserLoggedIn: false,
          handleLogout: mockHandleLogout,
          handleLogin: vi.fn(),
        }}
      >
        <ModalContext.Provider
          value={{
            dispatch: mockDispatch,
            modalState: '',
            title: '',
            description: '',
            taskId: undefined,
            action: vi.fn(),
          }}
        >
          <Header />
        </ModalContext.Provider>
      </AuthContext.Provider>,
    );

    const button = screen.getByRole('button', { name: 'Login' });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'LOGIN' });
    expect(mockHandleLogout).not.toHaveBeenCalled();
  });

  it('should render the header with "Logout" button when user is not logged in', () => {
    const mockDispatch = vi.fn();
    const mockHandleLogout = vi.fn();

    render(
      <AuthContext.Provider
        value={{
          isLoading: false,
          isUserLoggedIn: true,
          handleLogout: mockHandleLogout,
          handleLogin: vi.fn(),
        }}
      >
        <ModalContext.Provider
          value={{
            dispatch: mockDispatch,
            modalState: '',
            title: '',
            description: '',
            taskId: undefined,
            action: vi.fn(),
          }}
        >
          <Header />
        </ModalContext.Provider>
      </AuthContext.Provider>,
    );

    const button = screen.getByRole('button', { name: 'Logout' });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockDispatch).not.toHaveBeenCalledWith({ type: 'LOGIN' });
    expect(mockHandleLogout).toHaveBeenCalled();
  });
});
