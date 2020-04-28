import { Form, Button } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks'
import { useForm } from '../util/hooks';
import React, { useState, useContext } from 'react'

import { AuthContext, AuthProvider } from '../context/auth';

function Register(props) {
  const context = useContext(AuthContext);

  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: 'user_2',
    email: 'user_2@email.com',
    password: '123456',
    confirmPassword: '123456'
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      console.log(userData);
      context.login(userData);
      props.history.push('/');
    },
    onError(err) {
      let errors = err.graphQLErrors[0].extensions.exception.errors;
      setErrors(errors);
    },
    variables: values
  });


  function registerUser() {
    addUser();
  }

  return (
    <div className='form-container'>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder='Username...'
          name="username"
          value={values.username}
          onChange={onChange}
          error={errors.username ? true : false}
        />
        <Form.Input
          label="email"
          placeholder='email...'
          name="email"
          value={values.email}
          onChange={onChange}
          error={errors.email ? true : false}
        />
        <Form.Input
          label="password"
          placeholder='password...'
          type='password'
          name="password"
          value={values.password}
          onChange={onChange}
          error={errors.password ? true : false}
        />
        <Form.Input
          label="confirmPassword"
          placeholder='confirmPassword...'
          type='password'
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={onChange}
          error={errors.confirmPassword ? true : false}
        />
        <Button type='submit' primary>Register</Button>
      </Form>

      {
        Object.keys(errors).length > 0 && (
          <div className='ui error message'>
            <ul className='list'>
              {
                Object.values(errors).map(value => (
                  <li key={value}>{value}</li>
                ))
              }
            </ul>
          </div>
        )
      }


    </div>
  )
}


const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register
