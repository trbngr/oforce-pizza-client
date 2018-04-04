import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ToastMessageAnimated } from 'react-toastr';

import { dismissNotification } from '../actions';
import * as selectors from '../store/selectors';
import { withRouter } from 'react-router-dom';

class Toast extends React.Component {
  dismiss = id => () =>
    this.props.actions.dismissNotification(id);

  render() {
    const {notifications: {error, success}} = this.props;

    return (
      <div aria-live="polite" role="alert" id="toast-container" className="toast-bottom-right">
        {error.map(({id, messages}) => (
          <ToastMessageAnimated
            key={id}
            type='error'
            timeOut={5000}
            extendedTimeOut={1000}
            message={messages.map((e, i) => <div key={i}>{e}</div>)}
            onRemove={this.dismiss(id)}
            className="toast"
            // showAnimation="animated slideInDown"
            // hideAnimation="animated slideOutUp"
          />
        ))}
        {success.map(({id, message}) => (
          <ToastMessageAnimated
            key={id}
            type='success'
            timeOut={5000}
            extendedTimeOut={1000}
            message={message}
            onRemove={this.dismiss(id)}
            className="toast"
            // showAnimation="animated slideInDown"
            // hideAnimation="animated slideOutUp"
          />
        ))}
      </div>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      notifications: selectors.notifications(state)
    }),
    dispatch => ({
      actions: bindActionCreators({dismissNotification}, dispatch)
    })
  )(Toast)
);
