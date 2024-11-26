import { initialPdfState } from '@/context/task-context';

import { PdfData, Task, TaskState, VIEW } from '@/types';

export type Action =
  | { type: 'TASKS'; payload: { tasks: Task[] } }
  | { type: 'PDF_DATA'; payload: { pdfData: PdfData } }
  | { type: 'VIEW'; payload: { view: VIEW } }
  | { type: 'IS_LOADING'; payload: { isLoading: boolean } }
  | { type: 'RESET_TASKS' };

export const taskReducer = (state: TaskState, action: Action): TaskState => {
  switch (action.type) {
    case 'TASKS':
      return {
        ...state,
        tasks: action.payload.tasks,
      };
    case 'PDF_DATA':
      return {
        ...state,
        pdfData: action.payload.pdfData,
      };
    case 'VIEW':
      return {
        ...state,
        view: action.payload.view,
      };
    case 'IS_LOADING':
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    case 'RESET_TASKS':
      return {
        ...state,
        tasks: [],
        pdfData: initialPdfState,
        view: 'create',
      };
    default:
      throw new Error('Unhandled action type in taskReducer');
  }
};
