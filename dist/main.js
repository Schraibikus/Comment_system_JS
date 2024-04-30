/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/css/reset.css":
/*!***************************!*\
  !*** ./src/css/reset.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/js/classes/answer.js":
/*!**********************************!*\
  !*** ./src/js/classes/answer.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Answer: () => (/* binding */ Answer)
/* harmony export */ });
class Answer {
  constructor({ main, rating }) {
    this.main = main;
    this.rating = rating;
  }

  setUser(idx) {
    this.userNextAnswer = document.createElement("div");
    this.userNextAnswer.classList.add("comments__answer");
    this.userNextAnswer.setAttribute("data-index", idx);
    this.userNextAnswer.setAttribute("isFavorite", false);
    this.userNextAnswer.setAttribute(
      "data-rating",
      `${this.rating.displayRatingAnswer(this.userNextAnswer.dataset.index)}`
    );
    this.userNextAnswer.innerHTML = `
        <img src="${
          this.main.answers[idx].src
        }" alt="user" width="61" height="61"/>
        <p class="comments__answer-title">${this.main.answers[idx].name}</p>
        <p class="comments__answer-date">${this.main.answers[idx].date}</p>
        <p class="comments__answer-text">${this.main.answers[idx].text}</p>
        <p class="comments__answer-text-reply">
          <img src="./src/assets/reply.svg" alt="reply"/>
            <span class="comments__answer-reply">${
              this.main.answers[idx].toWhom
            }
            </span>
        </p>
        <button class="comments__answer-favourites-btn button">
          <img src="./src/assets/heart_empty.svg" alt="heart_empty"/>
          <p>&#160;В избранное</p>
        </button>
        <div class="comments__rating comments__rating-answer">
          <button class="comments__btn-minus button">
            <img src="./src/assets/btn_minus.svg" alt="btn-minus" />
          </button>
            <span class="comments__count">${this.rating.displayRatingAnswer(
              this.userNextAnswer.dataset.index
            )}</span>
          <button class="comments__btn-plus button">
            <img src="./src/assets/btn_plus.svg" alt="btn-plus" />
          </button>
        </div>
      `;
    this.targets = document.querySelectorAll(".comments__archive");
    this.targets.forEach((el) => {
      if (el.dataset.index === this.main.answers[idx].authorIdx) {
        el.after(this.userNextAnswer);
      }
      if (
        this.userNextAnswer.children[6].children[1].textContent &&
        this.userNextAnswer.children[6].children[1].textContent < 0
      ) {
        this.userNextAnswer.children[6].children[1].style.color = "red";
      }
    });
  }

  commentAnswer() {
    this.buttonAnswers = document.querySelectorAll(
      ".comments__archive-answer-btn"
    );

    this.buttonAnswers.forEach((el) => {
      el.addEventListener(
        "click",
        () => {
          this.authorAnswerName = document.querySelector(
            ".comments__answer-title-nav"
          );
          this.authorAnswerImg = document.querySelector(".authorImg");
          this.buttonAnswer = el.parentElement;
          this.toWhomAnswerName = this.buttonAnswer.children[1].textContent;
          this.authorIdx = this.buttonAnswer.dataset.index;
          this.userNavAnswer = document.createElement("form");
          this.userNavAnswer.classList.add("comments__user");
          this.userNavAnswer.setAttribute("id", "answerForm");
          this.userNavAnswer.innerHTML = `
            <img src="${
              this.main.users.at(-1).src
            }" alt="user" width="61" height="61"/>
            <p class="comments__archive-title">${
              this.main.users.at(-1).first
            } ${this.main.users.at(-1).last}</p>
            <textarea
              class="comment__input-form"
              name="comment"
              id="comment"
              rows="1"
              placeholder="Введите текст сообщения..."
            ></textarea>
            <output class="comment__output-form">Макс. 1000 символов</output>
            <p class="comments__output-error">Слишком длинное сообщение</p>
            <button class="comment__input-btn button" type="submit">
              Отправить
            </button>
            <button class="comment__input-btn comment__input-btn-answer button">
              Отменить
            </button>
          `;
          this.buttonAnswer.after(this.userNavAnswer);

          this.commentsFormsElements = this.userNavAnswer.elements;
          this.textarea = this.commentsFormsElements[0];
          this.output = this.commentsFormsElements[1];
          this.buttonSubmit = this.commentsFormsElements[2];
          this.lengthCommentError = document.querySelector(
            ".comments__output-error"
          );
          this.onFocusTextarea();
          this.commentAnswerInput();
          this.buttonAnswerClose();

          this.userNavAnswer.addEventListener("submit", (event) => {
            if (
              this.textarea.value.length === 0 ||
              this.textarea.value.length > 1000
            ) {
              event.preventDefault();
              this.buttonAnswerClose();
              alert("ошибка");
            } else {
              this.answerOdj = {
                text: this.textarea.value,
                date: this.main.formatDate(),
                name: this.authorAnswerName.textContent,
                src: this.authorAnswerImg.src,
                toWhom: this.toWhomAnswerName,
                authorIdx: this.buttonAnswer.dataset.index,
              };
              this.main.answers.push(this.answerOdj);
              localStorage.setItem(
                "answers",
                JSON.stringify(this.main.answers)
              );
              this.setNextAnswers();
              this.buttonAnswerClose();
            }
          });
        },
        { once: true }
      );
    });
  }

