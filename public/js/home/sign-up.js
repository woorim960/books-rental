// public/js/home/sign-up.js

import User from '../model/User.js';
'use strict';

// HTML 오브젝트 변수 선언
const header = document.querySelector('header'),
  btnPrevious = document.querySelector('#previous-btn'),
  btnSignUp = document.querySelector('#signup-btn');

const id = document.querySelector('#id'),
  name = document.querySelector('#name'),
  email = document.querySelector('#email'),
  pw = document.querySelector('#pw'),
  pwCheck = document.querySelector('#pw-check');

// 회원가입 가능 여부
let isAvailable = true;

// 도서 메인(조호) 화면 이동
function showBookMain() {
  location.href = '/book';
}

// 로그인 화면 이동
function showSignIn() {
  location.href = '/sign-in'
}

// 회원가입
function signUp() {
  const user = new User(id.value, name.value, email.value, pw.value, pwCheck.value);

  if (user.id.match(/^[a-z0-9_]{6,12}$/) === null) {
    alert('아이디가 양식(영숫자 6-12자)에 벗어났습니다.');
    printWarningMsg(id);
  } else if (user.name.match(/^[a-zA-Z가-힣\s]{0,20}$/ ) === null) {
    alert('이름이 양식(한영 20자 이내)에 벗어났거나 올바른 표기법이 아닙니다.');
    printWarningMsg(name);
  } else if (user.email !== '' && user.email.match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/) === null) {
    alert('이메일 형식을 유지해주세요.');
    printWarningMsg(email);
  } else if (user.pw.match(/^.*(?=^.{9,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/) === null) {
    alert('비밀번호가 양식(영대소문자, 숫자, 특수문자 조합 9-20자)에 벗어났습니다.');
    printWarningMsg(pw, true)
  } else if (user.pw !== user.pwCheck) {
    alert('비밀번호가 일치하지 않습니다.');
    pwCheck.placeholder = '비밀번호가 일치하지 않습니다.';
    pwCheck.value = '';
    pwCheck.classList.add('placeholder');
    isAvailable = false;
  } else 
    isAvailable = true;

  // 회원가입이 가능하면 실행
  if (isAvailable) {
    const isSuccess = user.signUp(user.getObject());
    isSuccess.then(result => {
      if (result) printWarningMsg(id);
    });
  }
}

// 초기 실행 함수
function init() {
  header.addEventListener('click', showBookMain);
  btnPrevious.addEventListener('click', showSignIn);
  btnSignUp.addEventListener('click', signUp);
}

init();

// input창에 경고메세지 출력
function printWarningMsg(html, is_pw) {
  html.placeholder = ((html.value === '') || (is_pw === true)) ? '필수 입력 사항입니다.' : html.value;
  html.value = '';
  html.classList.add('placeholder');
  isAvailable = false;
}