import { TaskForm } from './components/task-form';
import { TasksGrid } from './components/tasks-grid';
import { Button } from './components/ui/button';

function App() {
  return (
    <>
      <header className="text-right">
        <Button>Login</Button>
      </header>
      <main className="mt-4 flex flex-1 flex-col gap-4 sm:mt-8 sm:gap-8">
        <h1 className="text-center text-3xl font-bold">Eisenhower Matrix</h1>
        <TaskForm />
        <TasksGrid />
        <div className="text-right">
          <Button>Next</Button>
        </div>
      </main>
    </>
  );
}

export default App;
