import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._img = this._popup.querySelector(".popup__open-img");
    this._title = this._popup.querySelector(".popup__open-title");
  }

  openPopup({ link, name }) {
    this._img.alt = name;
    this._img.src = link;
    this._title.textContent = name;
    super.openPopup();
  }
}
