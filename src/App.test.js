import { render } from '@testing-library/react';
import { shallow, mount } from 'enzyme';
import App from './App';
import BreedList from './components/breedList';
import ErrorBoundary from './ErrorBoundary';


const Something=()=>{
  return (<ErrorBoundary>
  <BreedList />
</ErrorBoundary>)
}

test('renders learn react link', () => {
  render(<App />);
  const wrapper = shallow(<ErrorBoundary>
    <BreedList />
  </ErrorBoundary>);
  const error = new Error('test');

   
});


