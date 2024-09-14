import { Card, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import { Task } from '@/types';
import { RadioGroup } from './radio-group';

interface TaskCardProps {
  id: string;
  title: string;
  urgency: Task['urgency'];
  importance: Task['importance'];
  onDelete: (id: string) => void;
}

export const TaskCard = ({ id, title, urgency, importance, onDelete }: TaskCardProps) => {
  return (
    <Card className="mx-auto flex w-full max-w-md flex-col justify-between p-4 transition-shadow hover:shadow-md">
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

      {urgency.map((item) => (
        <RadioGroup key={item} defaultValue={item} values={item} />
      ))}
    </Card>
  );
};
