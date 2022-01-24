import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {

	const [credentials, setCredentials] = useState({email:"",password:""});
	let navigate = useNavigate();

	const onChange=(e)=>{

		setCredentials({...credentials,[e.target.name]:e.target.value});
	}

	const onSubmit = async(e) => {
		
		e.preventDefault();
		const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });

        const json = await response.json();
		console.log(json);

        if (json.success){

            // Save the auth token and redirect
            localStorage.setItem('token', json.authToken); 
            navigate("/");
			props.showAlert("Login Successfully","success")

        }
        else{
            props.showAlert("invalid credentials","error")
		}     

		setCredentials({email:"",password:""});
	
	}

	return (
		<div className='container'>
			<h3 className='my-3'>Login</h3>
			<form className='my-4' onSubmit={onSubmit}>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
					<input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" onChange={onChange} value={credentials.email}/>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
					<input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={onChange} value={credentials.password}/>
				</div>
				<button type="submit" className="btn btn-primary">Submit</button>
			</form>
		</div>
	)
}

export default Login
