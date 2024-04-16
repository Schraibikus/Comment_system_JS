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
    // this.commentHeaderText = document.querySelectorAll(
    //   ".comments-header__item-text"
    // );

    // this.checkedImg = document.createElement("img");
    // this.checkedImg.src = "./src/assets/check.svg";
    // this.checkedImg.alt = "drop-down list";
    // this.checkedImg.width = 15;
    // this.checkedImg.height = 15;
    // this.checkedImg.classList.add("dropdown-check");

    // this.links.forEach((link, idx) => {
    //   link.addEventListener("click", (event) => {
    //     event.currentTarget.prepend(this.checkedImg);
    //     this.commentHeaderText[1].textContent = this.config.linksList[idx];
    //     if (link.firstElementChild.classList.contains("dropdown-check")) {
    //       event.target.firstElementChild.classList.add(
    //         "dropdown-check--checked"
    //       );
    //     } else event.target.prepend(this.checkedImg);
    //   });
    // });
  }
  increaseCommentCount() {
    this.commentCount = document.querySelector(".comments-count");
    this.commentCount.innerHTML = `
    &#40;${this.config.comments.length + this.config.answers.length}&#41;
    `;
  }
  sortCommentsByDate() {
    this.links[0].addEventListener("click", () => {
      alert("идет сортировка.......");
      setTimeout(() => {
        alert("Ой, эта фича в разработке)))");
        window.location.reload();
      }, 1000);
    });
    // this.noSortedCommentsByDate = document.querySelectorAll(
    //   ".comments__archive-date"
    // );
    // this.noSortedAnswersByDate = document.querySelectorAll(
    //   ".comments__answer-date"
    // );
    // this.links[0].addEventListener("click", (event) => {
    //   alert("идет сортировка.......");
    //   for (let date of this.noSortedCommentsByDate) {
    //     const itemDate = {
    //       date: date.textContent,
    //       whoseAr: date.closest(".comments__archive").dataset.index,
    //     };
    //     this.config.itemsSortByDate.push(itemDate);
    //     localStorage.setItem(
    //       "itemsSortByDate",
    //       JSON.stringify(this.config.itemsSortByDate)
    //     );
    //   }
    //   console.log(this.config.itemsSortByDate.sort());
    // });
  }
  sortCommentsByNumserOfRating() {
    this.noSortedByNumserOfRating =
      document.querySelectorAll(".comments__count");

    for (let rating of this.noSortedByNumserOfRating) {
      const itemRating = {
        src: rating.parentElement.parentElement.children[0].src,
        name: rating.parentElement.parentElement.children[1].textContent,
        date: rating.parentElement.parentElement.children[2].textContent,
        text: rating.parentElement.parentElement.children[3].textContent,
        nameReply: rating.parentElement.parentElement.children[4].textContent,
        rating: Number(rating.textContent),
        whoseAr: rating.parentElement.parentElement.dataset.index,
      };
      this.config.itemsSort.push(itemRating);
      if (
        this.config.itemsSort.length >
        this.config.comments.length + this.config.answers.length
      )
        this.config.itemsSort.shift();
      localStorage.setItem("itemsSort", JSON.stringify(this.config.itemsSort));
    }

    this.byDateButtonsList = document.querySelector(".byNumserOfRating");
    this.buttonOnAllComents = document.querySelector(
      ".comments-header__item-text"
    );
    let buttonDown = this.byDateButtonsList.children[0];
    let buttonUp = this.byDateButtonsList.children[1];
    buttonDown.addEventListener("click", () => {
      this.displaySort();
      this.displayNoneNoSortedItems();
    }),
      { once: true };
    buttonUp.addEventListener("click", () => {
      this.displaySortReverse();
      this.displayNoneNoSortedItems();
    }),
      { once: true };
    this.buttonOnAllComents.addEventListener("click", () => {
      this.displayOnNoSortedItems();
    });
  }
  displaySort() {
    this.config.itemsSort.sort((a, b) => (a.rating > b.rating ? 1 : -1));
    this.setUsersSort();
  }
  displaySortReverse() {
    this.config.itemsSort.sort((a, b) => (a.rating < b.rating ? 1 : -1));
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
    this.config.itemsSort.forEach((el, idx) => {
      if (el != null) this.setNextUserSort(idx);
    });
  }
  setNextUserSort(idx) {
    this.userSortNextContainer = document.querySelector(".comments__content");
    this.userSortNext = document.createElement("div");
    this.userSortNext.classList.add("comments__sorted");
    this.userSortNext.innerHTML = `
    <img src="${this.config.itemsSort[idx].src}" alt="user" width="61" height="61"/>
    <p class="comments__answer-title">${this.config.itemsSort[idx].name}</p>
      <p class="comments__archive-date">${this.config.itemsSort[idx].date}</p>
      <p class="comments__archive-text">${this.config.itemsSort[idx].text}   
      </p>
      <div class="comments__rating comments__rating-archive">
        <span class="comments__count">Rating: ${this.config.itemsSort[idx].rating}</span>
      </div>
    `;
    this.userSortNextContainer.after(this.userSortNext);
  }
  setUsersSortClearDisplay() {
    this.userSortNextItems = document.querySelectorAll(".comments__sorted");
    this.userSortNextItems.innerHTML = "";
  }

  sortCommentsByRelevance() {
    this.links[2].addEventListener("click", (event) => {
      alert("идет сортировка.......");
      setTimeout(() => {
        alert("Ой, данная фича ещё в разработке)))");
        window.location.reload();
      }, 1000);
    });
  }

  sortCommentsByNumberOfResponses() {
    this.links[3].addEventListener("click", (event) => {
      alert("идет сортировка.......");
      setTimeout(() => {
        alert("Ой, эта фича тоже ещё в разработке)))");
        window.location.reload();
      }, 1000);
    });
  }
}
