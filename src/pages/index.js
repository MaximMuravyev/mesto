import '../pages/index.css';
import Card from '../components/Card';
import Section from '../components/Section';
import FormValidator from '../components/FormValidator';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithImage from '../components/PopupWithImage';
import UserInfo from '../components/UserInfo';
import { setCards } from '../utils/CardList.js';
import { validationConfig } from '../utils/ValidationConfig';
import {
  cards,
  photoCards,
  buttonEdit,
  buttonAdd
} from '../utils/Constants.js';

const allCards = new Section({
  items: setCards,
  renderer: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: (data) => {
        popupWithImage.open(data.link, data.name);
      }
    }, cards)
    allCards.addItem(card.generateCard());
  }
}, photoCards)

allCards.renderItems();

const addImage = new PopupWithForm({
  submitForm: (data) => {
    allCards.renderItem(data)
    addImage.close();
  }
}, '.popup_card_add');

const popupWithImage = new PopupWithImage('.popup_card-open');

const userInfo = new UserInfo({ name: '.profile__name', job: ".profile__job" });

const editProfile = new PopupWithForm({
  popupSelector: '.popup_profile_edit', submitForm: (data) => {
    userInfo.setUserInfo(data);
    editProfile.close();
  }
}, '.popup_profile_edit');

const formValidators = {};
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(validationConfig);

buttonEdit.addEventListener('click', () => {
  editProfile.open();
  editProfile.setInput(userInfo.getUserInfo());
  formValidators['edit-profile'].removeValidation();
});

buttonAdd.addEventListener('click', function () {
  formValidators['add-photo'].removeValidation();
  addImage.open();
});
