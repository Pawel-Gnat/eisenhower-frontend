import { TaskContextProvider } from './context/task-context';
import { ModalContextProvider } from './context/modal-context';
import { AuthContextProvider } from './context/auth-context';

import { Header } from './components/header';
import { Main } from './components/main';
import { Footer } from './components/footer';
import { Modal } from './components/modal';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <AuthContextProvider>
      <TaskContextProvider>
        <ModalContextProvider>
          <Header />
          <Main />
          <Footer />
          <Modal />
          <Toaster position="bottom-center" />
        </ModalContextProvider>
      </TaskContextProvider>
    </AuthContextProvider>
  );
}

export default App;
