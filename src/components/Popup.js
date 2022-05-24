export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._clickEsc = this._clickEsc.bind(this);
    this._clickClose = this._clickClose.bind(this);
  }

  open() {
    this._setEventListeners();
    this._popup.classList.add('popup_is-open');
  }

  close() {
    this._removeEventListeners();
    this._popup.classList.remove('popup_is-open');
  }

  _clickEsc(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _clickClose(evt) {
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  _setEventListeners() {
    document.addEventListener('keydown', this._clickEsc);
    this._popup.addEventListener('mouseup', this._clickClose);
  }

  _removeEventListeners() {
    document.removeEventListener('keydown', this._clickEsc);
    this._popup.removeEventListener('mouseup', this._clickClose);
  }
}
