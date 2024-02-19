import React from 'react';
import Illustration from '../Illustration';
// import Form from '../Form';
// import classes from '../../styles/Login.module.css';
// import TextInput from '../TextInput';
// import Button from '../Button';
import LoginForm from '../LoginForm';

export default function Login() {
  return (
    <>
      <h1>Login to yout account</h1>
      <div className="column">
        <Illustration />
        <LoginForm />
      </div>
    </>
  );
}
