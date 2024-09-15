import { Button } from './components/ui/button';
import { TaskContextProvider } from './context/task-context';
import { Header } from './components/header';
import { useState } from 'react';
import { TasksContainer } from './components/tasks-container';
import { MatrixContainer } from './components/matrix-container';

enum VIEW {
  CREATE = 0,
  RENDER = 1,
}

function App() {
  const [view, setView] = useState<VIEW>(VIEW.CREATE);

  const toggleView = () => {
    setView((prev) => (prev === VIEW.CREATE ? VIEW.RENDER : VIEW.CREATE));
  };

  return (
    <TaskContextProvider>
      <Header />
      <main className="flex flex-1 flex-col overflow-hidden pt-4 sm:pt-8">
        {view === VIEW.CREATE ? <TasksContainer /> : <MatrixContainer />}

        <div className="flex justify-end gap-2">
          <Button onClick={() => toggleView()}>
            {view === VIEW.CREATE ? 'Next' : 'Back'}
          </Button>

          {view === VIEW.RENDER && <Button onClick={() => {}}>Export to PDF</Button>}
        </div>
      </main>
    </TaskContextProvider>
  );
}

export default App;
