import Diagram from './components/Diagram';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
    return (
        <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
            <Sidebar />
            <Diagram />
        </div>
    );
}

export default App;