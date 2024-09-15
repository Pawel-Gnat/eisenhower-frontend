import { Card, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import { Task } from '@/types';
import { RadioGroup } from './radio-group';

interface TaskCardProps extends Task {
  onDelete: (id: string) => void;
}

const urgencyOptions: Task['urgency'][] = ['urgent', 'not urgent'];
const importanceOptions: Task['importance'][] = ['important', 'not important'];

export const TaskCard = ({ id, title, urgency, importance, onDelete }: TaskCardProps) => {
  return (
    <Card className="mx-auto flex w-full flex-col justify-between p-4 transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between gap-2">
        <CardTitle className="truncate text-sm font-medium">{title}</CardTitle>
        <div className="flex-shrink-0">
          <Button variant="ghost" size="icon" onClick={() => {}} aria-label="Edit task">
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(id)}
            aria-label="Delete task"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap justify-between gap-4">
        <RadioGroup defaultValue={urgency} values={urgencyOptions} />
        <RadioGroup defaultValue={importance} values={importanceOptions} />
      </div>
    </Card>
  );
};
