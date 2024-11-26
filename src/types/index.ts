export type UrgencyType = 'urgent' | 'not urgent' | null;
export type ImportanceType = 'important' | 'not important' | null;
export type VIEW = 'create' | 'render';

export type Task = {
  _id: string;
  title: string;
  urgency: UrgencyType;
  importance: ImportanceType;
};

export type SortedTask = Task & {
  order: number;
};

export type PdfData = {
  do: SortedTask[];
  schedule: SortedTask[];
  delegate: SortedTask[];
  delete: SortedTask[];
};

export type ModalState = {
  modalState: 'edit' | 'delete' | 'reset' | 'login' | 'register' | '';
  taskId?: string;
  title: string;
  description: string;
  action: () => void;
};

export type TaskState = {
  tasks: Task[];
  view: VIEW;
  pdfData: PdfData;
  isLoading: boolean;
};

export interface StorageStrategy {
  getTasks: () => Promise<ResponseFromAPIWithData<Task[]>>;
  addTask: (task: Task) => Promise<ResponseFromAPIWithData<Task>>;
  editTask: (
    taskId: string,
    updatedTask: Partial<Task>,
  ) => Promise<ResponseFromAPIWithData<Task>>;
  deleteTask: (taskId: string) => Promise<ResponseFromAPI>;
  deleteAllTasks: () => Promise<ResponseFromAPI>;
}

export type ResponseFromAPIWithData<T> = {
  object: T;
  httpStatus: number;
  message: string;
  status: Status;
};

export type ResponseFromAPI = {
  httpStatus: number;
  message: string;
  status: Status;
};

export type ResponseError = {
  message: string;
  error: unknown;
};

export enum Status {
  SUCCESS = 'success',
  WARNING = 'warning',
  DANGER = 'danger',
}
