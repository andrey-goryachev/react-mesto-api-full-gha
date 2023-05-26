import {useContext} from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext)
  const isOwner = currentUser._id === card.owner._id
  const isLiked = card.likes.some(like => like._id === currentUser._id)
  const cardLikeButtonClassName = `elements__like button button_opacity_high ${isLiked ? 'elements__like_active' : ''}`
  const handleClick = () => {
    onCardClick(card)
  }

  const handleLike = () => {
    onCardLike(card)
  }

  const handleDeleteClick = () => {
    onCardDelete(card)
  }

  return (
    <>
      <img onClick={handleClick} src={card.link} alt={card.name} className="elements__photo"/>
      <h3 className="elements__title">{card.name}</h3>
      <div className="elements__like-info">
        <button onClick={handleLike} className={cardLikeButtonClassName} type="button"></button>
        <span className="elements__likes-counter">{card.likes.length}</span>
      </div>
      {isOwner &&
        <button
          onClick={handleDeleteClick}
          className="elements__bin elements__bin_active button button_opacity_high"
          type="button"
        ></button>}
    </>
  );
}

export default Card;