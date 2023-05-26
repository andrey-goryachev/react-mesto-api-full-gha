const apiOptions = {
  urlBase: `https://auth.nomoreparties.co`,
};

class AuthApi {
  constructor(options) {
    this._urlBase = options.urlBase;

    this._urlRegister = `${this._urlBase}/signup`;
    this._urlLogin = `${this._urlBase}/signin`;
    this._urlIsValidToken = `${this._urlBase}/users/me`;
  }

  _requestServer(url, method = 'GET', dataObject) {
    let options;
    if (method === 'GET') {
      options = {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${dataObject.token}`,
        },
      };
    } else {
      options = {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataObject),
      };
    }

    return fetch(url, options).then((res) => {
      if (res.status === 200 || res.status === 201) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка!!! статус ${res.status}`);
      }
    });
  }

  register(userData) {
    return this._requestServer(this._urlRegister, 'POST', userData);
  }

  login(userData) {
    return this._requestServer(this._urlLogin, 'POST', userData);
  }

  isValidToken(data) {
    return this._requestServer(this._urlIsValidToken, 'GET', data);
  }
}

const authApi = new AuthApi(apiOptions);

export default authApi;