  commentAnswerInput() {
    this.textarea.addEventListener("input", () => {
      this.output.textContent = 0 + this.textarea.value.length + "/1000";
      if (this.textarea.value.length > 0) {
        this.buttonSubmitReady();
      } else {
        this.buttonSubmitReady();
      }
      if (this.textarea.value.length > 1000) {
        this.output.style.color = "red";
        this.lengthCommentError.style.display = "block";
        this.buttonSubmitReady();
      } else {
        this.output.style.color = "black";
        this.lengthCommentError.style.display = "none";
      }
      this.textarea.style.height = 0;
      this.textarea.style.height = this.textarea.scrollHeight + "px";
    });
  }

  buttonAnswerClose() {
    this.btnAnswerClose = document.querySelector(".comment__input-btn-answer");
    this.btnAnswerClose.addEventListener("click", (event) => {
      event.preventDefault();
      this.userNavAnswer.remove();
    });
  }

  onFocusTextarea() {
    for (let element of this.commentsFormsElements) {
      if (element.type != "checkbox" && element.type != "submit") {
        element.addEventListener("focus", function () {
          element.style.backgroundColor = "lightyellow";
        });
        element.addEventListener("blur", function () {
          element.style.backgroundColor = "white";
        });
      }
    }
  }

  buttonSubmitReady() {
    if (this.textarea.value.length > 0 && this.textarea.value.length < 1000) {
      this.buttonSubmit.classList.add("comment__input-btn--ready");
    } else {
      this.buttonSubmit.classList.remove("comment__input-btn--ready");
    }
  }

  setNextAnswers() {
    this.main.answers.forEach((el, idx) => {
      if (el != null) {
        this.setUser(idx);
      }
    });
  }
}




/***/ }),

/***/ "./src/js/classes/archive.js":
/*!***********************************!*\
  !*** ./src/js/classes/archive.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Archive: () => (/* binding */ Archive)
/* harmony export */ });
// import { Rating } from "./rating.js";
class Archive {
  constructor({ main, rating }) {
    this.main = main;
    this.rating = rating;

    this.userComment = document.querySelector(".comments__user");
  }

