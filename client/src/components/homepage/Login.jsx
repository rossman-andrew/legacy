import React from 'react';


const Login = (props) => (
	<div>
		<h3>Login here:</h3>
		<form  action="/login" method="post">

			<div className="form-entry">
				<label>E-Mail: </label>
				<input className="field" type="text" name="email"/>
			</div>

			<div className="form-entry">
				<label>Password: </label>
				<input className="field" type="password" name="password"/>
			</div>

			<div className="form-entry">
				<Button type="submit" value="Submit">Submit</Button>
			</div>
		</form>
	</div>
)

export default Login;
