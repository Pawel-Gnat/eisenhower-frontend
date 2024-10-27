import { useContext, useRef } from 'react';

import { ModalContext } from '@/context/modal-context';

import { EditTaskForm, EditTaskFormRef } from './edit-task-form';

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
  const { modalState, title, description, taskId, action, dispatch } =
    useContext(ModalContext);
  const editTaskFormRef = useRef<EditTaskFormRef>(null);

  const handleAction = () => {
    if (action) action();
    if (taskId && editTaskFormRef.current) editTaskFormRef.current.submitForm();
    // TODO: Fix handling error in edit task form, modal close even if error
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return (
    <AlertDialog open={Boolean(modalState)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {taskId && <EditTaskForm taskId={taskId} ref={editTaskFormRef} />}
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => handleAction()}>
            {taskId ? 'Edit' : 'Continue'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
