import { useNavigate } from 'react-router-dom';
import successfullyPath from '../images/successfully.svg';
import unsuccessfullyPath from '../images/unsuccessfully.svg';
import Popup from './Popup';


const InfoTooltip = ({ isOpen, onClose, successfully }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    if (successfully) {
      onClose();
      navigate('/sign-in', { replace: true });
    } else {
      onClose();
    }
  };

  return (
    <>
      <Popup
        isOpen={isOpen}
        onClose={handleClose}
        name={'success'}
      >
        <img
          className='popup__image'
          src={successfully ? successfullyPath : unsuccessfullyPath}
          alt={successfully ? 'Знак успешного ответа от сервера' : 'Знак неуспешного ответа от сервера'}
        />
        <h2 className='popup__title'>
          {successfully ? 'Вы успешно зарегистрировались!' : `Что-то пошло не так! Попробуйте ещё раз.`}
        </h2>
      </Popup>
    </>
  );
};

export default InfoTooltip;
