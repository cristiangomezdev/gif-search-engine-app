import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';


import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { activeNote } from '../../../actions/notes';
import { NoteScreen } from '../../../components/notes/NoteScreen';



jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn()
}));


const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
    auth: {
        uid: '1',
        name: 'cris'
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: {       
                id: 1234,
                title: 'hola',
                body: 'mundo',
                date: 0
        },
        notes: []
    }
};
let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <NoteScreen />
    </Provider>
)
describe('TEST notescreen', () => {
    test('Debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });
    test('debe de disparar el active note', () => {
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'hola de nuevo'
            }
        })
        expect(activeNote).toHaveBeenLastCalledWith(
            1234,
            {
                body: 'mundo',
                title: 'hola de nuevo',
                id:1234,
                date: 0
            }
        )
});
});