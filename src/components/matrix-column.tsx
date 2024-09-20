import { MatrixCard } from './matrix-card';

import { Task } from '@/types';

interface MatrixColumnProps {
  title: string;
  description: string;
  tasks: Task[];
}

export const MatrixColumn = ({ title, description, tasks }: MatrixColumnProps) => {
  return (
    <div className="rounded-xl border-2 border-dashed p-4">
      <h2 className="select-none text-center text-2xl font-bold">{title}</h2>
      <p className="mb-2 select-none text-center text-sm">{description}</p>
      <div>
        {tasks.map((task) => (
          <MatrixCard key={task.id} title={task.title} />
        ))}
      </div>
    </div>
  );
};
