import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from './Form';
import TextInput from './TextInput';
import CheckBox from './CheckBox';
import Button from './Button';
import { useAuth } from '../contexts/AuthContext';

export default function SignupForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agree, setAgree] = useState(false);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signup } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }
        try {
            setError('');
            setLoading(true);
            await signup(email, password, username);
            navigate('/');
        } catch (err) {
            console.log(err);
            setLoading(false);
            setError('Failed to create an account!');
        }
    }

    return (
      <Form style={{ height: '500px' }} onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Enter name"
          icon="person"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextInput
          type="text"
          placeholder="Enter email"
          icon="alternate_email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          type="password"
          placeholder="Enter password"
          icon="lock"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextInput
          type="password"
          placeholder="Confirm password"
          icon="lock_clock"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <CheckBox
          className="checkbox"
          text="I agree to the Terms & Conditions"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />
        <Button disabled={loading} type="submit">
          <span>Submit now</span>
        </Button>
        {error && <p className="error">{error}</p>}
        <div className="info">
          Already have an account?
          {' '}
          <Link to="/login">Login</Link>
          {' '}
          instead.
        </div>
      </Form>
    );
}
