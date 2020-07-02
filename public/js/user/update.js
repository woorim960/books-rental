// public/js/user/update.js

// Book 클래스 불러오기
import User from '../model/User.js';
'use strict';

// HTML 오브젝트 변수 선언
const btnUpdate = document.querySelector('#btns #update-btn'),
  id = document.querySelector('#signin-form #signin-input #id'),
  name = document.querySelector('#signin-form #signin-input #name'),
  email = document.querySelector('#signin-form #signin-input #email'),
  pw = document.querySelector('#signin-form #signin-input #pw'),
  pwCheck = document.querySelector('#signin-form #signin-input #pw-check'),
  isManager = document.querySelector('#signin-form #signin-input #is-manager');

// 본래 아이디 불러오기
const originId = document.querySelector('hidden').attributes.value.value;

// 회원가입 가능 여부
let isAvailable = true;

// 회원 수정 함수
function updateUser(event) {
  const user = {
    id : id.value,
    name : name.value,
    email : email.value,
    pw : pw.value,
    pwCheck : pwCheck.value,
    isManager : isManager.value
  }

  if (user.id.match(/^[a-z0-9_]{6,12}$/) === null) {
    alert('아이디가 양식(영숫자 6-12자)에 벗어났습니다.');
    printWarningMsg(id);
  } else if (user.name.match(/^[a-zA-Z가-힣\s]{0,20}$/) === null) {
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
    User.update(user, originId);
  }
}

// 초기 실행 함수
function init() {
  btnUpdate.addEventListener('click', updateUser);
}

init();

// input창에 경고메세지 출력
function printWarningMsg(html, is_pw) {
  html.placeholder = ((html.value === '') || (is_pw === true)) ? '필수 입력 사항입니다.' : html.value;
  html.value = '';
  html.classList.add('placeholder');
  isAvailable = false;
}