export type Task = {
  id: string;
  title: string;
  urgency: 'urgent' | 'not urgent' | '';
  importance: 'important' | 'not important' | '';
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
  isModalOpen: boolean;
  title: string;
  description: string;
  action: () => void;
};
