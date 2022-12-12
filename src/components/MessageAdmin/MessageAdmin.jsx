import React from 'react';

const MessageAdmin = ({ message }) => {
  return <div className='message__postadmin'>{message.msgreceived_post}</div>;
};

export default MessageAdmin;
