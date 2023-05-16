import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
            setErrors(data);
        } else {
            closeModal();
        }
    };

    return (
        <div className="lfform-container">
            <h1 className="lfform-header">Log In</h1>
            <form onSubmit={handleSubmit}>
                <ul className="lfform-errors">
                    {errors.map((error, idx) => (
                        <li key={idx} className="lfform-error">
                            {error}
                        </li>
                    ))}
                </ul>
                <div className="lfform-input">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="lfform-input">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="lfform-button">
                    Log In
                </button>
            </form>
        </div>
    );
}

export default LoginFormModal;
