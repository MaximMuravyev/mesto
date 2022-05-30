import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._cardInfo = {};
  }

  openPopup(card) {
    super.openPopup();
    this._cardInfo = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._cardInfo);
    });
  }
}
