import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
	const [credentials, setCredentials] = useState({ name:"",email: "", password: "",confirmpassword:""});
	const [error,setError]=useState(false);
	let navigate = useNavigate();

	const onChange = (e) => {

		setCredentials({ ...credentials, [e.target.name]: e.target.value });
		
	}

	const onSubmit = async (e) => {

		e.preventDefault();
		if(credentials.password===credentials.confirmpassword){
			setError(false);
		}
		else{

			setError(true);
			return;
			
		}
		const response = await fetch("http://localhost:5000/api/auth/createuser", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name:credentials.name, email: credentials.email, password: credentials.password })
		});

		const json = await response.json()
		console.log(json);
		if (json.success) {
			// Save the auth token and redirect
			localStorage.setItem('token', json.authToken);
			navigate("/");

		}
		else {
			alert("Some error occured Please try again");
		}
	}

	return (
		<div>
			<div className='container'>
				<h3 className='my-3'>Sign Up</h3>
				<form className='my-4' onSubmit={onSubmit}>
					<div className="mb-3">
						<label htmlFor="exampleInputEmail1" className="form-label">Name</label>
						<input type="name" className="form-control" id="exampleInputEmail1" name="name" onChange={onChange} value={credentials.name} required/>
					</div>
					<div className="mb-3">
						<label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
						<input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" onChange={onChange} value={credentials.email} required />
					</div>
					<div className="mb-3">
						<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
						<input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={onChange} value={credentials.password} minLength={5} required/>
					</div>
					<div className="mb-3">
						<label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
						<input type="password" className="form-control" id="exampleInputPassword1" name="confirmpassword" onChange={onChange} value={credentials.confirmpassword} minLength={5} required/>
					</div>
					{error && <h6 className='text-danger'>password not matched</h6>}
					<button type="submit" className="btn btn-primary">Submit</button>
				</form>
			</div>
		</div>
	)
}


export default Signup
