import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import {
    Button,
    Form,
    Header,
    List,
} from 'semantic-ui-react';

import './style.css';

function LoginForm() {
    const [errors, setErrors] = useState({});
    const [formState, setFormState] = useState({
        username: '',
        password: '',
    });

    const [loginUser, { loading }] = useMutation(
        LOGIN_USER,
        {
            update(proxy, result) {
                console.log(result)
            },
            onError(err) {
                setErrors(err.graphQLErrors[0].extensions.exception.errors);
            },
            variables: formState        
        }
    );

    const handleInputChange = (event) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value
        });
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            loginUser();
        } catch(err) {
            throw err;
        }
    }

    return (
        <Form onSubmit={handleSubmit} className="login-form">
            <Header as='h2'>Login</Header>
            <List className="errors">
                {Object.values(errors).map(err => <List.Item>{err}</List.Item>)}
            </List>
            <Form.Field>
                <Form.Input 
                    label="Username"
                    name="username"
                    placeholder="Username"
                    onChange={handleInputChange}
                    value={formState.username}
                />
            </Form.Field>
            <Form.Field>
                <Form.Input
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleInputChange}
                    value={formState.password}
                />
            </Form.Field>
            <Button primary type="submit">Submit</Button>
        </Form>
    )
};

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ) {
        login(loginInput: {
            username: $username
            password: $password
        }) {
            user {
                username
                email
            }
            token
        }
    }
`;


export default LoginForm;
