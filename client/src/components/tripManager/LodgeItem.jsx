import _ from 'lodash';
import React from 'react';
import { Card, Icon, Grid, Image } from 'semantic-ui-react';

class LodgeItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid.Column key={4} computer={4}>
        <Card>
	      <Image src={ this.props.data.image_url } />
	      <Card.Content>
	        <Card.Header>
	          { this.props.data.name }
	        </Card.Header>
	        <Card.Meta>
	          <span className='date'>
	            {`${this.props.data.location.city}, ${this.props.data.location.state}`}
   	          </span>
	        </Card.Meta>
	        <Card.Description>
	          { `Rating: ${this.props.rating} stars` }
	        </Card.Description>
	      </Card.Content>
	    </Card>
      </Grid.Column>
  	)
  }
}

export default LodgeItem;