import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';


import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { logout, logoutAction } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';
import { Sidebar } from '../../../components/journal/Sidebar';

jest.mock('../../../actions/auth', () => ({
    logoutAction: jest.fn()
}));
 
jest.mock('../../../actions/notes', () => ({
    startNewNote: jest.fn()
}));
 
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
    auth: {
        uid:'1',
        name:'cris'
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: {
            active:null,
            notes:[]
        },
        notes: []
    }
};
let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount( 
    <Provider store={ store }>
            <Sidebar /> 
    </Provider>
)
describe('TEST sidebar', () => {

    test('debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });
    test('debe de llamar el startLogout', () => {
        wrapper.find('button').prop('onClick')();
        expect(logoutAction).toHaveBeenCalled();
    });
    test('debe de llamar el startNewNote', () => {
        wrapper.find('.journal__new-entry').prop('onClick')();
        expect(startNewNote).toHaveBeenCalled();
    });
});