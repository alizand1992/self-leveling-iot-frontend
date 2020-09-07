import React from 'react';
import Loading from '../Common/Loading';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: [
        {
          id: 1,
          name: 'Low Battery',
          description: 'Notify user when the battery is below 20%.'
        },
        {
          id: 2,
          name: 'Very Low Battery',
          description: 'Notify user when the battery is below 5%.'
        },
      ],
    };
  }
  render() {
    const { notifications } = this.state;

    if (notifications.length === 0) {
      return (
        <div style={{ top: '45vh', position: 'relative' }}>
          <Loading message="Your notifications are being loaded..."/>
        </div>
      );
    }

    return (
      <React.Fragment>
        <Table striped={true} bordered={true} hover={true} size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th className="text-center">Delete</th>
              <th className="text-center">Edit</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => {
              const { id, name, description } = notification;

              return (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{description}</td>
                  <td className="text-center">delete</td>
                  <td className="text-center">
                    <Link to={`/notifications/edit/${id}`} >
                      edit
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </React.Fragment>
    );
  }
}

export default Notifications;
