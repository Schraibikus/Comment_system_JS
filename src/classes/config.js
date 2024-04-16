class Config {
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

  linksList = [
    "По дате",
    "По количеству оценок",
    "По актуальности",
    "По количеству ответов",
  ];

  formatDate() {
    let dayOfMonth = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds(); // убрать на релизе

    month = month < 10 ? "0" + month : month;
    dayOfMonth = dayOfMonth < 10 ? "0" + dayOfMonth : dayOfMonth;
    hour = hour < 10 ? "0" + hour : hour;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds; // убрать на релизе

    return `${dayOfMonth}.${month} ${hour}:${minutes}.${seconds}`; //.${seconds} убрать на релизе
  }
}