  setNextUser(idx) {
    this.userNextComment = document.createElement("div");
    this.userNextComment.classList.add("comments__archive");
    this.userNextComment.setAttribute("data-index", idx);
    this.userNextComment.setAttribute("isFavorite", false);
    this.userNextComment.setAttribute(
      "data-rating",
      `${this.rating.displayRatingArchive(this.userNextComment.dataset.index)}`
    );
    this.userNextComment.innerHTML = `
    <img src="${this.main.users[idx].src}" alt="user" width="61" height="61"/>
    <p class="comments__answer-title">${this.main.users[idx].first} ${
      this.main.users[idx].last
    }</p>
      <p class="comments__archive-date">${this.main.comments[idx].date}</p>
      <p class="comments__archive-text">${this.main.comments[idx].text}   
      </p>
      <button class="comments__archive-answer-btn button">
        <img src="./src/assets/reply.svg" alt="reply" />&#160;Ответить
      </button>
      <button class="comments__archive-favourites-btn button">
        <img
          src="./src/assets/heart_empty.svg"
          alt="heart_empty"
        />
        <p>&#160;В избранное</p>
      </button>
      <div class="comments__rating comments__rating-archive">
        <button class="comments__btn-minus button">
          <img src="./src/assets/btn_minus.svg" alt="btn-minus" />
        </button>
        <span class="comments__count">${this.rating.displayRatingArchive(
          this.userNextComment.dataset.index
        )}</span>
        <button class="comments__btn-plus button">
          <img src="./src/assets/btn_plus.svg" alt="btn-plus" />
        </button>
      </div>
    `;
    this.userComment.after(this.userNextComment);
    if (
      this.userNextComment.children[6].children[1].textContent &&
      this.userNextComment.children[6].children[1].textContent < 0
    ) {
      this.userNextComment.children[6].children[1].style.color = "red";
    }
  }
}



/***/ }),

/***/ "./src/js/classes/favourites.js":
/*!**************************************!*\
  !*** ./src/js/classes/favourites.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Favorites: () => (/* binding */ Favorites)
/* harmony export */ });
class Favorites {
  constructor() {}
  addToFavoritesArchives() {
    this.buttonsArchiveFavoritesArchives = document.querySelectorAll(
      ".comments__archive-favourites-btn"
    );
    this.buttonsArchiveFavoritesArchives.forEach((el) => {
      el.addEventListener("click", (event) => {
        event.currentTarget.classList.toggle(
          "comments__archive-favourites-btn--active"
        );
        if (
          event.currentTarget.classList.contains(
            "comments__archive-favourites-btn--active"
          )
        ) {
          this.addToFavoritesContentBefore(event);
        } else {
          this.addToFavoritesContentAfter(event);
        }
      });
    });
  }

  addToFavoritesAnswers() {
    this.buttonsArchiveFavoritesAnswers = document.querySelectorAll(
      ".comments__answer-favourites-btn"
    );
    this.buttonsArchiveFavoritesAnswers.forEach((el) => {
      el.addEventListener("click", (event) => {
        event.currentTarget.classList.toggle(
          "comments__answer-favourites-btn--active"
        );
        if (
          event.currentTarget.classList.contains(
            "comments__answer-favourites-btn--active"
          )
        ) {
          this.addToFavoritesContentBefore(event);
        } else {
          this.addToFavoritesContentAfter(event);
        }
      });
    });
  }
  addToFavoritesContentBefore(event) {
    event.currentTarget.children[0].src = "./src/assets/heart_full.svg";
    event.currentTarget.children[0].alt = "heart_full";
    event.currentTarget.children[0].width = "24";
    event.currentTarget.children[0].height = "24";
    event.currentTarget.children[1].textContent = "\u00A0В избранном";
    event.currentTarget.children[1].style.color = "#000";
    event.currentTarget.parentElement.setAttribute("isFavorite", true);
  }
  addToFavoritesContentAfter(event) {
    event.currentTarget.children[0].src = "./src/assets/heart_empty.svg";
    event.currentTarget.children[0].alt = "heart_empty";
    event.currentTarget.children[0].width = "24";
    event.currentTarget.children[0].height = "24";
    event.currentTarget.children[1].textContent = "\u00A0В избранное";
    event.currentTarget.children[1].style.color = "#a1a1a1";
    event.currentTarget.parentElement.setAttribute("isFavorite", false);
  }
}



/***/ }),

/***/ "./src/js/classes/input.js":
/*!*********************************!*\
  !*** ./src/js/classes/input.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Input: () => (/* binding */ Input)
