import React from 'react'
import {
    BrowserRouter as
        Switch,
    Route
} from "react-router-dom";
import { LoginScreen } from '../auth/LoginScreen';
import { RegisterScreen } from '../auth/RegisterScreen';

export const AuthRouter = () => {
    return (
        <div className="auth__main">
            <div className="auth__box-container">
                <Switch>
                    <Route exact path="/auth/login" component={LoginScreen} />
                    <Route path="/auth/register" component={RegisterScreen} />
                    
                </Switch>
            </div>
        </div>
    )
}
