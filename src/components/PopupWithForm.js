import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ submitForm }, popupSelector) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._submit = this._submit.bind(this);
  }

  setInput(data) {
    this._inputs.forEach(input => {
      input.value = data[input.name];
    });
  }

  _setEventListeners() {
    this._form.addEventListener('submit', this._submit);
    super._setEventListeners();
  }

  _removeEventListeners() {
    this._form.removeEventListener('submit', this._submit);
    super._removeEventListeners();
  }

  _getInput() {
    this._inputValues = {};
    this._inputs.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  _submit() {
    this._submitForm(this._getInput());
  }

  close() {
    this._form.reset()
    super.close();
  }
}
