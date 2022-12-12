import React from 'react';
import MessageAdmin from '../MessageAdmin/MessageAdmin';

const MessageUser = ({ post }) => {
  return (
    <div className='message__messagesposts'>
      <div className='message__postuser'>{post.msgpost_post}</div>
      {post.hasOwnProperty('msgreceiveds')
        ? post?.msgreceiveds
            .sort((a, b) => {
              if (a.msgreceived_id < b.msgreceived_id) {
                return -1;
              }
              if (a.msgreceived_id > b.msgreceived_id) {
                return 1;
              }
              return 0;
            })
            .map((message) => <MessageAdmin message={message} />)
        : null}
    </div>
  );
};

export default MessageUser;