/* harmony export */ });
class Input {
  constructor({ main }) {
    this.main = main;

    this.forms = document.forms;
    this.commentsForms = this.forms[0];
    this.commentsFormsElements = this.commentsForms.elements;
    this.textarea = this.commentsFormsElements[0];
    this.output = this.commentsFormsElements[1];
    this.buttonSubmit = this.commentsFormsElements[2];
    this.lengthCommentError = document.querySelector(".comments__output-error");

    this.textarea.addEventListener("input", () => {
      this.output.textContent = 0 + this.textarea.value.length + "/1000";
      if (this.textarea.value.length > 0) {
        this.buttonSubmitReady();
      } else {
        this.buttonSubmitReady();
      }
      if (this.textarea.value.length > 1000) {
        this.output.style.color = "red";
        this.lengthCommentError.style.display = "block";
        this.buttonSubmitReady();
      } else {
        this.output.style.color = "black";
        this.lengthCommentError.style.display = "none";
      }
      this.textarea.style.height = 0;
      this.textarea.style.height = this.textarea.scrollHeight + "px";
    });

    this.commentsForms.addEventListener("submit", (event) => {
      if (
        this.textarea.value.length === 0 ||
        this.textarea.value.length > 1000
      ) {
        event.preventDefault();
      } else {
        this.commentObj = {
          text: this.textarea.value,
          date: this.main.formatDate(),
        };
        this.main.comments.push(this.commentObj);
        localStorage.setItem("comments", JSON.stringify(this.main.comments));
      }
    });
  }

  buttonSubmitReady() {
    if (this.textarea.value.length > 0 && this.textarea.value.length < 1000) {
      this.buttonSubmit.classList.add("comment__input-btn--ready");
    } else {
      this.buttonSubmit.classList.remove("comment__input-btn--ready");
    }
  }

  onFocusTextarea() {
    for (let element of this.commentsFormsElements) {
      if (element.type != "checkbox" && element.type != "submit") {
        element.addEventListener("focus", function () {
          element.style.backgroundColor = "lightyellow";
        });
        element.addEventListener("blur", function () {
          element.style.backgroundColor = "white";
        });
      }
    }
  }
}



/***/ }),

/***/ "./src/js/classes/rating.js":
/*!**********************************!*\
  !*** ./src/js/classes/rating.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Rating: () => (/* binding */ Rating)
/* harmony export */ });
class Rating {
  constructor({ main }) {
    this.main = main;
  }
  commentsRatingArchive() {
    this.ratingBlocks = document.querySelectorAll(".comments__rating-archive");

    for (let block of this.ratingBlocks) {
      block.children[0].addEventListener(
        "click",
        (event) => {
          let count = 0;
          let target = event.currentTarget;
          let targetIndexArchive =
            target.closest(".comments__archive").dataset.index;
          if (target) count--;
          target.parentElement.parentElement.dataset.rating = count;
          this.rememberRatingArchive(event);
          target.parentElement.children[1].textContent =
            this.displayArchive(targetIndexArchive);
          if (target.parentElement.children[1].textContent < 0) {
            target.parentElement.children[1].style.color = "red";
          } else {
            target.parentElement.children[1].style.color = "#8ac540";
          }
        },
        { once: true }
      );
      block.children[2].addEventListener(
        "click",
        (event) => {
          let count = 0;
          let target = event.currentTarget;
          let targetIndexArchive =
            target.closest(".comments__archive").dataset.index;
          if (target) count++;
          target.parentElement.parentElement.dataset.rating = count;
          this.rememberRatingArchive(event);
          target.parentElement.children[1].textContent =
            this.displayArchive(targetIndexArchive);
          if (target.parentElement.children[1].textContent < 0) {
            target.parentElement.children[1].style.color = "red";
          } else {
            target.parentElement.children[1].style.color = "#8ac540";
          }
        },
        { once: true }
      );
    }
  }

