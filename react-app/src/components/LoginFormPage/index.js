import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
            setErrors(data);
        }
    };

    return (
        <div className="login-page">
            <div className="login-form-container">
                <h1 className="form-title">Log In</h1>
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
                        Password
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-input"
                        />
                    </label>
                    <button type="submit" className="submit-button">
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginFormPage;
