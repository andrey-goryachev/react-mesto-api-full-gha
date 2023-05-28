const cohortId = 'cohort-60';
const apiOptions = {
  token: '18e4741a-6c44-4105-91a3-2c8e1e3592b8',
  urlBase: `https://mesto.nomoreparties.co/v1/${cohortId}`,
};

class Api {
  constructor(options) {
    this._token = options.token;
    this._urlBase = options.urlBase;

    this._urlProfile = `${this._urlBase}/users/me`;
    this._urlGetCards = `${this._urlBase}/cards`;
    this._urlAddCard = `${this._urlBase}/cards`;
    this._urlUpdateAvatar = `${this._urlBase}/users/me/avatar`;
  }

  _requestServer(url, method = 'GET', dataObject) {
    let options;
    if (method === 'GET') {
      options = {
        method: method,
        headers: { authorization: this._token },
      };
    } else {
      options = {
        method: method,
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataObject),
      };
    }

    return fetch(url, options).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка!!! статус ${res.status}`);
      }
    });
  }

  getProfile() {
    return this._requestServer(this._urlProfile);
  }

  getInitialCards() {
    return this._requestServer(this._urlGetCards);
  }

  setProfile(userObject) {
    return this._requestServer(this._urlProfile, 'PATCH', userObject);
  }

  addCard(cardObject) {
    return this._requestServer(this._urlAddCard, 'POST', cardObject);
  }

  deleteCard(cardId) {
    this._urlDeleteCard = `${this._urlBase}/cards/${cardId}`;
    return this._requestServer(this._urlDeleteCard, 'DELETE');
  }

  changeLikeCardStatus(cardId, isLiked) {
    this._urlLike = `${this._urlBase}/cards/${cardId}/likes`;
    if (isLiked) {
      return this._requestServer(this._urlLike, 'DELETE');
    } else {
      return this._requestServer(this._urlLike, 'PUT');
    }
  }

  updateAvatar(avatarLink) {
    return this._requestServer(this._urlUpdateAvatar, 'PATCH', { avatar: avatarLink });
  }
}

const api = new Api(apiOptions)

export default api