  commentsRatingAnswer() {
    this.ratingBlocksAnswer = document.querySelectorAll(
      ".comments__rating-answer"
    );

    for (let block of this.ratingBlocksAnswer) {
      block.children[0].addEventListener(
        "click",
        (event) => {
          let count = 0;
          let target = event.currentTarget;
          let targetIndexAnswer =
            target.closest(".comments__answer").dataset.index;
          if (target) count--;
          target.parentElement.parentElement.dataset.rating = count;
          this.rememberRatingAnswer(event);
          target.parentElement.children[1].textContent =
            this.displayAnswer(targetIndexAnswer);
          if (target.parentElement.children[1].textContent < 0) {
            target.parentElement.children[1].style.color = "red";
          } else {
            target.parentElement.children[1].style.color = "#8ac540";
          }
        },
        { once: true }
      );
      block.children[2].addEventListener(
        "click",
        (event) => {
          let count = 0;
          let target = event.currentTarget;
          let targetIndexAnswer =
            target.closest(".comments__answer").dataset.index;
          if (target) count++;
          target.parentElement.parentElement.dataset.rating = count;
          this.rememberRatingAnswer(event);
          target.parentElement.children[1].textContent =
            this.displayAnswer(targetIndexAnswer);
          if (target.parentElement.children[1].textContent < 0) {
            target.parentElement.children[1].style.color = "red";
          } else {
            target.parentElement.children[1].style.color = "#8ac540";
          }
        },
        { once: true }
      );
    }
  }

  rememberRatingArchive(event) {
    let target = event.currentTarget;
    const ratingObj = {
      value: Number(target.parentElement.parentElement.dataset.rating),
      whose: Number(target.parentElement.parentElement.dataset.index),
    };
    this.main.ratings.push(ratingObj);
    localStorage.setItem("ratings", JSON.stringify(this.main.ratings));
  }

  rememberRatingAnswer(event) {
    let target = event.currentTarget;
    const ratingAnswerObj = {
      value: Number(target.parentElement.parentElement.dataset.rating),
      whose: Number(target.parentElement.parentElement.dataset.index),
    };
    this.main.answerRatings.push(ratingAnswerObj);
    localStorage.setItem(
      "answerRatings",
      JSON.stringify(this.main.answerRatings)
    );
  }

  displayRatingArchive(elem) {
    let arr = this.main.ratings;
    let result = Object.fromEntries(arr.map((item) => [item.whose, 0]));
    arr.forEach((item) => {
      result[item.whose] += item.value;
    });
    if (result[elem] === undefined) {
      return 0;
    } else {
      return result[elem];
    }
  }
  displayRatingAnswer(elem) {
    let arr = this.main.answerRatings;
    let result = Object.fromEntries(arr.map((item) => [item.whose, 0]));
    arr.forEach((item) => {
      result[item.whose] += item.value;
    });
    if (result[elem] === undefined) {
      return 0;
    } else {
      return result[elem];
    }
  }
  displayArchive(path) {
    let arr = this.main.ratings;
    let result = Object.fromEntries(arr.map((item) => [item.whose, 0]));
    arr.forEach((item) => {
      result[item.whose] += item.value;
    });
    return result[path];
  }
  displayAnswer(path) {
    let arr = this.main.answerRatings;
    let result = Object.fromEntries(arr.map((item) => [item.whose, 0]));
    arr.forEach((item) => {
      result[item.whose] += item.value;
    });
    return result[path];
  }
}




/***/ }),

/***/ "./src/js/classes/user.js":
/*!********************************!*\
  !*** ./src/js/classes/user.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   User: () => (/* binding */ User)
/* harmony export */ });
class User {
  constructor({ main }) {
    this.main = main;

    this.commentsHeader = document.querySelector(".comments-header");
    this.userComment = document.querySelector(".comments__user");
  }

