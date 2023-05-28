import React, {useContext, useEffect, useState} from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = useContext(CurrentUserContext)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser, isOpen])

  const handleName = (e) => {
    setName(e.target.value)
  }
  const handleDescription = (e) => {
    setDescription(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_content_name"
        id="profile-name"
        name="name"
        type="text"
        value={name ?? ''}
        onChange={handleName}
        placeholder="Имя"
        aria-label="Заполнить имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="popup__error profile-name-error"></span>
      <input
        className="popup__input popup__input_content_description"
        id="profile-description"
        name="about"
        type="text"
        value={description ?? ''}
        onChange={handleDescription}
        placeholder="О себе"
        aria-label="Заполнить описание"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__error profile-description-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;