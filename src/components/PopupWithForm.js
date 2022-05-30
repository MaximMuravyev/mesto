import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._profileName = document.querySelector(".profile__name");
    this._profileJob = document.querySelector(".profile__job");
    this._form = this._popup.querySelector(".popup__form");
    this._submit = this._popup.querySelector('.popup__button');
  }

  openPopup() {
    super.openPopup();
    this.renderLoading(false);
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }

  setInputValues() {
    this._inputList[0].value = this._profileName.textContent;
    this._inputList[1].value = this._profileJob.textContent;
  }

  renderLoading(data) {
    if(data) {
      this._submit.textContent = 'Сохранение...';
    } else {
      this._submit.textContent = 'Сохранить';
    }
  }

  getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this.getInputValues());
    });
  }
}
