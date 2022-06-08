import './App.css';
import Spoiler from './Spoiler';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>React TDD Project</h1>
      </header>
      <div className="components">
        <Spoiler
          title="You'll never guess..."
          content="Bruce Willis is dead!"
        />
      </div>
    </div>
  );
}

export default App;
