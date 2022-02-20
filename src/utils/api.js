class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getAllData() {
    return Promise.all([this._getInitialCards(), this._getUserInfo()]);
  }

  _getInitialCards() {
    return fetch(this._url + "/cards", {
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
  _getUserInfo() {
    return fetch(this._url + "/users/me", {
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
  setUserInfoApi(name, about) {
    return fetch(this._url + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  addUserCard(name, link) {
    return fetch(this._url + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  like(_id) {
    return fetch(this._url + `/cards/likes/${_id}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  dislike(_id) {
    return fetch(this._url + `/cards/likes/${_id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  deleteCard(_id) {
    return fetch(this._url + `/cards/${_id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  setUserAvatar(data) {
    return fetch(this._url + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatarLink,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-34",
  headers: {
    authorization: "b28719fd-d662-49f6-9e84-4aff9d6c1f86",
    "Content-Type": "application/json",
  },
});

export default api;