  setUser() {
    this.userComment = document.createElement("form");
    this.userComment.classList.add("comments__user");
    this.userComment.innerHTML = `  
    <img class="authorImg" src="${
      this.main.users.at(-1).src
    }" alt="user" width="61" height="61"/>
    <p class="comments__answer-title-nav">${this.main.users.at(-1).first} ${
      this.main.users.at(-1).last
    }</p>
        <textarea
          class="comment__input-form"
          name="comment"          
          rows="1"
          placeholder="Введите текст сообщения..."
        ></textarea>
        <output class="comment__output-form">Макс. 1000 символов</output>
        <p class="comments__output-error">Слишком длинное сообщение</p>
        <button class="comment__input-btn button" type="submit">
          Отправить
        </button>
      `;
    this.commentsHeader.after(this.userComment);
  }
  setUserName(idx) {
    this.userImg = document.createElement("img");
    this.userImg.src = `${this.main.users[idx].src}`;
    this.userImg.alt = "user";
    this.userImg.width = 61;
    this.userImg.height = 61;
    this.userName = document.createElement("p");
    this.userName.classList.add("comments__archive-title");
    this.userName.textContent = `${this.main.users[idx].first} ${this.main.users[idx].last}`;

    this.userComment.prepend(this.userImg);
    this.userImg.remove();

    this.userComment.prepend(this.userName);
    this.userName.remove();
  }
}




/***/ }),

/***/ "./src/js/classes/utils.js":
/*!*********************************!*\
  !*** ./src/js/classes/utils.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Utils: () => (/* binding */ Utils)
/* harmony export */ });
class Utils {
  constructor({ main }) {
    this.main = main;

    this.links = document.querySelectorAll(".dropdown__link");
  }

  dropdownMenu() {
    this.onComments = document.querySelectorAll(".comments-header__item-text");
    this.dropdownImg = document.querySelector(".dropdown-arrow");
    this.dropdownNav = document.querySelector(".comments-header__dropdown-nav");

    this.onComments[1].addEventListener("click", () => {
      this.onComments[1].classList.toggle("comments-header__item-text--active");
      this.dropdownContent = this.dropdownNav.nextElementSibling;
      if (this.dropdownContent.style.display === "block") {
        this.dropdownContent.style.display = "none";
      } else {
        this.dropdownContent.style.display = "block";
      }
      if (this.dropdownImg.classList.contains("comments-header--active")) {
        this.dropdownImg.classList.remove("comments-header--active");
      } else {
        this.dropdownImg.classList.add("comments-header--active");
      }
    });
  }

  increaseCommentCount() {
    this.commentCount = document.querySelector(".comments-count");
    this.commentCount.innerHTML = `
    &#40;${this.main.comments.length + this.main.answers.length}&#41;
    `;
  }

  sortCommentsByDate() {
    this.noSortedByNumserOfDate = document.querySelectorAll('[class*="-date"]');

    this.byDateButtonsList = document.querySelector(".byDate");
    this.buttonOnAllComents = document.querySelector(
      ".comments-header__item-text"
    );
    let buttonDown = this.byDateButtonsList.children[0];
    let buttonUp = this.byDateButtonsList.children[1];
    buttonDown.addEventListener("click", () => {
      this.displaySortByDate();
      this.displayNoneNoSortedItems();
    }),
      { once: true };
    buttonUp.addEventListener("click", () => {
      this.displaySortByDateReverse();
      this.displayNoneNoSortedItems();
    }),
      { once: true };
    this.buttonOnAllComents.addEventListener("click", () => {
      this.displayOnNoSortedItems();
    }),
      { once: true };
  }

  sortCommentsByNumserOfRating() {
    this.noSortedByNumserOfRating =
      document.querySelectorAll(".comments__count");

    for (let rating of this.noSortedByNumserOfRating) {
      const itemSort = {
        src: rating.parentElement.parentElement.children[0].src,
        name: rating.parentElement.parentElement.children[1].textContent,
        date: rating.parentElement.parentElement.children[2].textContent,
        text: rating.parentElement.parentElement.children[3].textContent,
        nameReply: rating.parentElement.parentElement.children[4].textContent,
        rating: Number(rating.textContent),
        whoseAr: rating.parentElement.parentElement.dataset.index,
      };
      this.main.itemsSort.push(itemSort);
      if (
        this.main.itemsSort.length >
        this.main.comments.length + this.main.answers.length
      )
        this.main.itemsSort.shift();
      localStorage.setItem("itemsSort", JSON.stringify(this.main.itemsSort));
    }

    this.byRatingButtonsList = document.querySelector(".byNumserOfRating");
    this.buttonOnAllComents = document.querySelector(
      ".comments-header__item-text"
    );
    let buttonDown = this.byRatingButtonsList.children[0];
    let buttonUp = this.byRatingButtonsList.children[1];
    buttonDown.addEventListener("click", () => {
      this.displaySortByRating();
      this.displayNoneNoSortedItems();
    }),
      { once: true };
    buttonUp.addEventListener("click", () => {
      this.displaySortByRatingReverse();
      this.displayNoneNoSortedItems();
    }),
      { once: true };
    this.buttonOnAllComents.addEventListener("click", () => {
      this.displayOnNoSortedItems();
    }),
      { once: true };
  }

