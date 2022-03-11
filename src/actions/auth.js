import { googleAuthProvider } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword,signOut, updateProfile,  getAuth ,signInWithEmailAndPassword , signInWithPopup} from 'firebase/auth';
import { startLoading,finishLoading } from './ui';
import {types} from '../types/types';
import Swal from 'sweetalert2';
import { noteLogout } from './notes';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading())
        const auth = getAuth();
        return signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch(
                    login( user.uid, user.displayName )
                );
                dispatch(finishLoading())

            })
            .catch((error) => {

                Swal.fire('Error',error.message,'error')
            });
    };
};

export const startRegisterWithEmailPasswordName = (email,password,name) => {
    return (dispatch) => {
 
        const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
                .then( async({ user }) => {
 
                await updateProfile( user, { displayName: name });
 

        })
        .catch(error =>{Swal.fire('Error',error.message,'error')})
    }

}

export const startGoogleLogin = () =>{
    return(dispatch) =>{
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({user}) =>{
                dispatch(login(user.uid, user.displayName))
            });
    }
}
export const login = (uid,displayName) =>{
    return{
        type:types.login,
        payload:{
            uid,
            displayName
        }
    }
}
export const logoutAction = () => {
    return async(dispatch) => {
        const auth = getAuth();
        await signOut(auth);
        dispatch(logout());
        dispatch(noteLogout());
    }
}

export const logout = ()=>({
    type:types.logout
})