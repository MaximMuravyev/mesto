const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_invalid',
  submitButtonSelector: '.popup__button',
  submitButtonErrorClass: 'popup__button_disable'
}

function enableValidation(validationConfig) {
  const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));
  forms.forEach(function(form) {
    setFormListeners(form, validationConfig);
  });
}

function setFormListeners(form, config) {
  form.addEventListener('submit', handleSubmit);
  form.addEventListener('input', function() {
    setSubmitButtonState(form, config);
  });

  const inputs = Array.from(form.querySelectorAll(config.inputSelector));

  inputs.forEach(function(inputElement) {
    inputElement.addEventListener('input', function() {
      handleFieldValidadion(inputElement, form, config);
    });
  });

  setSubmitButtonState(form, config);
}

function handleSubmit(event) {
  event.preventDefault();
}

function setSubmitButtonState(form, config) {
  const button = form.querySelector(config.submitButtonSelector);
  button.disabled = !form.checkValidity();
  button.classList.toggle(config.submitButtonErrorClass, !form.checkValidity());
}

function handleFieldValidadion(inputElement, form, config) {
  if (!inputElement.validity.valid) {
    showError(inputElement, form, config);
  } else {
    hideError(inputElement, form, config);
  }
}

function showError(inputElement, form, config) {
  const errorElement = form.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function hideError(inputElement, form, config) {
  const errorElement = form.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
}

enableValidation(config);
