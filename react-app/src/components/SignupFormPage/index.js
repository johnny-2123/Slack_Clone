import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            const data = await dispatch(
                signUp(username, email, password, first_name, last_name)
            );
            if (data) {
                setErrors(data);
            }
        } else {
            setErrors([
                "Confirm Password field must be the same as the Password field",
            ]);
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-form-container">
                <h1 className="suform-title">Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <ul className="error-list">
                        {errors.map((error, idx) => (
                            <li key={idx} className="error">
                                {error}
                            </li>
                        ))}
                    </ul>
                    <label className="form-label">
                        Email
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-input"
                        />
                    </label>
                    <label className="form-label">
                        Username
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="form-input"
                        />
                    </label>
                    <label className="form-label">
                        First Name
                        <input
                            type="text"
                            value={first_name}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            className="form-input"
                        />
                    </label>
                    <label className="form-label">
                        Last Name
                        <input
                            type="text"
                            value={last_name}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            className="form-input"
                        />
                    </label>
                    <label className="form-label">
                        Password
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-input"
                        />
                    </label>
                    <label className="form-label">
                        Confirm Password
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="form-input"
                        />
                    </label>
                    <button className="submit-button" type="submit">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignupFormPage;
