// public/js/book/book.js

import User from './model/User.js';
'use strict';

// HTML 오브젝트 변수 선언
const logo = document.querySelector('#logo'),
  btnSignIn = document.querySelector('#sign-in'),
  btnSignOut = document.querySelector('#sign-out'),
  btnCreateBook = document.querySelector('#book-create');

// 도서 메인 화면으로 이동
function showBookMain() {
  location.href = '/book';
}

function showSignIn() {
  location.href = '/sign-in'
}

// 도서 추가 화면으로 이동
function showCreateBook() {
  location.href = '/book/create';
}

// 초기 실행 함수
function init() {
  // 현재 로그인 세션 확인
  User.checkSession(btnSignIn, btnSignOut, btnCreateBook);
  // 로고 클릭시 메인 화면으로 이동
  logo.addEventListener('click', showBookMain)
  // 'SignIn'클릭시 로그인 화면으로 이동
  btnSignIn.addEventListener('click', showSignIn);
  // 'SignOut'클릭시 로그인 화면으로 이동
  btnSignOut.addEventListener('click', showSignIn);
  // '도서추가' 클릭시 도서 추가 화면으로 이동
  btnCreateBook.addEventListener('click', showCreateBook);
}

init();