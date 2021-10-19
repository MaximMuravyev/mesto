let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close');
let editButton = document.querySelector('.profile__edit-button');
let formButton = document.querySelector('.popup__button');
let form = document.querySelector('.popup__form');
let inputName = document.querySelector('.popup__input_name');
let profileName = document.querySelector('.profile__name');
let inputJob = document.querySelector('.popup__input_job');
let profileJob = document.querySelector('.profile__job');

function openPopup() {
  popup.classList.add('popup_isOpen')
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

function closePopup() {
  popup.classList.remove('popup_isOpen')
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

function clearInputName(event) {
  inputName.value = '';
}

function clearInputJob(event) {
  inputJob.value = '';
}

function submitForm(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup();
}

function popupClickClose(event) {
  if (event.target.classList.contains('popup')) {
    closePopup()
  }
}

inputName.addEventListener('click', clearInputName);
inputJob.addEventListener('click', clearInputJob);
popup.addEventListener('mouseup', popupClickClose);
form.addEventListener('submit', submitForm);
