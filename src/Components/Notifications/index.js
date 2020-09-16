import React from 'react';
import Loading from '../Common/Loading';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { getNotifications } from '../../Util/Ajax/Notifications';

class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      notifications: [],
    };
  }

  componentDidMount() {
    getNotifications((notifications) => {
      this.setState({
        loading: false,
        notifications,
      });
    });
  }

  render() {
    const { loading, notifications } = this.state;

    if (loading) {
      return (
        <div style={{ top: '45vh', position: 'relative' }}>
          <Loading message="Your notifications are being loaded..."/>
        </div>
      );
    }

    if (!notifications || notifications.length === 0) {
      return (
        <div>
          There are no notifications to load. You make create a new notification <Link to="/notifications/new">here</Link>.
        </div>
      );
    }

    return (
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
    );
  }
}

export default Notifications;
