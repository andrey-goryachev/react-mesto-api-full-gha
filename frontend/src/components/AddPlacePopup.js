import {useEffect, useState} from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [name, setName] = useState('')
  const [link, setLink] = useState('')

  useEffect(() => {
    setName('')
    setLink('')
  }, [isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddPlace({
      name,
      link
    })
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="card"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Создать"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_content_place"
        onChange={(e) => { setName(e.target.value)}}
        id="card-place"
        name="place"
        type="text"
        value={name}
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__error card-place-error"></span>
      <input
        className="popup__input popup__input_content_link"
        onChange={(e) => { setLink(e.target.value)}}
        id="image"
        name="image"
        type="url"
        value={link}
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__error image-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;