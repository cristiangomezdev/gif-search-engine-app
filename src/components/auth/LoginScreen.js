import React from 'react';
import {useDispatch,useSelector} from 'react-redux';

import {Link} from'react-router-dom'
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {
    const dispatch = useDispatch();
    const {loading} = useSelector(state =>state.ui)
    const [ formValues,handleInputChange] = useForm({
        email:'nando@gmail.com',
        password:'123456'
    })
    const{email,password} = formValues;

    const handleLogin = (e) =>{
        e.preventDefault();
        if(email && password){
            dispatch( startLoginEmailPassword(email,password))
        }

    }
    const handleGoogleLogin = () =>{
        dispatch(startGoogleLogin())
    }
    return (
        <>
            <h3 className="auth__title">Login - Personal Journal</h3>
            <form onSubmit={handleLogin} className="animate__animated animate__bounce animate__faster">
                <input
                    type="text"
                    placeholder="email"
                    name="email"
                    className="auth__input"
                    autoComplete="off" 
                    value={email}
                    onChange={handleInputChange}/>
                <input
                    type="text"
                    placeholder='Password'
                    name="password"
                    className="auth__input" 
                    value={password}
                    onChange={handleInputChange}/>
                <button disabled={loading} className="btn btn__primary btn__block" type="submit">Login</button>
                <hr />
                <div className="auth__social-networks">
                    <p>login with social network</p>
                    <div
                        className="google-btn" onClick={handleGoogleLogin} >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                <Link className="link"to="/auth/register">Create new Account</Link>
                
                <h6 className="auth__by">Developed by Cristian Gomez</h6>
            </form>
        </>
    )
}