  displaySortByRating() {
    this.main.itemsSort.sort((a, b) => (a.rating > b.rating ? 1 : -1));
    this.setUsersSort();
  }

  displaySortByDate() {
    this.main.itemsSort.sort((a, b) => (a.date > b.date ? 1 : -1));
    this.setUsersSort();
  }

  displaySortByRatingReverse() {
    this.main.itemsSort.sort((a, b) => (a.rating < b.rating ? 1 : -1));
    this.setUsersSort();
  }
  displaySortByDateReverse() {
    this.main.itemsSort.sort((a, b) => (a.date < b.date ? 1 : -1));
    this.setUsersSort();
  }

  displayNoneNoSortedItems() {
    this.noSortedItems = document.querySelector(".comments__container");
    this.noSortedItems.style.display = "none";
    this.buttonOnAllComents.style.backgroundColor = "red";
  }

  displayOnNoSortedItems() {
    this.noSortedItems.style.display = "block";
    this.buttonOnAllComents.style.backgroundColor = "transparent";
    window.location.reload();
    this.setUsersSortClearDisplay();
  }

  setUsersSort() {
    this.main.itemsSort.forEach((el, idx) => {
      if (el != null) this.setNextUserSort(idx);
    });
  }

  setNextUserSort(idx) {
    this.userSortNextContainer = document.querySelector(".comments__content");
    this.userSortNext = document.createElement("div");
    this.userSortNext.classList.add("comments__sorted");
    this.userSortNext.innerHTML = `
    <img src="${this.main.itemsSort[idx].src}" alt="user" width="61" height="61"/>
    <p class="comments__answer-title">${this.main.itemsSort[idx].name}</p>
      <p class="comments__archive-date">${this.main.itemsSort[idx].date}</p>
      <p class="comments__archive-text">${this.main.itemsSort[idx].text}   
      </p>
      <div class="comments__rating comments__rating-archive">
          <img src="./src/assets/btn_minus.svg" alt="btn-minus" />
        <span class="comments__count">${this.main.itemsSort[idx].rating}</span>
        <img src="./src/assets/btn_plus.svg" alt="btn-plus" />
      </div>
    `;
    this.userSortNextContainer.after(this.userSortNext);
  }

  setUsersSortClearDisplay() {
    this.userSortNextItems = document.querySelectorAll(".comments__sorted");
    this.userSortNextItems.innerHTML = "";
  }

  sortCommentsByRelevance() {
    this.links[2].addEventListener("click", () => {
      alert("идет сортировка.......");
      setTimeout(() => {
        alert("Ой, данная фича ещё в разработке)))");
        window.location.reload();
      }, 1000);
    });
  }

  sortCommentsByNumberOfResponses() {
    this.links[3].addEventListener("click", () => {
      alert("идет сортировка.......");
      setTimeout(() => {
        alert("Ой, эта фича тоже ещё в разработке)))");
        window.location.reload();
      }, 1000);
    });
  }
}



/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Main: () => (/* binding */ Main)
/* harmony export */ });
/* harmony import */ var _classes_rating_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/rating.js */ "./src/js/classes/rating.js");
/* harmony import */ var _classes_user_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/user.js */ "./src/js/classes/user.js");
/* harmony import */ var _classes_archive_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classes/archive.js */ "./src/js/classes/archive.js");
/* harmony import */ var _classes_answer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./classes/answer.js */ "./src/js/classes/answer.js");
/* harmony import */ var _classes_utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./classes/utils.js */ "./src/js/classes/utils.js");
/* harmony import */ var _classes_favourites_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./classes/favourites.js */ "./src/js/classes/favourites.js");
/* harmony import */ var _classes_input_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./classes/input.js */ "./src/js/classes/input.js");








