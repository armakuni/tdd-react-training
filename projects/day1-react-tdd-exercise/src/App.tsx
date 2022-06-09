import Accordion from './Accordion';
import './App.css';
import Spoiler from './Spoiler';

const accordionItems = [
  {
    title: 'Bakery',
    items: ['Bread', 'Cakes'],
  },
  {
    title: 'Dairy',
    items: ['Milk', 'Cheeses', 'Yoghurts'],
  },
  {
    title: 'Produce',
    items: ['Vegetables', 'Salads', 'Fruit'],
  },
];

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
        <Accordion items={accordionItems} />
      </div>
    </div>
  );
}

export default App;
