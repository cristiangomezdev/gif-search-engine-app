import {authReducer} from '../../reducers/authReducer';
import { types } from '../../types/types';


describe('Pruebas en auth ', () => {
    
    test('Debe de realizar un login' , () => {
        const initState ={};

        const action = {type:types.login,payload:{uid:'abc',displayName:'cris'}}

        const state = authReducer(initState,action);



        expect(state).toEqual({uid:'abc',name:'cris'})
    });

    test('Debe de realizar un logout' , () => {
        const initState ={ uid:'asdasdadas',name:'cris'};

        const action = {type:types.logout}

        const state = authReducer(initState,action);



        expect(state).toEqual({})
    });
    test('No debe hacer cambios al state' , () => {
        const initState ={ uid:'asdasdadas',name:'cris'};

        const action = {type:'asdas'}

        const state = authReducer(initState,action);


        expect(state).toEqual(initState)
    });
});