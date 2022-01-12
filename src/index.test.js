import { render } from '@testing-library/react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';



const Something=()=>{
  return (<Provider store={store}>
  <App />
</Provider>)
}

test('renders learn react link', () => {
  render(Something);
  const wrapper = shallow(<App />);
  const error = new Error('test');

   
});


