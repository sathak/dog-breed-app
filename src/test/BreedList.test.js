import { act, render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';
import React,{ useEffect,useRef } from 'react';
import TestRenderer from 'react-test-renderer';
import BreedList from '../components/breedList';

global.fetch = jest.fn(() => Promise.resolve({ data: "something", }));



jest.mock('react', () => {
  const originReact = jest.requireActual('react');
  const didMountRef = jest.fn();
  return {
    ...originReact,
    useRef: didMountRef,
  };
});

jest.mock('react-redux', () => ({
  useSelector: () => {
    return {
      breeds: [
        {
          id: 1,
          name: 'test',
          life_span: '10 years',
          height: {
            metric: '10 - 13'
          }
        }
      ]
    };
  },
  useDispatch: jest.fn(),
}));

const mockChildComponent = jest.fn();
jest.mock("../components/BreedCard", () => (props) => {
  mockChildComponent(props);
  return <mock-childComponent />;
});




describe('BreedList', () => {
  const resposeValue = {
    breeds: [
      {
        id: 1,
        name: 'test',
        life_span: '10 years',
        height: {
          metric: '10 - 13'
        }
      }
    ]
  };

  let wrapper;
  let props;
  let useEffect;

  

  beforeEach(() => {

    useEffect = jest.spyOn(React, 'useEffect');
    props = {
      fetchAllBreeds: jest.fn().mockResolvedValue(resposeValue)
    }
   
    wrapper = shallow(<BreedList />);
  //  const testRenderer = TestRenderer.create(<BreedList />);
  //const testInstance = testRenderer.root;

// console.log(testInstance);
    
  });
  it('load all the breeds', () => {
    const didMountRef = { current: false };
    useRef.mockReturnValueOnce(didMountRef);

    expect(wrapper.find('.card').length).toBe(1);
        expect(wrapper).toMatchSnapshot();
  })
it('debounce ',()=>{
  const _=require('lodash');
  jest.useFakeTimers();
  try{
    const func = jest.fn();
    const debouncedFunc = _.debounce(func, 1000);


    // Execute for the first time
    debouncedFunc();

    // Move on the timer
    jest.advanceTimersByTime(250);
    // try to execute a 2nd time
    debouncedFunc();

    // Fast-forward time
    jest.runAllTimers();

    expect(func).toBeCalledTimes(1);

  }finally{
    jest.useRealTimers();
  }
})
});
