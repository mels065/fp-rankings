import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
    user: null,
    isLoggedIn: false
};

const token = localStorage.getItem('jwtToken');
if (token) {
    const decodedToken = jwtDecode(token.split('Token ')[1]);
    console.log(decodedToken);
    initialState.user = decodedToken;
    initialState.isLoggedIn = true;
}

const AuthContext = createContext({
    user: null,
    isLoggedIn: false,
    login: (data) => {},
    logout: () => {}
});

function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN': {
            return {
                ...state,
                user: action.payload.user,
                isLoggedIn: true
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                user: null,
                isLoggedIn: false
            }
        }
        default: {
            return state;
        }
    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    function login(data) {
        localStorage.setItem('jwtToken', data.token);
        dispatch({
            type: 'LOGIN',
            payload: data
        });
    }

    function logout() {
        localStorage.removeItem('jwtToken');
        dispatch({ type: 'LOGOUT' });
    }

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isLoggedIn: state.isLoggedIn,
                login,
                logout 
            }}
            {...props}
        />
    )
}

export { AuthContext, AuthProvider }
