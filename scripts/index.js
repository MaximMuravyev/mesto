import Card from './Card.js';
import FormValidator from './FormValidator.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popupProfile = document.querySelector('.popup_profile_edit');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profiles__add-button');
const buttonClose = document.querySelectorAll('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__job');
const popupCard = document.querySelector('.popup_card_add');
const popupAddPhoto = popupCard.querySelector('.popup__form_add_place');
const placeInput = popupCard.querySelector('.popup__input_type_place');
const linkInput = popupCard.querySelector('.popup__input_type_link');
const cardPopupImg = document.querySelector('.popup_card-open');
const imgOpen = document.querySelector('.popup__open-img');
const titleOpen = document.querySelector('.popup__open-title');
const cards = document.querySelector('#template').content.querySelector('.card');
const photoCards = document.querySelector('.cards');
const formEdit = popupProfile.querySelector('.popup__form_edit_profile');
const nameEdit = popupProfile.querySelector('.popup__input_type_name');
const statusEdit = popupProfile.querySelector('.popup__input_type_job');
const popups = Array.from(document.querySelectorAll('.popup'));

export {cardPopupImg, imgOpen, titleOpen};

export function openPopup(name) {
  name.classList.add('popup_is-open');
  document.addEventListener('keydown', Esc);
}

function closePopup(name) {
  name.classList.remove('popup_is-open');
  document.removeEventListener('keydown', Esc);
}

buttonClose.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function createCard(item) {
  const cardElement = new Card(item, cards);
  return cardElement.generateCard();
}

function savePopupAddPhoto() {
  const card = createCard({ name: placeInput.value, link: linkInput.value });
  photoCards.prepend(card);
  closePopup(popupCard);
}

function savePopupEditProfile() {
  profileName.textContent = nameEdit.value;
  profileStatus.textContent = statusEdit.value;
  closePopup(popupProfile);
}

function openPopupEditProfile() {
  nameEdit.value = profileName.textContent;
  statusEdit.value = profileStatus.textContent;
  formValidators['edit-profile'].removeValidation();
  openPopup(popupProfile);
}

function Esc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-open');
    closePopup(openedPopup);
  }
}

buttonEdit.addEventListener('click', openPopupEditProfile);
formEdit.addEventListener('submit', savePopupEditProfile);

buttonAdd.addEventListener('click', function () {
  placeInput.value = '';
  linkInput.value = '';
  formValidators['add-photo'].removeValidation();
  openPopup(popupCard);
});

popupAddPhoto.addEventListener('submit', savePopupAddPhoto);
popups.forEach(function (popupElement) {
  popupElement.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup__container') || evt.target.classList.contains('popup')) {
      closePopup(popupElement);
    }
  });
});

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    const validator = new FormValidator(config, form);
    const formName = form.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disable',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__input-error_active'
});

initialCards.forEach(item => {
  const card = createCard(item);
  photoCards.prepend(card);
});
