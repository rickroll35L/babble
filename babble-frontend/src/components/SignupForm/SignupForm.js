import React, {useState} from 'react'
import './SignupForm.css'

const SignupForm = ({ createUser, successCallback }) => {

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            alert("Passwords do not match");
        }
        else {
            const body = {
                email,
                password
            };
            const res = await createUser(body);
            if(res){
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                successCallback();
            }
        }
    }

    return (
        <div className="signup-form-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <label for="email">Email</label>
                <input className="signup-input"
                    type="text"
                    title="email"
                    value={email}
                    onChange={handleEmail}
                />
                <label for="password">Password</label>
                <input className="signup-input"
                    type="password"
                    title="password"
                    value={password}
                    onChange={handlePassword}
                />
                <label for="confirm">Confirm password</label>
                <input className="signup-input"
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPassword}
                />
                <button className="signup-button" type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignupForm;