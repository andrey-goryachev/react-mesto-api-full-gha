import { useEffect, useState } from 'react';
import Popup from './Popup';

function ImagePopup({ card, onClose }) {
  const [isOpen, setIsOpen] = useState();
  useEffect(() => {
    card.link ? setIsOpen(true) : setIsOpen(false);
  }, [card.link]);

  return (
    <>
      <Popup
        onClose={onClose}
        isOpen={isOpen}
        name={'photo'}
      >
        <img
          src={card.link}
          alt={card.name}
          className='popup__photo'
        />
        <p className='popup__description'>{card.name}</p>
      </Popup>
    </>
  );
}

export default ImagePopup;
