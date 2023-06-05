import logoPath from '../images/logo.svg';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { useEffect, useState } from 'react';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import authApi from '../utils/authApi';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [successfullyRegister, setSuccessfullyRegister] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({});
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then((res) => {
        if (res.message === 'Пост удалён') {
          setCards((cards) => {
            return cards.filter((c) => c._id !== card._id);
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateUser = (user) => {
    api
      .setProfile(user)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateAvatar = (link) => {
    api
      .updateAvatar(link)
      .then((user) => {
        setCurrentUser({ ...currentUser, avatar: user.avatar });
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleAddPlaceSubmit = (card) => {
    api
      .addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleInfoTooltip = (successfullyBool) => {
    setIsInfoTooltipPopupOpen(true);
    setSuccessfullyRegister(successfullyBool);
  };

  const signIn = (formValue) => {
    authApi
      .login(formValue)
      .then((res) => {
        localStorage.setItem('token', res.token);
        setUserEmail(formValue.email)
        setLoggedIn(true);
        navigate('/', { replace: true });
      })
      .catch((err) => {
        handleInfoTooltip(false);
        return false;
      });
  };

  const signUp = (formValue) => {
    authApi
      .register(formValue)
      .then((res) => {
        handleInfoTooltip(true);
        return true;
      })
      .catch((err) => {
        handleInfoTooltip(false);
        return false;
      });
  };

  useEffect(() => {
    const tokenApp = localStorage.getItem('token');
    if (tokenApp) {
      authApi
        .isValidToken({ token: tokenApp })
        .then((res) => {
          setLoggedIn(true);
          setUserEmail(res.email);
        })
        .catch((err) => {
          console.log(err);
          setLoggedIn(false);
          navigate('/sign-in', { replace: true });
        });
    } else {
      setLoggedIn(false);
      navigate('/sign-in', { replace: true });
    }
  }, []);

  useEffect(() => {
    loggedIn &&
      Promise.all([api.getProfile(), api.getInitialCards()])
        .then((responses) => {
          const profile = responses[0];
          const cards = responses[1];
          setCurrentUser(profile);
          setCards(cards.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page__container'>
        <Header
          logoPath={logoPath}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          userEmail={userEmail}
        />

        <Routes>
          <Route
            path='/sign-up'
            element={<Register signUp={signUp} />}
          />
          <Route
            path='/sign-in'
            element={<Login signIn={signIn} />}
          />
          <Route
            path='/'
            element={
              <ProtectedRoute
                element={Main}
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
                loggedIn={loggedIn}
              />
            }
          />
        </Routes>

        {loggedIn && <Footer />}

        {loggedIn && (
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
        )}

        {loggedIn && (
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
        )}

        {loggedIn && (
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
        )}

        {loggedIn && (
          <PopupWithForm
            title='Вы уверены?'
            name='delete-card'
            buttonText='Да'
          />
        )}

        {loggedIn && (
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
        )}

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          successfully={successfullyRegister}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
