export type Task = {
  id: string;
  title: string;
  urgency: 'urgent' | 'not urgent' | '';
  importance: 'important' | 'not important' | '';
};
