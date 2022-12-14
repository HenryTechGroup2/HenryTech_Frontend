import axios from 'axios';
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
  MESSAGE_USER_POST,
  MSG_RECEIVED_INPUT,
  USER_ALL_MSG,
} from '../redux/actions';
import io from 'socket.io-client';
const server = io(api, {
  transports: ['polling', 'websocket'],
});
const MessagesPage = () => {
  const dispatch = useDispatch();
  const { userAllMessages, userMessage, msgReceivdes } = useSelector(
    (state) => state
  );
  useEffect(() => {
    const messagesUser = async () => {
      try {
        const { data } = await axios.get(`${api}/api/user/messages`);
        dispatch({ type: USER_ALL_MSG, payload: data });
      } catch (error) {
        dispatch({ type: ERROR, payload: error });
      }
    };
    if (userAllMessages.length === 0) {
      messagesUser();
    }
    const upNewMessage = (mesage) => {
      console.log(mesage);
      dispatch({ type: MESSAGE_USER, payload: mesage });
      return;
    };

    function newMessage(message) {
      console.log(message);
      dispatch({ type: MESSAGE_USER_POST, payload: message });
      return;
    }
    server.on('@server/received', upNewMessage);
    server.on('@server/post', newMessage);
  }, []);
  // useEffect(() => {
  // }, [userMessage, userAllMessages]);
  const handleClickChangeUserMessage = (index) => {
    dispatch({ type: CHANGE_USER, payload: userAllMessages[index] });
  };
  const handleSubmitMessage = (evt) => {
    evt.preventDefault();
    if (msgReceivdes.trim() === '') {
      return;
    }
    const idMessage = [];
    userMessage[0].msgposts.forEach((msg) => {
      idMessage.push(msg.msgpost_id);
    });
    const newMessage = {
      msgreceived_post: msgReceivdes,
      id: userAllMessages[0].user_id,
      idPost: Math.max(...idMessage),
    };
    server.emit('@client/received', newMessage);
  };
  const handleChangeInput = (evt) => {
    const { value } = evt.currentTarget;
    dispatch({ type: MSG_RECEIVED_INPUT, payload: value });
  };
  console.log(userAllMessages);
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
                    value={msgReceivdes}
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
