import dog from './dog.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import BreedList from './components/BreedList';
import ErrorBoundary from './ErrorBoundary';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <BreedList></BreedList>
      </ErrorBoundary>
    </div>
  );
}

export default App;
