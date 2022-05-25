export default class Card {
  constructor({ data, handleCardClick }, cards) {
    this._name = data.name;
    this._link = data.link;
    this._cards = cards;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = this._cards.cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._buttonLike = this._element.querySelector('.card__like');
    this._setEventListener();
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._element.querySelector('.card__title').textContent = this._name;
    return this._element;
  }

  _setEventListener() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });

    this._buttonLike.addEventListener('click', () => {
      this._cardLikeClick();
    });

    this._element.querySelector('.card__recycle').addEventListener('click', () => {
      this._cardDeleteClick();
    });
  }

  _cardDeleteClick() {
    this._element.remove();
  }

  _cardLikeClick() {
    this._buttonLike.classList.toggle('card_like-on');
  }

}