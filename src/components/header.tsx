import { useContext } from 'react';

import { ModalContext } from '@/context/modal-context';
import { AppContext } from '@/context/app-context';

import { HeadingH1 } from './typography';
import { Button } from './ui/button';

export const Header = () => {
  const { dispatch } = useContext(ModalContext);
  const { isAuthenticated, handleLogout } = useContext(AppContext);

  const handleAuth = () => {
    if (isAuthenticated) {
      handleLogout();
      return;
    }

    dispatch({
      type: 'LOGIN',
    });
  };

  return (
    <header className="flex flex-row items-center justify-between gap-4">
      <HeadingH1 text="Eisenhower Matrix" />
      <Button onClick={handleAuth}>{isAuthenticated ? 'Logout' : 'Login'}</Button>
    </header>
  );
};
