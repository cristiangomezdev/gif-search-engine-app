import { types } from "../types/types";


describe('Pruebas con nuestros types', () => {
    test('Prueba con types', () => {
        expect(types).toEqual({
            
                login:'[Auth] Login',
                logout:'[Auth] Logout',
            
                uiSetError:'[UI] Set Error',
                uiRemoveError:'[UI] Remove Error',
            
                uiStartLoading:'[UI] Start loading',
                uiFinishLoading:'[UI] Finish loading',
            
                notesAddNew:'[Notes] New note',
                notesActive:'[Notes] Set active note',
                notesLoad:'[Notes] Load notes',
                notesUpdated:'[Notes] updated note',
                notesFileUrl:'[Notes] updated image url',
                notesDelete:'[Notes] Delete note',
                notesLogoutCleaning:'[Notes] Logout Cleaning',
            })
    });
});