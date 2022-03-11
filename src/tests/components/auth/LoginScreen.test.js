import React from 'react'
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { MemoryRouter } from 'react-router-dom';
import { startGoogleLogin,startLoginEmailPassword } from '../../../actions/auth';
jest.mock('../../../actions/auth',()=>({
    startGoogleLogin:jest.fn(),
    startLoginEmailPassword:jest.fn()
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
}
let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <MemoryRouter>

    <Provider store={store}>
            <LoginScreen />
       
    </Provider>
    </MemoryRouter>
)

describe('Pruebas en loginScreen', () => {

    beforeEach(() => {
        store = mockStore(initState)
        jest.clearAllMocks();
    })

    test('Debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });
    test('Debe disparar la accion de startgooglelogin', () => {
        wrapper.find('.google-btn').prop('onClick')();
        expect(startGoogleLogin).toHaveBeenCalled();
    });
    test('debe de disparar el startlogin con los respectivos argumentos', () => {
        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        })
        expect(startLoginEmailPassword).toHaveBeenLastCalledWith('nando@gmail.com','123456');
        })
});