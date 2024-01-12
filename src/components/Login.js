import React, { useState } from "react";
import '../styles.css';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin') {
            onLogin();
        } else {
            alert('Invalid username or password');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleLogin}>
                <label className="login-label" htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="login-input"
                    aria-label="Enter your username"
                />
                <br />
                <label className="login-label" htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                    aria-label="Enter your password"
                />
                <br />
                <button type="submit" className="login-button" aria-label="Log in">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
