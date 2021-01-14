import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
    user: null
};

const token = localStorage.getItem('jwtToken');
if (token) {
    const decodedToken = jwtDecode(token.split('Token ')[1]);
    console.log(decodedToken);
    initialState.user = decodedToken;
}

const AuthContext = createContext({
    user: null,
    login: (data) => {},
    logout: () => {}
});

function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN': {
            return {
                ...state,
                user: action.payload.user
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                user: null,
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
                login,
                logout 
            }}
            {...props}
        />
    )
}

export { AuthContext, AuthProvider }
