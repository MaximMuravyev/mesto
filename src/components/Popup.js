export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClickClose = this._handleClickClose.bind(this);
  }

  openPopup() {
    this._popup.classList.add("popup_is-open");
    document.addEventListener("keydown", this._handleEscClose);
  }

  closePopup() {
    this._popup.classList.remove("popup_is-open");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleClickClose(event) {
    if (event.target.classList.contains("popup") || event.target.classList.contains("popup__close")) {
      this.closePopup();
    }
  }

  _handleEscClose(event) {
    if (event.key == "Escape") {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._popup.querySelector(".popup__close").addEventListener("click", () => {
      this.closePopup();
    });
    this._popup.addEventListener("click", this._handleClickClose);
  }
}
