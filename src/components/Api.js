export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialUser() {
    return fetch(`${this._url}users/me`, {
      method: "GET",
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      method: "GET",
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  addCard(data) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: "DELETE",
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  changeUser(data) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._checkResponse);
  }

  changeAvatar(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._checkResponse);
  }

  toggleLike(id, methodApi) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: methodApi ? "DELETE" : "PUT",
      headers: this._headers
    })
    .then(this._checkResponse);
  }
}
