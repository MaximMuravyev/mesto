export default class UserInfo {
  constructor(userInfoSelector) {
    this._name = document.querySelector(userInfoSelector.name);
    this._about = document.querySelector(userInfoSelector.about);
    this._avatar = document.querySelector(userInfoSelector.avatar);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    };
  }

  setUserInfo(name, about) {
    this._name.textContent = name;
    this._about.textContent = about;
  }

  setAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
