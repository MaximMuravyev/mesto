export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscape = this._handleEscape.bind(this);
    this._handlePopupClick = this._handlePopupClick.bind(this);
  }

  open() {
    this._setEventListeners();
    this._popup.classList.add('popup_is-open');
  }

  close() {
    this._removeEventListeners();
    this._popup.classList.remove('popup_is-open');
  }

  _handleEscape(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handlePopupClick(evt) {
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  _setEventListeners() {
    document.addEventListener('keydown', this._handleEscape);
    this._popup.addEventListener('mouseup', this._handlePopupClick);
  }

  _removeEventListeners() {
    document.removeEventListener('keydown', this._handleEscape);
    this._popup.removeEventListener('mouseup', this._handlePopupClick);
  }
}
