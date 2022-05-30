export default class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._inputSelector = config.inputSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this.buttonElement = this._form.querySelector(config.submitButtonSelector);
  }

  _showInputError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _setEventListeners() {
    this.toggleButtonState();
    this._inputList.forEach((input) =>
      input.addEventListener("input", this._handlerInput.bind(this, input))
    );
  }

  toggleButtonState() {
    if (this.hasInvalidInput()) {
      this.buttonElement.classList.add(this._inactiveButtonClass);
      this.buttonElement.setAttribute("disabled", false);
    } else {
      this.enableButton();
    }
  }

  enableButton() {
    this.buttonElement.removeAttribute("disabled");
    this.buttonElement.classList.remove(this._inactiveButtonClass);
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    })
  }

  _handlerInput(input) {
    this._checkInputValidity(input);
    this.toggleButtonState();
  }

  clear() {
    this._inputList.forEach((error) => {
      this._hideInputError(error);
    });
  }

  enableValidation() {
    this._setEventListeners();
    this._inputList.forEach((input) => {
      this._checkInputValidity(input);
    });
  }
}
