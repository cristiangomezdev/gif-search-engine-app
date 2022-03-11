/** * @jest-environment node */
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { disableNetwork, doc, deleteDoc,getDoc } from "firebase/firestore";
import {  startNewNote, StartUploading } from '../../actions/notes';
import { types } from '../../types/types';
import { db } from '../../firebase/firebaseConfig'
import * as fs from 'fs';
import {fileUpload} from '../../helpers/fileUpload';
jest.mock('../../helpers/fileUpload',()=>({
    fileUpload:jest.fn(()=>{
        return 'https://hola.com/cosa.jpg'
    })
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {
    auth: {
        uid: 'TESTING'
    },
    notes:{
        active:{
            id:'51ciJa5nxSwXwYif8hjZ',
            title:'perro',
            body:'perro'
        }
    }
}
let store = mockStore(initState)
describe('NOTES test', () => {
    beforeEach(()=>{
        store = mockStore(initState)
    })
    afterAll(() => { disableNetwork(db); })
    test('should ', async () => {

        await store.dispatch(startNewNote());

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        })
        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        })
        const docId = actions[0].payload.id;
        const noteRef = doc(db, `/TESTING/journal/notes/${docId}`);
        await deleteDoc(noteRef);


    });

});