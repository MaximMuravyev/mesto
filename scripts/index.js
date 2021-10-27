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

const popup = document.querySelector('.popup_profile_edit');
const closeButton = document.querySelector('.popup__close');
const closeButtonAdd = document.querySelector('.popup_close-add');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profiles__add-button');
const formButton = document.querySelector('.popup__button');
const form = document.querySelector('.popup_form-edit');
const inputName = document.querySelector('.popup__input_type_name');
const profileName = document.querySelector('.profile__name');
const inputJob = document.querySelector('.popup__input_type_job');
const profileJob = document.querySelector('.profile__job');
const cards = document.querySelector('.cards');
const templateCard = document.querySelector('.template').content;
const formAdd = document.querySelector('.popup_form-add');
const popupCard = document.querySelector('.popup_card_add');
const popupCardImg = document.querySelector('.popup_card-open');
const inputPlace = document.querySelector('.popup__input_type_place');
const inputLink = document.querySelector('.popup__input_type_link');
const cardPopupImg = document.querySelector('.popup_card-open');
const closeButtonImg = document.querySelector('.popup_close-card');
const openImg = document.querySelector('.popup__open-img');
const openTitle = document.querySelector('.popup__open-title');

initialCards.forEach(appendCard);

function createCard(item) {
  const card = templateCard.querySelector('.card').cloneNode(true);
  card.querySelector('.card__title').innerText = item.name;
  card.querySelector('.card__image').setAttribute('src', item.link);
  card.querySelector('.card__image').setAttribute('alt', item.name);
  card.querySelector('.card__like').addEventListener('mousedown', (event) => {
    event.target.classList.toggle('card_like-on');
  });
  card.querySelector('.card__recycle').addEventListener('mouseup', () => {
    card.remove();
  });
  card.querySelector('.card__image').addEventListener('mouseup', () => {
    cardPopupImg.classList.add('popup_is-open');
    openTitle.innerText = item.name;
    openImg.setAttribute('src', item.link);
    openImg.setAttribute('alt', item.name);
  });

  return card;
}

function enableTransition(element){
  element.classList.remove('popup_transition-disable');
}

window.onload = function() {
  enableTransition(popup);
  enableTransition(popupCard);
  enableTransition(popupCardImg);
}

function appendCard(item) {
  const card = createCard(item);
  cards.prepend(card);
}

function openPopup(element) {
  element.classList.add('popup_is-open')
}

function closePopup(element) {
  element.classList.remove('popup_is-open');
}

function openPopupCard() {
  openPopup(popupCard);
}

function closePopupCard() {
  closePopup(popupCard);
}

function closePopupCardImg() {
  closePopup(cardPopupImg);
}

function openPopupEdit() {
  openPopup(popup);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

function closePopupEdit() {
  closePopup(popup);
}

function popupClickClose(event) {
  if (event.target.classList.contains('popup')) {
    closePopupEdit();
  }
}

function popupClickCloseAdd(event) {
  if (event.target.classList.contains('popup')) {
    closePopupCard();
  }
}

function popupClickCloseImg(event) {
  if (event.target.classList.contains('popup')) {
    closePopupCardImg();
  }
}

function submitForm(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopupEdit();
}

function submitFormAdd(event) {
  event.preventDefault();

  const placeName = inputPlace.value;
  const placeLink = inputLink.value;
  const item = {
    name: placeName,
    link: placeLink
  }
  appendCard(item);
  closePopupCard();
}


editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupCard);
closeButton.addEventListener('click', closePopupEdit);
closeButtonAdd.addEventListener('click', closePopupCard);
closeButtonImg.addEventListener('click', closePopupCardImg);
popup.addEventListener('mouseup', popupClickClose);
popupCard.addEventListener('mouseup', popupClickCloseAdd);
popupCardImg.addEventListener('mouseup', popupClickCloseImg);
form.addEventListener('submit', submitForm);
formAdd.addEventListener('submit', submitFormAdd);

