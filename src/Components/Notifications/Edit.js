import React from 'react';
import Card from 'react-bootstrap/Card';
import NotificationsForm from './NotificationsForm';
import { withRouter } from 'react-router-dom';

class Edit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name || '',
      description: props.description || '',
    };
  }

  handleChange = (e, field) => {
    this.setState({
      [field]: e.target.value,
    });
  }

  submit = (e) => {
    e.preventDefault();
  }

  render() {
    const { name, description } = this.state;

    return (
      <Card>
        <Card.Header>
          Edit Notification
        </Card.Header>
        <Card.Body>
          <NotificationsForm buttonText="Update"
                             name={name}
                             description={description}
                             submit={this.submit}
                             handleChange={this.handleChange} />
        </Card.Body>
      </Card>
    );
  }
}

export default withRouter(Edit);
