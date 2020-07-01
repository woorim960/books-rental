// public/js/book/book.js

import User from './model/User.js';
'use strict';

// HTML 오브젝트 변수 선언
const logo = document.querySelector('#logo'),
  btnSignIn = document.querySelector('#sign-in'),
  btnSignOut = document.querySelector('#sign-out'),
  boxContainer = document.querySelector('.tab-wrap'),
  btnMenu = document.querySelectorAll('.tab-wrap .menu-container .menu-btn');

// 탭별 변수 정의
const btnUser = document.querySelector('#user-management'),
  btnBook = document.querySelector('#book-create'),
  btnRental = document.querySelector('#rental-list');

// 도서 메인 화면으로 이동
function showBookMain() {
  location.href = '/book';
}

function showSignIn() {
  location.href = '/sign-in'
}

// 메뉴 클릭시 탭을 보여주는 함수
function showBox(event) {
  const menu = event.target,
    currentBox = menu.parentNode.parentNode.childNodes[3];
  
  // 메뉴와 탭에 on 클래스 토글링
  menu.classList.toggle('on');
  currentBox.classList.toggle('on');
}

function moveUserManageSite() {
  location.href = '/user/management';
}

function moveBookManageSite() {
  location.href = '/book/create';
}

function moveRentalManageSite() {
  location.href = '/rental/list';
}

// 초기 실행 함수
function init() {
  // 현재 로그인 세션 확인
  User.checkSession(btnSignIn, btnSignOut, boxContainer);
  // 로고 클릭시 메인 화면으로 이동
  logo.addEventListener('click', showBookMain)
  // 'SignIn'클릭시 로그인 화면으로 이동
  btnSignIn.addEventListener('click', showSignIn);
  // 'SignOut'클릭시 로그인 화면으로 이동
  btnSignOut.addEventListener('click', showSignIn);

  btnMenu.forEach(menu => {
    menu.addEventListener('click', showBox);
  });
  btnUser.addEventListener('click', moveUserManageSite);
  btnBook.addEventListener('click', moveBookManageSite);
  btnRental.addEventListener('click', moveRentalManageSite);
}

init();