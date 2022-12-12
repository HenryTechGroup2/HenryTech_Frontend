import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import MessageUser from '../components/MessageUser/MessageUser';
import {
  api,
  CHANGE_USER,
  ERROR,
  MESSAGE_USER,
  USER_ALL_MSG,
} from '../redux/actions';
import io from 'socket.io-client';
const server = io(api);
const MessagesPage = () => {
  const [user, setUser] = useState([]);
  const [messagesUser, setMessagesUser] = useState([]);
  const [msg, setMsg] = useState('');
  const dispatch = useDispatch();
  const { userAllMessages, userMessage } = useSelector((state) => state);
  console.log(userAllMessages, userMessage);
  useEffect(() => {
    const messagesUser = async () => {
      try {
        const { data } = await axios.get(`${api}/api/user/messages`);
        setUser(data);
        setMessagesUser([data[0]]);
        dispatch({ type: USER_ALL_MSG, payload: data });
      } catch (error) {
        dispatch({ type: ERROR, payload: error });
      }
    };
    if (userAllMessages.length === 0) {
      messagesUser();
    }
  }, []);
  // console.log('Renderizado');
  console.log(messagesUser);
  useEffect(() => {
    const upNewMessage = (mesage) => {
      const newUserMessage = messagesUser[0];
      newUserMessage?.msgposts[
        newUserMessage?.msgposts?.length - 1
      ]?.msgreceiveds?.push(mesage);
      console.log(newUserMessage);
      dispatch({ type: MESSAGE_USER, payload: mesage });
      setMessagesUser([newUserMessage]);
      // setMsg('');
      console.log('Renderizado');
      return;
    };

    function newMessage(message) {
      const newMessage = messagesUser[0];
      newMessage?.msgposts.push(message);
      console.log(message);
      console.log(newMessage);
      dispatch({ type: USER_ALL_MSG, payload: message });

      const newMessages = {
        ...message,
        msgreceiveds: [],
      };
      const userExist = user.find(
        ({ user_id }) => user_id === message.userUserId
      );
      userExist?.msgposts.push(newMessages);
      console.log(userExist);
      // setMessagesUser([newMessage]);
      return;
    }
    server.on('@server/received', upNewMessage);
    server.on('@server/post', newMessage);
  }, [messagesUser]);
  const handleClickChangeUserMessage = (index) => {
    setMessagesUser([user[index]]);
    dispatch({ type: CHANGE_USER, payload: userAllMessages[index] });
  };
  const handleSubmitMessage = (evt) => {
    evt.preventDefault();
    const idMessage = [];
    messagesUser[0].msgposts.forEach((msg) => {
      idMessage.push(msg.msgpost_id);
    });
    const newMessage = {
      msgreceived_post: msg,
      id: messagesUser[0].user_id,
      idPost: Math.max(...idMessage),
    };
    server.emit('@client/received', newMessage);
  };
  const handleChangeInput = (evt) => {
    const { value } = evt.currentTarget;
    setMsg(value);
  };
  return (
    <>
      <Header />
      <div className='message'>
        <div className='message__container'>
          <div className='message__div'>
            {userAllMessages?.map((msg, index) => (
              <div
                onClick={() => handleClickChangeUserMessage(index)}
                className='message__name'
              >
                {msg.user_name}
              </div>
            ))}
          </div>
          <div className='message__div'>
            {userMessage?.map((msg) => (
              <div className='message__map'>
                <div className='message__user'>{msg?.user_name}</div>
                <div className='message__post'>
                  {msg?.msgposts
                    .sort((a, b) => {
                      if (a.msgpost_id < b.msgpost_id) {
                        return -1;
                      }
                      if (a.msgpost_id > b.msgpost_id) {
                        return 1;
                      }
                      return 0;
                    })
                    .map((post) => (
                      <MessageUser post={post} />
                    ))}
                </div>
              </div>
            ))}
            <div className='message__input'>
              <form className='home__form' onSubmit={handleSubmitMessage}>
                <div className='review__msg'>
                  <input
                    placeholder='Escribe un mensaje'
                    className='review__input'
                    type='text'
                    name='review_body'
                    value={msg}
                    onChange={handleChangeInput}
                  />

                  <button className='review__button' type='submit'>
                    <img src='../send.png' alt='' />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MessagesPage;
