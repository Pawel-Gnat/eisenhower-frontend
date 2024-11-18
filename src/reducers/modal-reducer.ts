import { ModalState } from '@/types';

export type Action =
  | {
      type: 'EDIT_TASK';
      payload: {
        taskName: string;
        taskId: string;
      };
    }
  | {
      type: 'DELETE_TASK';
      payload: {
        taskName: string;
        action: () => void;
      };
    }
  | {
      type: 'RESET_TASKS';
      payload: {
        action: () => void;
      };
    }
  | {
      type: 'LOGIN';
    }
  | {
      type: 'REGISTER';
    }
  | {
      type: 'CLOSE_MODAL';
    };

export const modalReducer = (state: ModalState, action: Action): ModalState => {
  switch (action.type) {
    case 'EDIT_TASK':
      return {
        ...state,
        modalState: 'edit',
        title: 'Edit task',
        description: `You are editing the task "${action.payload.taskName}"`,
        taskId: action.payload.taskId,
      };
    case 'DELETE_TASK':
      return {
        ...state,
        modalState: 'delete',
        title: 'Delete task',
        description: `Are you sure you want to delete the task "${action.payload.taskName}" ?`,
        action: action.payload.action,
      };
    case 'RESET_TASKS':
      return {
        ...state,
        modalState: 'reset',
        title: 'Reset tasks',
        description: 'Are you sure you want to reset all tasks?',
        action: action.payload.action,
      };
    case 'LOGIN':
      return {
        ...state,
        modalState: 'login',
        title: 'Login',
        description: 'Please provide your email and password to login',
      };
    case 'REGISTER':
      return {
        ...state,
        modalState: 'register',
        title: 'Register',
        description: 'Please provide your email and password to create an account',
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        modalState: '',
        title: '',
        description: '',
        taskId: undefined,
        action: () => {},
      };
    default:
      throw new Error('Unhandled action type in DialogReducer');
  }
};
