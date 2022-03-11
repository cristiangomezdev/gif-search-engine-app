import React from 'react'
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { MemoryRouter } from 'react-router-dom';
import { types } from '../../../types/types';
import { RegisterScreen } from '../../../components/auth/RegisterScreen';

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


const wrapper = mount(
    <MemoryRouter>

    <Provider store={store}>
            <RegisterScreen />
       
    </Provider>
    </MemoryRouter>
)



describe('Pruebas en register Screen', () => {
    beforeEach(() => {
        store.clearActions();
        jest.clearAllMocks();
    })
    test('debe de mostrarse correctamente',()=>{
        expect(wrapper).toMatchSnapshot();

    })
test('debe de hacer el dispatch de la accion respectiva',()=>{

    const emailField = wrapper.find('input[name="email"]');
    console.log(emailField.html())
    emailField.simulate('change',{
        target:{
            value:'',
            name:'email'
        }
    })
    wrapper.find('form').simulate('submit',{
        preventDefault(){}
    }) 
    const actions = store.getActions();

    expect(actions[0]).toEqual({
        type:types.uiSetError,
        payload:'email is not valid'
    })
})
test('Debe mostrar la caja de alerta con el error', () => {
    const initState = {
        auth: {},
        ui: {
            loading: false,
            msgError: 'email is not valid'
        }
    }
    const store1 = mockStore(initState);
    
    
    const wrapper = mount(
        <MemoryRouter>
    
        <Provider store={store1}>
                <RegisterScreen />
           
        </Provider>
        </MemoryRouter>
    )
    expect(wrapper.find('.auth__alert-error').exists()).toBe(true)
    expect(wrapper.find('.auth__alert-error').text().trim()).toBe(initState.ui.msgError)
});

});