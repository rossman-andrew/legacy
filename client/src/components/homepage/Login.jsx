import React from 'react';
import { Button, Form, Icon, Message } from 'semantic-ui-react';


const Login = (props) => (

  <div>
    <Message
      attached
      header='Login'
    />
    <Form className='attached fluid segment' action="/login" method="post">
      <Form.Input label='E-Mail' name="email" placeholder='email' type='text' />
      <Form.Input label='Password' name="password" type='password' />
      <Button color='blue' value="Submit">Submit</Button>
    </Form>

  </div>
);

export default Login;
