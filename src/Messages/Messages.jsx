import React, { useRef, useState } from 'react';
import { close, message } from '../utils/Icons';
import { useDispatch, useSelector } from 'react-redux';
import { api, ERROR, MSG, newMessageSocket } from '../redux/actions';
import io from 'socket.io-client';
import { useEffect } from 'react';
import MessagePost from './MessagePost';
const server = io(api, {
  transports: ['polling', 'websocket'],
});
const Messages = () => {
  const messageRef = useRef(null);
  const [msgPost, setMsgPost] = useState('');
  const dispatch = useDispatch();
  const { userDates } = useSelector((state) => state);
  function handleOpenMessage() {
    messageRef.current.classList.toggle('home__aside--message');
  }
  useEffect(() => {
    function newMessage(message) {
      dispatch(newMessageSocket(message));
      setMsgPost('');
    }
    function upNewMessage(message) {
      dispatch({
        type: MSG,
        payload: message,
      });
    }
    server.on('@server/post', newMessage);
    server.on('@server/received', upNewMessage);
  }, []);
  function handleChangeMsg(evt) {
    const { value } = evt.currentTarget;
    setMsgPost(value);
  }
  async function handleSubmitMessage(evt) {
    evt.preventDefault();
    try {
      const newMessage = {
        msgPost,
        id: userDates.user_id,
      };
      server.emit('@client/post', newMessage);
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  }
  return (
    <>
      <div className='home__msg' onClick={handleOpenMessage}>
        {message}
      </div>
      <div className='home__messagees' ref={messageRef}>
        <div className='home__top'>
          <p className='home__p'>
            Admin{' '}
            <span onClick={handleOpenMessage} className='home__span'>
              {close}
            </span>
          </p>
        </div>
        <div className='home__center'>
          {userDates.msgposts
            ?.sort((a, b) => {
              if (a.msgpost_id < b.msgpost_id) {
                return -1;
              }
              if (a.msgpost_id > b.msgpost_id) {
                return 1;
              }
              return 0;
            })
            ?.map((msg) => (
              <MessagePost msg={msg} key={msg.msgpost_id} />
            ))}
        </div>
        <div className='home__bottom'>
          <form className='home__form' onSubmit={handleSubmitMessage}>
            <div className='review__msg'>
              <input
                placeholder='Escribe un mensaje'
                className='review__input'
                type='text'
                name='review_body'
                value={msgPost}
                onChange={handleChangeMsg}
              />

              <button className='review__button' type='submit'>
                <img src='../send.png' alt='' />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Messages;
