import React from 'react';
import { Button, Form, Icon, Message } from 'semantic-ui-react'

const Signup = (props) => (
  <div>
    <Message
      attached
      header='Welcome to our site!'
      content='Fill out the form below to sign-up for a new account'
    />
    <Form className='attached fluid segment' action="/signup" method="post">
      <Form.Input label='Name' name="name" placeholder='First Name' type='text' />
      <Form.Input label='E-Mail' name="email" placeholder='email' type='text' />
      <Form.Input label='Password' name="password" type='password' />
      <Form.Checkbox inline label='I agree to the terms and conditions' />
      <Button color='blue' value="Submit">Submit</Button>
    </Form>

  </div>
)

export default Signup;
