import React from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react';

const Comments = () => (
  <Comment.Group>
    <Header as='h3' dividing>Comments</Header>

    <Comment>
      <Comment.Avatar src='https://d1qb2nb5cznatu.cloudfront.net/users/5771195-large?1487914668' />
      <Comment.Content>
        <Comment.Author as='a'>Andrew</Comment.Author>
        <Comment.Metadata>
          <div>Today at 5:42PM</div>
        </Comment.Metadata>
        <Comment.Text>Mango smoothie time?</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>

    <Comment>
      <Comment.Avatar src='https://d1qb2nb5cznatu.cloudfront.net/users/5771195-large?1487914668' />
      <Comment.Content>
        <Comment.Author as='a'>Claire</Comment.Author>
        <Comment.Metadata>
          <div>Yesterday at 12:30AM</div>
        </Comment.Metadata>
        <Comment.Text>
          <p>Do you guys want boba?</p>
        </Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
      <Comment.Group>
        <Comment>
          <Comment.Avatar src='https://d1qb2nb5cznatu.cloudfront.net/users/5771195-large?1487914668' />
          <Comment.Content>
            <Comment.Author as='a'>Masaki</Comment.Author>
            <Comment.Metadata>
              <div>Just now</div>
            </Comment.Metadata>
            <Comment.Text>
              I want Tokyo Express.
            </Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </Comment>

    <Comment>
      <Comment.Avatar src='https://d1qb2nb5cznatu.cloudfront.net/users/5771195-large?1487914668' />
      <Comment.Content>
        <Comment.Author as='a'>Eugene</Comment.Author>
        <Comment.Metadata>
          <div>5 days ago</div>
        </Comment.Metadata>
        <Comment.Text>
          It's time to do recursion!
        </Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>

    <Form reply>
      <Form.TextArea />
      <Button content='Add Reply' labelPosition='left' icon='edit' primary />
    </Form>
  </Comment.Group>
);

export default Comments;