import { render } from '@testing-library/react';
import { shallow, mount } from 'enzyme';
import ErrorBoundary from '../ErrorBoundary';

test('renders learn react link', () => {
    const Wrapper = shallow(<ErrorBoundary/>);
    Wrapper.setState({ hasError: true });
     expect(Wrapper).toMatchSnapshot();
   
});


