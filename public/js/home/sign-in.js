// public/js/home/sign-in.js

import User from '../model/User.js';
'use strict';

// HTML 오브젝트 변수 선언
const logo = document.querySelector('.logo'),
  btnMoveBook = document.querySelector('header .btn-move-book'),
  btnSignIn = document.querySelector('#signin-btn'),
  btnSignUp = document.querySelector('#signup-btn');

// 메인 화면으로 이동
function showMain() {
  location.href = '/';
}

// 도서 메인(조회) 화면 이동
function showBookMain() {
  location.href = '/book';
}

// 로그인
function signIn() {
  const id = document.querySelector('#id'),
    pw = document.querySelector('#pw');

  const user = {};
  user.id = id.value;
  user.pw = pw.value;

  // 로그인 메서드 호출
  User.signIn(user);
}

// 회원가입 화면 이동
function showSignUp() {
  location.href = '/sign-up'
}

// 로컬 저장소 초기화
function initSession() {
  const user = {};
  user.is_manager = 'N';
  User.saveSessionToLocal(user);
}

// 초기 실행 함수
function init() {
  logo.addEventListener('click', showMain);
  btnMoveBook.addEventListener('click', showBookMain);
  btnSignIn.addEventListener('click', signIn);
  btnSignUp.addEventListener('click', showSignUp);

  // 로그인 화면으로 이동시 로그인 세션 초기화
  initSession();
}

init();