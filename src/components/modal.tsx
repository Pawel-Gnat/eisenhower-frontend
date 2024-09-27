import { useContext } from 'react';

import { ModalContext } from '@/context/modal-context';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from './ui/alert-dialog';

export const Modal = () => {
  const { isModalOpen, title, description, action, dispatch } = useContext(ModalContext);

  const handleAction = () => {
    action();
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return (
    <AlertDialog open={isModalOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => handleAction()}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
