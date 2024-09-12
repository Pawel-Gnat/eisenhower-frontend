import { TaskForm } from './components/task-form';
import { TasksGrid } from './components/tasks-grid';
import { Button } from './components/ui/button';
import { TaskContextProvider } from './context/task-context';
import { Header } from './components/header';

function App() {
  return (
    <TaskContextProvider>
      <Header />
      <main className="mt-4 flex flex-1 flex-col gap-4 overflow-hidden sm:mt-8 sm:gap-8">
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
