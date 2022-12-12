import React from 'react';
import MessageReceived from './MessageReceived';

const MessagePost = ({ msg }) => {
  console.log(msg);
  return (
    <div className='message__messagesposts'>
      <div className='message__postuser msg__postuser'>{msg.msgpost_post}</div>
      {msg.hasOwnProperty('msgreceiveds')
        ? msg?.msgreceiveds
            .sort((a, b) => {
              if (a.msgreceived_id < b.msgreceived_id) {
                return -1;
              }
              if (a.msgreceived_id > b.msgreceived_id) {
                return 1;
              }
              return 0;
            })
            .map((message) => <MessageReceived received={message} />)
        : null}
    </div>
  );
};

export default MessagePost;
