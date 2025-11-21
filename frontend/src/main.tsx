
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './context/AppContext';
import App from './App';
import 'swiper/css';


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>
);

