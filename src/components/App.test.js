import React from 'react';
import Enzyme, { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

configure({ adapter: new Adapter() });


describe('Subreddit Test Suite', () => {

    it('should fetch the Subreddit sports as default', () => {
        const wrapper = mount(<App />);
        expect(wrapper.find('input').exists()).toBe(true);
        expect(wrapper.state('currentSubreddit')).toEqual('sports');
                
    })
})
