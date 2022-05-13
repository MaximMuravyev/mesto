export default class FormValidator {
  constructor (data, form){
    this._selector = data;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._selector.inputSelector));
  }

  _hideInputError(input, error) {
    input.classList.remove(this._selector.inputErrorClass);
    error.classList.remove(this._selector.errorClass);
  }

  _showInputError(input, error) {
    input.classList.add(this._selector.inputErrorClass);
    error.classList.add(this._selector.errorClass);
    error.textContent = input.validationMessage;
  }

  _haveInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  removeValidation() {
    this._switchButtonState();
    this._inputList.forEach((input) => {
        const error = this._form.querySelector(`.${input.id}-error`);
        this._hideInputError(input, error);
    });
  }

  _switchButtonState() {
    if (this._haveInvalidInput()) {
      this._submitButton.classList.add(this._selector.inactiveButtonClass);
      this._submitButton.setAttribute('type', 'button');
    } else {
      this._submitButton.classList.remove(this._selector.inactiveButtonClass);
      this._submitButton.setAttribute('type', 'submit');
    }
  }

  _checkInputValibity(input) {
    const error = this._form.querySelector(`.${input.id}-error`);
    if (input.validity.valid) {
      this._hideInputError(input, error);
    } else {
      this._showInputError(input, error);
    }
  }

  _setEventListener() {
    this._submitButton = this._form.querySelector(this._selector.submitButtonSelector);
    this._switchButtonState();
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValibity(input);
        this._switchButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListener();
  }
}
