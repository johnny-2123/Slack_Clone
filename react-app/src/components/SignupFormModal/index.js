import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupFormModal.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [first_name, setFirstName] = useState("");
	const [last_name, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
	  e.preventDefault();
	  if (password === confirmPassword) {
		const data = await dispatch(signUp(username, email, password, first_name, last_name));
		if (data) {
		  setErrors(data);
		} else {
		  closeModal();
		}
	  } else {
		setErrors([
		  "Confirm Password field must be the same as the Password field",
		]);
	  }
	};

	return (
	  <div className="signup-form-container">
		<h1 className="signup-form-header">Sign Up</h1>
		<form onSubmit={handleSubmit}>
		  <ul className="form-errors">
			{errors.map((error, idx) => (
			  <li key={idx} className="form-error">{error}</li>
			))}
		  </ul>
		  <div className="suform-input">
		  <label htmlFor="email">Email</label>
			<input
			  type="text"
			  id="email"
			  value={email}
			  onChange={(e) => setEmail(e.target.value)}
			  required
			/>
		  </div>
		  <div className="suform-input">
		  <label htmlFor="username">Username</label>
			<input
			  type="text"
			  value={username}
			  onChange={(e) => setUsername(e.target.value)}
			  required
			/>
		  </div>
		  <div className="suform-input">
		  <label htmlFor="first_name">First Name</label>
			<input
			  type="text"
			  value={first_name}
			  onChange={(e) => setFirstName(e.target.value)}
			  required
			/>
		  </div>
		  <div className="suform-input">
		  <label htmlFor="last_name">Last Name</label>
			<input
			  type="text"
			  value={last_name}
			  onChange={(e) => setLastName(e.target.value)}
			  required
			/>
		  </div>
		  <div className="suform-input">
		  <label htmlFor="password">Password</label>
			<input
			  type="password"
			  value={password}
			  onChange={(e) => setPassword(e.target.value)}
			  required
			/>
		  </div>
		  <div className="suform-input">
		  <label htmlFor="confirmPassword">Confirm Password</label>
			<input
			  type="password"
			  value={confirmPassword}
			  onChange={(e) => setConfirmPassword(e.target.value)}
			  required
			/>
		  </div>
		  <button className="form-button" type="submit">Sign Up</button>
		</form>
	  </div>
	);
  }


export default SignupFormModal;
