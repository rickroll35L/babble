import React, {useState} from 'react'
import './SignupForm.css'

const SignupForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            alert("Passwords do not match");
        }
        else {
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        }
    }

    return (
        <div className="form-container">
            <form className="signup-form" onSubmit={handleSubmit}>
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
                <label for="confirm">Confirm password</label>
                <input type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPassword}
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignupForm;