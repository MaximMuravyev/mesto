export default class UserInfo {
  constructor(userInfoSelector) {
    this._userName = document.querySelector(userInfoSelector.name);
    this._userJob = document.querySelector(userInfoSelector.job);
  }

  getUserInfo() {
    const userInfoValue = {
      name: this._userName.textContent,
      job: this._userJob.textContent
    };
    return userInfoValue;
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userJob.textContent = data.job;
  }
}
