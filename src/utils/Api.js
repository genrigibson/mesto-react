class Api {
  constructor({ adress, token }) {
    this._adress = adress;
    this._token = token;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(res.status);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${this._adress}/users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then(this._getResponseData);
  }

  getCards() {
    return fetch(`${this._adress}/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then(this._getResponseData);
  }

  editInfo(name, description) {
    return fetch(`${this._adress}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: description,
      }),
    }).then(this._getResponseData);
  }

  uploadCard(cardName, cardLink) {
    return fetch(`${this._adress}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cardName,
        link: cardLink,
      }),
    }).then(this._getResponseData);
  }

  deleteCard(cardId) {
    return fetch(`${this._adress}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(this._getResponseData);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._adress}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: {
          authorization: this._token,
        },
      }).then(this._getResponseData);
    } else {
      return fetch(`${this._adress}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: {
          authorization: this._token,
        },
      }).then(this._getResponseData);
    }
  }

  changeAvatar(link) {
    return fetch(`${this._adress}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._getResponseData);
  }
}

const api = new Api({
  adress: "https://mesto.nomoreparties.co/v1/cohort-34",
  token: "b28719fd-d662-49f6-9e84-4aff9d6c1f86",
});

export default api;
