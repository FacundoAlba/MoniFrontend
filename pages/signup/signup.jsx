import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Actualiza esta URL si es necesario

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            setError('Passwords do not match');
            return;
        }
        try {
            await axios.post(`${API_URL}/register/`, { username, password });
            router.push('/login');
        } catch (error) {
            setError('Error creating account');
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                </div>
                {error && <p>{error}</p>}
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignupPage;