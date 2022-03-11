import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {login,logout,logoutAction, startLoginEmailPassword} from '../../actions/auth';
import { types } from '../../types/types';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {}

let store = mockStore(initState);

describe('AUTH Test', () => {

    beforeEach(()=>{
        store = mockStore(initState)
    })

    test('login y logout deben de crear la accion respectiva', () => {
        const uid = 'ABC123';
        const displayName ='Fernando';

        const loginAction = login(uid,displayName);
        const logoutAction = logout();

        expect(loginAction).toEqual({
            type:types.login,
            payload:{uid,displayName}
        })
        expect(logoutAction).toEqual({
            type:types.logout
        })
    });
    test('Debe de realizar el logoutAction', async() => {
        await store.dispatch(logoutAction())

        const actions = store.getActions();

        expect(actions[0]).toEqual({type:types.logout})
        expect(actions[1]).toEqual({type:types.notesLogoutCleaning})
    });
    test('debe de iniciar el startloginemailpassword', async() => {
        await store.dispatch(startLoginEmailPassword('test@testing.com','123456'));
        const actions = store.getActions();

        expect(actions[1]).toEqual({
            type:types.login,
            payload:{
                uid:'YF4atEaPtXdnvUqNlsQS7MTag2x1',
                displayName:null
            }
        })
    });
});