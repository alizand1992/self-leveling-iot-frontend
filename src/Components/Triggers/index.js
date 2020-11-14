import React from 'react';
import List from './List';
import TriggerForm from './TriggerForm';

class Triggers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      needsReload: false,
    };
  }

  reloadList = () => {
    this.setState({ needsReload: true });
  }

  loadCompleted = () => {
    this.setState({ needsReload: false });
  }

  render() {
    const { needsReload } = this.state;
    const { notificationId } = this.props;

    return (
      <React.Fragment>
        <List loadCompleted={this.loadCompleted}
              notificationId={notificationId}
              reloadList={this.reloadList}
              needsReload={needsReload} />
        <TriggerForm notificationId={notificationId} reloadList={this.reloadList} />
      </React.Fragment>
    );
  }
}

export default Triggers;
