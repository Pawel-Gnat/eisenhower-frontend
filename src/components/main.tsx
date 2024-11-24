import { useContext } from 'react';

import { TaskContext } from '@/context/task-context';

import { TasksContainer } from './tasks-container';
import { MatrixContainer } from './matrix-container';

export const Main = () => {
  const { view } = useContext(TaskContext);

  return (
    <main className="flex flex-1 flex-col overflow-hidden pt-4 sm:pt-8">
      {!view ? <TasksContainer /> : <MatrixContainer />}
    </main>
  );
};
