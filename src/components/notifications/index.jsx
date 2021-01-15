/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Notifications from 'react-notification-system-redux';

const DemoComponent = (props) => {
  const { notifications } = props;

  // Optional styling
  const style = {
    NotificationItem: { // Override the notification item
      DefaultStyle: { // Applied to every notification, regardless of the notification level
        margin: '10px 5px 2px 1px',
      },

      success: { // Applied only to the success notification item
        color: 'green',
      },
      error: {
        color: 'white',
      },
    },
  };

  return (
    <Notifications
      notifications={notifications}
      style={style}
    />
  );
};

DemoComponent.contextTypes = {
  store: PropTypes.object,
};

DemoComponent.propTypes = {
  notifications: PropTypes.array,
};

export default connect(
  (state) => ({ notifications: state.notifications }),
)(DemoComponent);
