import { AppContextProvider } from './context/app-context';
import { ModalContextProvider } from './context/modal-context';

import { Header } from './components/header';
import { Main } from './components/main';
import { Footer } from './components/footer';
import { Modal } from './components/modal';

function App() {
  return (
    <AppContextProvider>
      <ModalContextProvider>
        <Header />
        <Main />
        <Footer />
        <Modal />
      </ModalContextProvider>
    </AppContextProvider>
  );
}

export default App;
