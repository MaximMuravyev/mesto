export default class Card {
  constructor(data, template, handleCardOpen, userData, { handleCardLike }, { handleCardDelete }) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._template = document.querySelector(template);
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._like = this._element.querySelector(".card__like");
    this._recycle = this._element.querySelector(".card__recycle");
    this._number = this._element.querySelector(".card__like-number");
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._myID = userData._id;
    this._handleCardOpen = handleCardOpen;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
    this.setViewRecycleButton();
  }

  generateCard() {
    this._setEventListeners();
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;

    const isMyLike = this._likes.some(
      (likeMaker) => likeMaker._id === this._myID
    );

    this._like.classList.toggle("card_like-on", isMyLike);

    this.setNumberLikes(this._likes.length);
    return this._element;
  }

  setViewRecycleButton() {
    this.isMyCard = this._ownerId === this._myID;
    this._recycle.classList.toggle("card__recycle_hidden", !this.isMyCard);
  }

  _getTemplate() {
    const cardElement = this._template.content
      .querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  toggleLike() {
    this._like.classList.toggle("card_like-on");
    this.setNumberLikes(this._likes.length);
  }

  isMyLike() {
    return this._likes.some((likeMaker) => likeMaker._id === this._myID);
  }

  setNumberLikes(count = this._likes.length) {
    this._number.textContent = count;
  }

  updateData(data) {
    this._likes = data.likes;
    this._number.textContent = data.likes.length;
  }

  toggleLike() {
    this._like.classList.toggle("card_like-on");
  }

  isActive() {
    this._like.contains("card_like-on");
  }

  _setEventListeners() {
    this._recycle.addEventListener("click", () => {
      this._handleCardDelete(this);
    });
    this._like.addEventListener("click", () => {
      this._handleCardLike(this._data);
    });
    this._cardImage.addEventListener("click", () => {
      this._handleCardOpen(this._name, this._link);
    });
  }
}
