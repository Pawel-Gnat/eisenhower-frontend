import { useContext } from 'react';

import { AppContext } from '@/context/app-context';

import { TasksContainer } from './tasks-container';
import { MatrixContainer } from './matrix-container';

export const Main = () => {
  const { view } = useContext(AppContext);

  return (
    <main className="flex flex-1 flex-col overflow-hidden pt-4 sm:pt-8">
      {!view ? <TasksContainer /> : <MatrixContainer />}
    </main>
  );
};
