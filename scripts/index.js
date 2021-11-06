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
const buttonCloseProfile = document.querySelector('.popup__close_edit_profile');
const buttonCloseAdd = document.querySelector('.popup__close_add_place');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profiles__add-button');
const profilePopupForm = document.querySelector('.popup__form_edit_profile');
const nameInput = document.querySelector('.popup__input_type_name');
const profileName = document.querySelector('.profile__name');
const jobInput = document.querySelector('.popup__input_type_job');
const profileJob = document.querySelector('.profile__job');
const cards = document.querySelector('.cards');
const templateCard = document.querySelector('.template').content;
const placeAddForm = document.querySelector('.popup__form_add_place');
const popupCard = document.querySelector('.popup_card_add');
const popupCardImg = document.querySelector('.popup_card-open');
const placeInput = document.querySelector('.popup__input_type_place');
const linkInput = document.querySelector('.popup__input_type_link');
const cardPopupImg = document.querySelector('.popup_card-open');
const buttonCloseImg = document.querySelector('.popup__close_open_card');
const imgOpen = document.querySelector('.popup__open-img');
const titleOpen = document.querySelector('.popup__open-title');
const popups = document.querySelectorAll('.popup');
const buttonSubmitPlace = document.querySelector('.popup__button_place');
const buttonSubmitProfile = document.querySelector('.popup__button_profile');
const inputs = document.querySelectorAll('.popup__input');
const errors = document.querySelectorAll('.popup__error');

initialCards.forEach(appendCard);

function createCard(item) {
  const card = templateCard.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  card.querySelector('.card__title').innerText = item.name;
  cardImage.setAttribute('src', item.link);
  cardImage.setAttribute('alt', item.name);
  card.querySelector('.card__like').addEventListener('mousedown', (event) => {
    event.target.classList.toggle('card_like-on');
  });
  card.querySelector('.card__recycle').addEventListener('mouseup', () => {
    card.remove();
  });
  card.querySelector('.card__image').addEventListener('mouseup', () => {
    cardPopupImg.classList.add('popup_is-open');
    document.addEventListener('keydown', ClosePopupEsc);
    titleOpen.innerText = item.name;
    imgOpen.setAttribute('src', item.link);
    imgOpen.setAttribute('alt', item.name);
  });

  return card;
}

function enableTransition(element){
  element.classList.remove('popup_transition-disable');
}

window.onload = function() {
  enableTransition(popupProfile);
  enableTransition(popupCard);
  enableTransition(popupCardImg);
}

function appendCard(item) {
  const card = createCard(item);
  cards.prepend(card);
}

function openPopup(element) {
  element.classList.add('popup_is-open');
  document.addEventListener('keydown', ClosePopupEsc);
}

function closePopup(element) {
  element.classList.remove('popup_is-open');
  document.removeEventListener('keydown', ClosePopupEsc);
}

function disableButton(element) {
  element.classList.add('popup__button_disable');
}

function openPopupCard() {
  openPopup(popupCard);
  disableButton(buttonSubmitPlace);
  disableInputError(placeInput);
  disableInputError(linkInput);
  buttonSubmitPlace.disabled = true;
  placeInput.value = '';
  linkInput.value = '';
}

function closePopupCard() {
  closePopup(popupCard);
}

function closePopupCardImg() {
  closePopup(cardPopupImg);
}

function enableButton(element) {
  element.classList.remove('popup__button_disable');
}

function openPopupEdit() {
  openPopup(popupProfile);
  disableInputError(nameInput);
  disableInputError(jobInput);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  if (nameInput.value != '' && jobInput.value !='') {
    enableButton(buttonSubmitProfile);
    buttonSubmitProfile.disabled = false;
  }
}

function disableInputError(element) {
  element.classList.remove('popup__input_invalid');
  errors.forEach((item)=> {
    item.textContent = '';
  });
}

function closePopupEdit() {
  closePopup(popupProfile);
}

function popupClickClose(event) {
  if (event.target.classList.contains('popup')) {
    const openedPopup = document.querySelector('.popup_is-open');
    closePopup(openedPopup);
  }
}

function submitProfileForm(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopupEdit();
}

function submitFormAdd(event) {
  event.preventDefault();
  const placeName = placeInput.value;
  const placeLink = linkInput.value;
  const item = {
    name: placeName,
    link: placeLink
  }
  placeInput.value = '';
  linkInput.value = '';
  appendCard(item);
  closePopupCard();
}

function ClosePopupEsc(event){
  if (event.key === "Escape") {
    popups.forEach((item)=> {
      if (item.classList.contains("popup_is-open")) {
        closePopup(item);
      }
    });
  }
}

buttonEdit.addEventListener('click', openPopupEdit);
buttonAdd.addEventListener('click', openPopupCard);
buttonCloseProfile.addEventListener('click', closePopupEdit);
buttonCloseAdd.addEventListener('click', closePopupCard);
buttonCloseImg.addEventListener('click', closePopupCardImg);
profilePopupForm.addEventListener('submit', submitProfileForm);
placeAddForm.addEventListener('submit', submitFormAdd);

popups.forEach((item)=> {
  item.addEventListener('mouseup', popupClickClose);
});

