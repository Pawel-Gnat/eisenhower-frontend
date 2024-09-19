import { Task } from '@/types';

interface MatrixColumnProps {
  title: string;
  description: string;
  tasks: Task[];
}

export const MatrixColumn = ({ title, description, tasks }: MatrixColumnProps) => {
  return (
    <div className="rounded-xl border-2 border-dashed p-4">
      <h2 className="text-center text-lg font-bold">{title}</h2>
      <p className="mb-2 text-center text-sm">{description}</p>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};
