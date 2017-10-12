import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

const ProfileCard = (props) => (
  <Card>
    <Image src='https://d1qb2nb5cznatu.cloudfront.net/users/5771195-large?1487914668' />
    <Card.Content>
      <Card.Header>{props.user.name}</Card.Header>
      <Card.Meta>{props.user.email}</Card.Meta>
      <Card.Description>{props.user.name} is a crazy hacker studying at HackReactor.</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        10 Friends
      </a>
    </Card.Content>
  </Card>
)

export default ProfileCard;
