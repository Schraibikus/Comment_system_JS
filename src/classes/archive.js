class Archive extends User {
  constructor(params) {
    super(params);
  }

  setNextUser(idx) {
    this.userNextComment = document.createElement("div");
    this.userNextComment.classList.add("comments__archive");
    this.userNextComment.setAttribute("data-index", idx);
    this.userNextComment.setAttribute("isFavorite", false);
    this.userNextComment.setAttribute("data-rating", 0);
    this.userNextComment.innerHTML = `
    <img src="${this.config.users[idx].src}" alt="user" width="61" height="61"/>
    <p class="comments__answer-title">${this.config.users[idx].first} ${this.config.users[idx].last}</p>
      <p class="comments__archive-date">${this.config.comments[idx].date}</p>
      <p class="comments__archive-text">${this.config.comments[idx].text}   
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
      <div class="comments__rating">
        <button class="comments__btn-minus button">
          <img src="./src/assets/btn_minus.svg" alt="btn-minus" />
        </button>
        <span class="comments__count">0</span>
        <button class="comments__btn-plus button">
          <img src="./src/assets/btn_plus.svg" alt="btn-plus" />
        </button>
      </div>
    `;
    this.userComment.after(this.userNextComment);
  }
}