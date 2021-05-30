import React, {useState} from 'react'
import './LoginForm.css'

const LoginForm = ({ loginUser, goHome }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            email,
            password
        };
        const req = {
            body,
            callback: goHome
        }
        loginUser(req);
        setEmail("");
        setPassword("");
    }

    return (
        <div className="form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <label for="email">Email</label>
                <input type="text" 
                    title="email"
                    value={email}
                    onChange={handleEmail}
                />
                <label for="password">Password</label>
                <input type="password" 
                    title="password"
                    value={password}
                    onChange={handlePassword}
                />
                <button type="submit">Log In</button>
            </form>
        </div>
    );
}

export default LoginForm;