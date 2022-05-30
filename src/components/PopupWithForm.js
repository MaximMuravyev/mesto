import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._profileName = document.querySelector(".profile__name");
    this._profileJob = document.querySelector(".profile__job");
    this._form = this._popup.querySelector(".popup__form");
    this.submit = this._popup.querySelector('.popup__button');
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }

  setInputValues(data) {
    this._inputList[0].value = data.name;
    this._inputList[1].value = data.about;
  }

  renderLoading(data) {
    if(data) {
      this.submit.textContent = 'Сохранение...';
    } else {
      this.submit.textContent = 'Сохранить';
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
