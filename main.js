class Main {
  constructor() {
    this._config = new Config();
    this.users = this._config.users;
    this.comments = this._config.comments;
    this.answers = this._config.answers;
  }

  async setUserParams(API) {
    await fetch(API).then((res) =>
      res.json().then((data) => {
        const userObj = {
          first: data.results[0].name.first,
          last: data.results[0].name.last,
          src: data.results[0].picture.thumbnail,
        };
        this.users.push(userObj);
        if (this.users.length > this._config.maxUsers) this.users.pop();
        localStorage.setItem("users", JSON.stringify(this.users));
      })
    );
    return this.users;
  }

  render() {
    this._user = new User({
      firstName: this._config.users[this._config.usersIdx].first,
      lastName: this._config.users[this._config.usersIdx].last,
      src: this._config.users[this._config.usersIdx].src,
      usersIdx: this._config.usersIdx,
      users: this._config.users,
      userTitles: this._config.userTitles,
      config: this._config,
      main: this,
    });
    this._archive = new Archive({
      firstName: this._config.users[this._config.usersIdx].first,
      lastName: this._config.users[this._config.usersIdx].last,
      src: this._config.users[this._config.usersIdx].src,
      usersIdx: this._config.usersIdx,
      users: this._config.users,
      userTitles: this._config.userTitles,
      config: this._config,
      input: this._input,
      date: this._config.date,
      main: this,
    });
    this._answer = new Answer({
      firstName: this._config.users[this._config.usersIdx].first,
      lastName: this._config.users[this._config.usersIdx].last,
      src: this._config.users[this._config.usersIdx].src,
      usersIdx: this._config.usersIdx + 1,
      users: this._config.users,
      userTitles: this._config.userTitles,
      config: this._config,
      date: this._config.date,
      main: this,
    });
    this._utils = new Utils({
      config: this._config,
      linkList: this._config.linksList,
      main: this,
    });
    this._favorites = new Favorites({
      main: this,
    });
    this._rating = new Rating({
      config: this._config,
      main: this,
    });
  }

  renderInput() {
    this._input = new Input({
      config: this._config,
      comments: this._config.comments,
      main: this,
    });
  }

  setNextUser() {
    this._user.setUser();
    this.users.forEach((el, idx) => {
      if (el != null) this._user.setUserName(idx);
    });
  }

  setNextComments() {
    this.comments.forEach((el, idx) => {
      if (el != null) this._archive.setNextUser(idx);
    });
  }

  getCommentsInFavorites() {
    this.onComments = document.querySelectorAll(".comments-header__item-text");
    this.onComments[2].addEventListener("click", (event) => {
      event.currentTarget.classList.toggle(
        "comments-header__item-text--active"
      );
      if (
        event.currentTarget.classList.contains(
          "comments-header__item-text--active"
        )
      ) {
        this.commentsArchiveIsFavorite =
          document.querySelectorAll(".comments__archive");
        for (let element of this.commentsArchiveIsFavorite) {
          if (element.getAttribute("isFavorite") === "false") {
            element.style.display = "none";
          }
        }
        this.commentsAmswerIsFavorite =
          document.querySelectorAll(".comments__answer");
        for (let element of this.commentsAmswerIsFavorite) {
          if (element.getAttribute("isFavorite") === "false") {
            element.style.display = "none";
          }
        }
      } else {
        this.commentsArchiveIsFavorite =
          document.querySelectorAll(".comments__archive");
        for (let element of this.commentsArchiveIsFavorite) {
          element.style.display = "grid";
        }
        this.commentsAmswerIsFavorite =
          document.querySelectorAll(".comments__answer");
        for (let element of this.commentsAmswerIsFavorite) {
          element.style.display = "grid";
        }
      }
    });
  }

  async start() {
    await this.setUserParams(this._config.API);

    this.render();
    this.setNextUser();
    this.renderInput();

    this.setNextComments();
    this._answer.commentAnswer();
    this._answer.setNextAnswers();
    this._utils.increaseCommentCount();
    this._favorites.addToFavoritesArchives();
    this._favorites.addToFavoritesAnswers();
    this.getCommentsInFavorites();
    this._rating.commentsRatingArchive();
    this._rating.commentsRatingAnswer();
    this._utils.sortCommentsByDate();
    this._utils.sortCommentsByNumserOfRating();
    this._input.onFocusTextarea();
  }
}
