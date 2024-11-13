export type UrgencyType = 'urgent' | 'not urgent';
export type ImportanceType = 'important' | 'not important';

export type Task = {
  _id: string;
  title: string;
  urgency: UrgencyType | null;
  importance: ImportanceType | null;
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

export interface StorageStrategy {
  getTasks: () => Promise<ResponseFromAPIWithData<Task[]>>;
  addTask: (task: Task) => Promise<ResponseFromAPIWithData<Task>>;
  editTask: (taskId: string, updatedTask: Partial<Task>) => Promise<Task>;
  deleteTask: (taskId: string) => Promise<void>;
}

export type ResponseFromAPIWithData<T> = {
  object: T;
  httpStatus: number;
  message: string;
  status: Status;
};

export enum Status {
  SUCCESS = 'success',
  WARNING = 'warning',
  DANGER = 'danger',
}