class Main {
  API = "https://randomuser.me/api/";
  users = JSON.parse(localStorage.getItem("users")) || [];
  comments = JSON.parse(localStorage.getItem("comments")) || [];
  answers = JSON.parse(localStorage.getItem("answers")) || [];
  ratings = JSON.parse(localStorage.getItem("ratings")) || [];
  answerRatings = JSON.parse(localStorage.getItem("answerRatings")) || [];
  itemsSort = JSON.parse(localStorage.getItem("itemsSort")) || [];
  usersIdx = 0;
  maxUsers = 20;
  userTitles = [
    "comments__user-title",
    "comments__archive-title",
    "comments__answer-title",
  ];

  async setUserParams(API) {
    await fetch(API).then((res) =>
      res.json().then((data) => {
        const userObj = {
          first: data.results[0].name.first,
          last: data.results[0].name.last,
          src: data.results[0].picture.thumbnail,
        };
        this.users.push(userObj);
        if (this.users.length > this.maxUsers) this.users.pop();
        localStorage.setItem("users", JSON.stringify(this.users));
      })
    );
    return this.users;
  }

  formatDate() {
    let dayOfMonth = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();

    month = month < 10 ? "0" + month : month;
    dayOfMonth = dayOfMonth < 10 ? "0" + dayOfMonth : dayOfMonth;
    hour = hour < 10 ? "0" + hour : hour;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return `${dayOfMonth}.${month} ${hour}:${minutes}`;
  }

  render() {
    this.rating = new _classes_rating_js__WEBPACK_IMPORTED_MODULE_0__.Rating({
      main: this,
    });
    this.user = new _classes_user_js__WEBPACK_IMPORTED_MODULE_1__.User({
      main: this,
    });
    this.archive = new _classes_archive_js__WEBPACK_IMPORTED_MODULE_2__.Archive({
      rating: this.rating,
      main: this,
    });
    this.answer = new _classes_answer_js__WEBPACK_IMPORTED_MODULE_3__.Answer({
      rating: this.rating,
      main: this,
    });
    this.utils = new _classes_utils_js__WEBPACK_IMPORTED_MODULE_4__.Utils({
      main: this,
    });
    this.favorites = new _classes_favourites_js__WEBPACK_IMPORTED_MODULE_5__.Favorites({
      main: this,
    });
  }

  renderInput() {
    this.input = new _classes_input_js__WEBPACK_IMPORTED_MODULE_6__.Input({
      main: this,
    });
  }

  setNextUser() {
    this.user.setUser();
    this.users.forEach((el, idx) => {
      if (el != null) this.user.setUserName(idx);
    });
  }

  setNextComments() {
    this.comments.forEach((el, idx) => {
      if (el != null) this.archive.setNextUser(idx);
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
    await this.setUserParams(this.API);

    this.render();
    this.setNextUser();
    this.renderInput();

    this.setNextComments();
    this.answer.commentAnswer();
    this.answer.setNextAnswers();
    this.utils.increaseCommentCount();
    this.favorites.addToFavoritesArchives();
    this.favorites.addToFavoritesAnswers();
    this.getCommentsInFavorites();
    this.rating.commentsRatingArchive();
    this.rating.commentsRatingAnswer();
    this.utils.sortCommentsByDate();
    this.utils.sortCommentsByNumserOfRating();
    this.input.onFocusTextarea();
    this.utils.sortCommentsByRelevance();
    this.utils.dropdownMenu();
    this.utils.sortCommentsByNumberOfResponses();
  }
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.js */ "./src/js/main.js");
/* harmony import */ var _css_reset_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css/reset.css */ "./src/css/reset.css");
/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../css/style.css */ "./src/css/style.css");




const main = new _main_js__WEBPACK_IMPORTED_MODULE_0__.Main();
main.start();

})();

/******/ })()
;
//# sourceMappingURL=main.js.map