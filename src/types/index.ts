export type UrgencyType = 'urgent' | 'not urgent';
export type ImportanceType = 'important' | 'not important';

export type Task = {
  id: string;
  title: string;
  urgency: UrgencyType | undefined;
  importance: ImportanceType | undefined;
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
  getTasks: () => Promise<Task[]>;
  addTask: (task: Task) => Promise<Task>;
  editTask: (taskId: string, updatedTask: Partial<Task>) => Promise<Task>;
  deleteTask: (taskId: string) => Promise<void>;
}
