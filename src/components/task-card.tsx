import { Card, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { RadioGroup } from './radio-group';

import { ImportanceType, Task, UrgencyType } from '@/types';

import { Edit2, Trash2 } from 'lucide-react';

interface TaskCardProps extends Task {
  onDelete: (id: string, title: string) => void;
  onEdit: (id: string, title: string) => void;
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
}

export const TaskCard = ({
  id,
  title,
  urgency,
  importance,
  onDelete,
  onEdit,
  onUpdateTask,
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
        <RadioGroup<UrgencyType>
          defaultValue={urgency}
          values={['urgent', 'not urgent']}
          onChange={(value) => onUpdateTask(id, { urgency: value })}
        />
        <RadioGroup<ImportanceType>
          defaultValue={importance}
          values={['important', 'not important']}
          onChange={(value) => onUpdateTask(id, { importance: value })}
        />
      </div>
    </Card>
  );
};
