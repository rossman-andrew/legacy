import _ from 'lodash';
import React from 'react';
import { Card, Icon, Grid, Image, Button } from 'semantic-ui-react';
import LodgePicList from './LodgePicList.jsx';
import $ from 'jquery';


class LodgeItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
    this.handleTitleClick = this.handleTitleClick.bind(this);
  }

  handleTitleClick() {
    this.setState({clicked: !this.state.clicked}, () =>{
      this.props.showPics(this.state.clicked, this.props.data);
    });
  }

  handleLodgeButton() {
    this.props.handleLodgeChoice(this.props.data);
    this.props.lodgePics(this.props.data);
  }

  render() {
    return (
      <div>
        <Grid.Column key={4} computer={4}>
          <Card>
            <Image src={ this.props.data.image_url } />
            <Card.Content>
              <Card.Header onClick={ this.handleTitleClick }>
                { this.props.data.name }
              </Card.Header>
              <Card.Meta>
                <span className='date'>
                  {`${this.props.data.location.city}, ${this.props.data.location.state}`}
                </span>
              </Card.Meta>
              <Card.Description>
                { `Rating: ${this.props.data.rating} stars` }
              </Card.Description>
            </Card.Content>
            <Button attached='bottom' onClick={ () => { this.handleLodgeButton(); } }>Make trip Lodge!</Button>
          </Card>
        </Grid.Column>
      </div>
    );
  }
}

export default LodgeItem;