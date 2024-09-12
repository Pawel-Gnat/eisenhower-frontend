import { Card, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';

interface TaskCardProps {
  title: string;
}

export const TaskCard = ({ title }: TaskCardProps) => {
  return (
    <Card className="mx-auto w-full max-w-md p-4 transition-shadow hover:shadow-md">
      <CardTitle className="truncate text-sm font-medium">{title}</CardTitle>
      <div className="mt-4 space-x-2 text-right">
        <Button variant="ghost" size="icon" onClick={() => {}} aria-label="Edit task">
          <Edit2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => {}} aria-label="Delete task">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};
