// public/js/book/book.js
'use strict';

// HTML 오브젝트 변수 선언
const logo = document.querySelector('header #logo'),
  btnSignIn = document.querySelector('header #status-list #sign-in'),
  btnBookCreate = document.querySelector('header #status-list #book-create');

// 도서 메인 화면으로 이동
function showBookMain() {
  location.href = '/book';
}

function showSignIn() {
  location.href = '/sign-in'
}

// 도서 추가 화면으로 이동
function showBookCreate() {
  location.href = '/book/create';
}

// 초기 실행 함수
function init() {
  // 로고 클릭시 메인 화면으로 이동
  logo.addEventListener('click', showBookMain)
  // 'SignIn'클릭시 로그인 화면으로 이동
  btnSignIn.addEventListener('click', showSignIn);
  // '도서추가' 클릭시 도서 추가 화면으로 이동
  btnBookCreate.addEventListener('click', showBookCreate);
}

init();