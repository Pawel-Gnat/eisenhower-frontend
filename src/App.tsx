import { TaskForm } from './components/task-form';
import { TasksGrid } from './components/tasks-grid';
import { Button } from './components/ui/button';
import { TaskContextProvider } from './context/task-context';
import { Header } from './components/header';

enum STEPS {
  CREATE = 0,
  RENDER = 1,
}

function App() {
  return (
    <TaskContextProvider>
      <Header />
      <main className="flex flex-1 flex-col gap-4 overflow-hidden pt-4 sm:gap-8 sm:pt-8">
        <TaskForm />
        <TasksGrid />
        <div className="text-right">
          <Button>Next</Button>
        </div>
      </main>
    </TaskContextProvider>
  );
}

export default App;
