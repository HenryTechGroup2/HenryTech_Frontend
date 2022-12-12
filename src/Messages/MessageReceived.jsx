import React from 'react';

const MessageReceived = ({ received }) => {
  return (
    <div className='message__postadmin msg__postadmin'>
      {received.msgreceived_post}
    </div>
  );
};

export default MessageReceived;
