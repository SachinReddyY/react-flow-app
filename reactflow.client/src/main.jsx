import { createRoot } from 'react-dom/client'
import App from './App'
import { DiagramProvider } from './context/DiagramContext';
import './index.css'

createRoot(document.getElementById('root')).render(
    <DiagramProvider>
        <App />
    </DiagramProvider>
);
