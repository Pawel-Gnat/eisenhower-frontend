import { ModalState } from '@/types';

export type Action =
  | {
      type: 'EDIT_TASK';
      payload: {
        taskName: string;
        action: () => void;
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
      type: 'CLOSE_MODAL';
    };

export const modalReducer = (state: ModalState, action: Action): ModalState => {
  switch (action.type) {
    case 'EDIT_TASK':
      return {
        ...state,
        isModalOpen: true,
        title: 'Edit task',
        description: `You are editing the task "${action.payload.taskName}"`,
        action: action.payload.action,
      };
    case 'DELETE_TASK':
      return {
        ...state,
        isModalOpen: true,
        title: 'Delete task',
        description: `Are you sure you want to delete the task "${action.payload.taskName}" ?`,
        action: action.payload.action,
      };
    case 'RESET_TASKS':
      return {
        ...state,
        isModalOpen: true,
        title: 'Reset tasks',
        description: 'Are you sure you want to reset all tasks?',
        action: action.payload.action,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        isModalOpen: false,
        title: '',
        description: '',
      };
    default:
      throw new Error('Unhandled action type in DialogReducer');
  }
};
