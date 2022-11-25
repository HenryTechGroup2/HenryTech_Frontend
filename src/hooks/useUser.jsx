import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useUser = () => {
  const { userDates } = useSelector((state) => state);
  const navigate = useNavigate();
  console.log(userDates);
  useEffect(() => {
    if (userDates.hasOwnProperty('user_email')) {
    } else {
      navigate('/');
    }
  }, []);
  return '';
};

export default useUser;
