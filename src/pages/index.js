import "./index.css";

import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

import {
  profileEditButton,
  popupEditProfile,
  picEdit,
  picForm,
  placeForm,
  placeAddButton,
} from "../utils/Constants.js";

import { config } from "../utils/ValidateConfig";

const api = new Api({
  url: "https://nomoreparties.co/v1/cohort-41/",
  headers: {
    authorization: "6215e113-b3a7-4765-975a-b13e8216e343",
    "Content-Type": "application/json"
  },
});

const userInfo = new UserInfo({
  name: ".profile__name",
  about: ".profile__job",
  avatar: ".profile__pic",
});

function runMyApp(userData) {

  const nameValidate = new FormValidator(config, popupEditProfile);
  nameValidate.enableValidation();

  const formValidate = new FormValidator(config, placeForm);
  formValidate.enableValidation();

  const picValidate = new FormValidator(config, picForm);
  picValidate.enableValidation();

  const cardList = new Section({
    renderer: (data) => {
      const cardElement = createCard(data);
      cardList.addItem(cardElement);
    },
  },
  ".cards"
  );

  function createCard(data) {
    const card = new Card(
      data,
      "#template",
      handleCardOpen,
      userData,
      {
        handleCardLike: (likeUpdate) => {
          api
            .toggleLike(likeUpdate._id, card.isMyLike())
            .then((newCard) => {
              card.updateData(newCard);
              card.toggleLike(likeUpdate._id, card.isMyLike());
            })
            .catch((error) => console.log(error));
        },
      },

      {
        handleCardDelete: (card) => {
          popupDelete.openPopup(card);
        },
      }
    );

    const cardElement = card.generateCard();

    return cardElement;
  }

  const popupDelete = new PopupWithSubmit(".popup_delete-photo", {
    handleFormSubmit: (card) => {
      api
        .deleteCard(card._id)

        .then(() => {
          card.removeCard();
          popupDelete.closePopup();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });
  popupDelete.setEventListeners();

  Promise.all([
    api.getInitialUser(),
    api.getInitialCards(),
  ])

    .then(([userData, items]) => {
      userInfo.setUserInfo(userData.name, userData.about);
      userInfo.setAvatar(userData.avatar);
      cardList.renderItems(items.reverse());
    })

    .catch((error) => {
      console.log(error);
    });

  const infoForm = new PopupWithForm(".popup_profile_edit", {
    handleFormSubmit: (data) => {
      const userUpdate = api.changeUser(data);
      infoForm.renderLoading(true);

      userUpdate
        .then((data) => {
          infoForm.renderLoading(true);
          userInfo.setUserInfo(data.name, data.about);
        })
        .then(() => {
          infoForm.closePopup();
        })
        .catch((error) => { alert(error);
        })
        .finally(() => {
          infoForm.submit.textContent = 'Сохранить'
        })
    },
  });

  infoForm.setEventListeners();
  profileEditButton.addEventListener("click", () => {
    infoForm.openPopup();
    infoForm.setInputValues(userInfo.getUserInfo());
    nameValidate.clear();
    nameValidate.enableButton();
  });

  const placeAddForm = new PopupWithForm(".popup_card_add", {
    handleFormSubmit: (data) => {
      const newCardApi = api.addCard(data);
      placeAddForm.renderLoading(true);
      newCardApi
        .then((data) => {
          const card = createCard(data);
          cardList.addItem(card);
        })
        .then(() => {
          placeAddForm.closePopup();
          formValidate.toggleButtonState();
        })
        .catch((error) => {
          alert(error);
        })
        .finally(() => {
          placeAddForm.submit.textContent = 'Сохранить'
        })
    },
  });

  placeAddForm.setEventListeners();
  placeAddButton.addEventListener("click", () => {
    placeAddForm.openPopup();
    formValidate.clear();
  });

  const openCard = new PopupWithImage(".popup_card-open");
  openCard.setEventListeners();

  function handleCardOpen(name, link) {
    openCard.openPopup({ link, name });
  }

  const picPopup = new PopupWithForm(".popup_pic_edit", {
    handleFormSubmit: (data) => {
      const picApi = api.changeAvatar(data);
      picPopup.renderLoading(true);

      picApi
        .then((data) => {
          userInfo.setAvatar(data.avatar);
        })
        .then(() => {
          picPopup.closePopup();
          picValidate.toggleButtonState();
        })
        .catch((error) => alert(error));
    },
  });
  picPopup.setEventListeners();

  picEdit.addEventListener("click", () => {
    picPopup.openPopup();
    picValidate.clear();
    picValidate.toggleButtonState();
  });
}

const userApi = api
  .getInitialUser()
  .then((userData) => {
    runMyApp(userData);
  })
  .catch((error) => console.log(`Ошибка: ${error}`));
