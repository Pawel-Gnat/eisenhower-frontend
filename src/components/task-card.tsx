import { Card, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { RadioGroup } from './radio-group';

import { Task } from '@/types';

import { Edit2, Trash2 } from 'lucide-react';

interface TaskCardProps extends Task {
  onDelete: (id: string, title: string) => void;
  onEdit: (id: string, title: string) => void;
  onSelectOption: <K extends keyof Task>(id: string, field: K, value: Task[K]) => void;
}

const urgencyOptions: Task['urgency'][] = ['urgent', 'not urgent'];
const importanceOptions: Task['importance'][] = ['important', 'not important'];

export const TaskCard = ({
  id,
  title,
  urgency,
  importance,
  onDelete,
  onEdit,
  onSelectOption,
}: TaskCardProps) => {
  return (
    <Card className="mx-auto flex min-h-32 w-full flex-col justify-between gap-2 p-4 transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between gap-2">
        <CardTitle className="cursor-default truncate font-bold">{title}</CardTitle>
        <div className="flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(id, title)}
            aria-label="Edit task"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(id, title)}
            aria-label="Delete task"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap justify-between gap-4">
        <RadioGroup<Task['urgency']>
          defaultValue={urgency}
          values={urgencyOptions}
          onChange={(value) => onSelectOption(id, 'urgency', value)}
        />
        <RadioGroup<Task['importance']>
          defaultValue={importance}
          values={importanceOptions}
          onChange={(value) => onSelectOption(id, 'importance', value)}
        />
      </div>
    </Card>
  );
};
