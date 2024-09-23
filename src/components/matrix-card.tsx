import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Card, CardTitle } from './ui/card';

interface MatrixCardProps {
  title: string;
  order: number;
  forceDragging?: boolean;
}

export const MatrixCard = ({ title, order, forceDragging = false }: MatrixCardProps) => {
  const { attributes, isDragging, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: order,
    });

  const parentStyles = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
    opacity: isDragging ? '0.4' : '1',
    cursor: isDragging || forceDragging ? 'grabbing' : 'grab',
  };

  return (
    <Card
      ref={setNodeRef}
      style={parentStyles}
      {...attributes}
      {...listeners}
      className="relative mx-auto flex w-full flex-col justify-between p-4 transition-transform hover:shadow-md active:scale-[1.01] active:shadow-lg"
    >
      <CardTitle className="select-none truncate text-lg font-medium">{title}</CardTitle>
      <span className="absolute right-2 top-2">{order}</span>
    </Card>
  );
};
