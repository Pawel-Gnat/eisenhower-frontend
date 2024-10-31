import { AppContextProvider } from './context/app-context';
import { ModalContextProvider } from './context/modal-context';

import { Header } from './components/header';
import { Main } from './components/main';
import { Footer } from './components/footer';
import { Modal } from './components/modal';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <AppContextProvider>
      <ModalContextProvider>
        <Header />
        <Main />
        <Footer />
        <Modal />
        <Toaster position="bottom-center" />
      </ModalContextProvider>
    </AppContextProvider>
  );
}

export default App;
