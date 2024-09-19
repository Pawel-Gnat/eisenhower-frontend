import { AppContextProvider } from './context/app-context';

import { Header } from './components/header';
import { Main } from './components/main';
import { Footer } from './components/footer';

function App() {
  return (
    <AppContextProvider>
      <Header />
      <Main />
      <Footer />
    </AppContextProvider>
  );
}

export default App;
