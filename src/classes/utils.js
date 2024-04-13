class Utils {
  constructor({ config, main, linksList }) {
    this.config = config;
    this.main = main;
    this.linksList = linksList;

    this.onComments = document.querySelectorAll(".comments-header__item-text");
    this.dropdownImg = document.querySelector(".dropdown-arrow");
    this.dropdownNav = document.querySelector(".comments-header__dropdown-nav");

    this.onComments[1].onclick = () => {
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
    };

    this.links = document.querySelectorAll(".dropdown__link");
    this.commentHeaderText = document.querySelectorAll(
      ".comments-header__item-text"
    );

    this.checkedImg = document.createElement("img");
    this.checkedImg.src = "./src/assets/check.svg";
    this.checkedImg.alt = "drop-down list";
    this.checkedImg.width = 15;
    this.checkedImg.height = 15;
    this.checkedImg.classList.add("dropdown-check");

    this.links.forEach((link, idx) => {
      link.addEventListener("click", (event) => {
        event.currentTarget.prepend(this.checkedImg);
        this.commentHeaderText[1].textContent = this.config.linksList[idx];
        if (link.firstElementChild.classList.contains("dropdown-check")) {
          event.target.firstElementChild.classList.add(
            "dropdown-check--checked"
          );
        } else event.target.prepend(this.checkedImg);
      });
    });
  }
  increaseCommentCount() {
    this.commentCount = document.querySelector(".comments-count");
    this.commentCount.innerHTML = `
    &#40;${this.config.comments.length + this.config.answers.length}&#41;
    `;
  }
  sortCommentsByDate() {
    this.noSortedCommentsByDate = document.querySelectorAll(
      ".comments__archive-date"
    );
    this.noSortedAnswersByDate = document.querySelectorAll(
      ".comments__answer-date"
    );

    this.links[0].addEventListener("click", (event) => {
      alert("идет сортировка.......");
      for (let date of this.noSortedCommentsByDate) {
        this.itemsSortByDate = [];
        this.itemsSortByDate.push(date.textContent);
        this.itemsSortByDate.sort();
        console.log(this.itemsSortByDate.sort());
      }
    });
  }
  sortCommentsByNumserOfRating() {
    this.noSortedByNumserOfRating =
      document.querySelectorAll(".comments__count");

    this.links[1].addEventListener("click", (event) => {
      alert("идет сортировка.......");
      for (let rating of this.noSortedByNumserOfRating) {
        this.itemsSortByNumserOfRating = [];
        this.itemsSortByNumserOfRating.push(rating.textContent);
        this.itemsSortByNumserOfRating = this.itemsSortByNumserOfRating.sort(
          (a, b) => b - a
        );
      }
    });
  }
}
