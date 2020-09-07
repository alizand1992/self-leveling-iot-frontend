import React from 'react';
import Card from 'react-bootstrap/Card';
import NotificationsForm from './NotificationsForm';

class New extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
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
          New Notification
        </Card.Header>
        <Card.Body>
          <NotificationsForm buttonText="Create"
                             name={name}
                             description={description}
                             submit={this.submit}
                             handleChange={this.handleChange} />
        </Card.Body>
      </Card>
    );
  }
}

export default New;
