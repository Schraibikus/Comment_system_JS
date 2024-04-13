class Rating {
  constructor({ config, main }) {
    this.config = config;
    this.main = main;
  }
  commentsRating() {
    this.ratingBlocks = document.querySelectorAll(".comments__rating");

    for (let block of this.ratingBlocks) {
      block.children[0].addEventListener(
        "click",
        (event) => {
          let count = 0;
          if (event.currentTarget) count--;
          event.currentTarget.parentElement.children[1].textContent--;
          this.changeRatingMinus(event);
          this.rememberRating(event);
          this.displayRating();
          if (event.currentTarget.parentElement.children[1].textContent < 0) {
            event.currentTarget.parentElement.children[1].style.color = "red";
          } else {
            event.currentTarget.parentElement.children[1].style.color =
              "#8ac540";
          }
        },
        { once: true }
      );
      block.children[2].addEventListener(
        "click",
        (event) => {
          let count = 0;
          if (event.currentTarget) count++;
          event.currentTarget.parentElement.children[1].textContent++;
          this.changeRatingPlus(event);
          this.rememberRating(event);
          this.displayRating();
          if (event.currentTarget.parentElement.children[1].textContent < 0) {
            event.currentTarget.parentElement.children[1].style.color = "red";
          } else {
            event.currentTarget.parentElement.children[1].style.color =
              "#8ac540";
          }
        },
        { once: true }
      );
    }
  }
  changeRatingMinus(event) {
    event.currentTarget.parentElement.parentElement.dataset.rating--;
  }
  changeRatingPlus(event) {
    event.currentTarget.parentElement.parentElement.dataset.rating++;
  }
  rememberRating(event) {
    this.ratingObj = {
      value: event.currentTarget.parentElement.parentElement.dataset.rating,
      whose: event.currentTarget.parentElement.parentElement.dataset.index,
    };
    this.config.ratings.push(this.ratingObj);
    localStorage.setItem("ratings", JSON.stringify(this.config.ratings));
  }

  displayRating() {
    this.commentsList = document.querySelectorAll(".comments__archive");
    for (let el of this.commentsList) {
      el.onclick = (e) => {
        const sum = this.config.ratings.map((value) => {
          return +value.whose;
        });
        console.log(sum);
        this.config.ratings.map((value, whose) => {
          // console.log("whose>> ", whose);
          // console.log("value >>", value);
        });
      };
    }
  }
}
