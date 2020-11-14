import React from 'react';
import { getTriggersForNotification } from '../../Util/Ajax/Triggers';
import axios from 'axios';
import Loading from '../Common/Loading';
import TriggerForm from './TriggerForm';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      triggers: undefined,
    };
  }

  componentDidMount() {
    this.loadTriggers();
  }

  /* eslint: ignore-unused-vars */
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.needsReload === true) {
      this.loadTriggers();
    }
  }

  loadTriggers = () => {
    if (this.props.notificationId) {
      this.cancelTokens = axios.CancelToken.source();

      getTriggersForNotification(this.props.notificationId, (res) => {
        this.setState({ triggers: res });
        this.props.loadCompleted();
      }, this.cancelTokens);
    }
  }

  componentWillUnmount() {
    if (this.cancelTokens) {
      this.cancelTokens.cancel();
    }
  }

  render() {
    const { notificationId } = this.props;
    const { triggers } = this.state;

    if (!notificationId) {
      return null;
    }

    if (!triggers) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        {triggers.map((trigger) => {
          const { id, aws_column: name, relationship, value } = trigger;

          return <TriggerForm key={id}
                              id={id}
                              name={name}
                              value={value}
                              relationship={relationship}
                              notificationId={notificationId}
                              reloadList={this.props.reloadList} />;
        })}
      </React.Fragment>
    );
  }
}

export default List;
