class Answer extends User {
  constructor(params) {
    super(params);
  }

  setUser(idx) {
    this.userNextAnswer = document.createElement("div");
    this.userNextAnswer.classList.add("comments__answer");
    this.userNextAnswer.setAttribute("data-index", idx);
    this.userNextAnswer.setAttribute("isFavorite", false);
    this.userNextAnswer.setAttribute("data-rating", 0);
    this.userNextAnswer.innerHTML = `
        <img src="${this.config.answers[idx].src}" alt="user" width="61" height="61"/>
        <p class="comments__answer-title">${this.config.answers[idx].name}</p>
        <p class="comments__answer-date">${this.config.answers[idx].date}</p>
        <p class="comments__answer-text">${this.config.answers[idx].text}</p>
        <p class="comments__answer-text-reply">
          <img src="./src/assets/reply.svg" alt="reply"/>
            <span class="comments__answer-reply">${this.config.answers[idx].toWhom}
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
            <span class="comments__count">0</span>
          <button class="comments__btn-plus button">
            <img src="./src/assets/btn_plus.svg" alt="btn-plus" />
          </button>
        </div>
      `;
    this.targets = document.querySelectorAll(".comments__archive");
    this.targets.forEach((el) => {
      if (el.dataset.index === this.config.answers[idx].authorIdx) {
        el.after(this.userNextAnswer);
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
        (event) => {
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
              this.config.users.at(-1).src
            }" alt="user" width="61" height="61"/>
            <p class="comments__archive-title">${
              this.config.users.at(-1).first
            } ${this.config.users.at(-1).last}</p>
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
                date: this.config.formatDate(),
                name: this.authorAnswerName.textContent,
                src: this.authorAnswerImg.src,
                toWhom: this.toWhomAnswerName,
                authorIdx: this.buttonAnswer.dataset.index,
              };
              this.config.answers.push(this.answerOdj);
              localStorage.setItem(
                "answers",
                JSON.stringify(this.config.answers)
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
    this.config.answers.forEach((el, idx) => {
      if (el != null) {
        this.setUser(idx);
      }
    });
  }
}