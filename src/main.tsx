import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Register service worker with automatic updates and offline caching
registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log('Chai Cafe PWA: New content available, updating cache.');
  },
  onOfflineReady() {
    console.log('Chai Cafe PWA: App shell and menu are ready to work offline.');
  }
});

createRoot(document.getElementById('root')!).render(<App />);
