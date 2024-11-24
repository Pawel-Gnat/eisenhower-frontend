import { useContext, useRef } from 'react';

import { ModalContext } from '@/context/modal-context';
import { TaskContext } from '@/context/task-context';
import { AuthContext } from '@/context/auth-context';

import { EditTaskForm, EditTaskFormRef } from './edit-task-form';
import { AuthForm, AuthFormRef } from './auth-form';

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
import { LoadingSpinner } from './ui/loading-spinner';

export const Modal = () => {
  const { modalState, title, description, taskId, action, dispatch } =
    useContext(ModalContext);
  const { isLoading: isAuthLoading } = useContext(AuthContext);
  const { isLoading: isTaskLoading } = useContext(TaskContext);
  const editTaskFormRef = useRef<EditTaskFormRef>(null);
  const authFormRef = useRef<AuthFormRef>(null);

  const handleAction = () => {
    if (action) action();
    if (taskId && editTaskFormRef.current) editTaskFormRef.current.submitForm();
    if (modalState === 'login' && authFormRef.current) authFormRef.current.loginForm();
    if (modalState === 'register' && authFormRef.current)
      authFormRef.current.registerForm();
  };

  return (
    <AlertDialog open={Boolean(modalState)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {taskId && <EditTaskForm taskId={taskId} ref={editTaskFormRef} />}
        {(modalState === 'login' || modalState === 'register') && (
          <AuthForm ref={authFormRef} />
        )}
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="min-w-28"
            onClick={handleAction}
            disabled={isAuthLoading || isTaskLoading}
          >
            {isAuthLoading || isTaskLoading ? (
              <LoadingSpinner />
            ) : (
              <>{taskId ? 'Edit' : 'Continue'}</>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
