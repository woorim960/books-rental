// public/js/home/sign-in.js

const header = document.querySelector('header');

function showBookMain() {
  location.href = 'book';
}

function init() {
  header.addEventListener('click', showBookMain);
}

init();