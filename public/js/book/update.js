// public/js/update.js

// Book 클래스 불러오기
import Book from './class.js';
'use strict';

// HTML 오브젝트 변수 선언
const btnUpdate = document.querySelector('#create-form #btns #create-btn'),
  title = document.querySelector('#create-form #create-input #title'),
  discription = document.querySelector('#create-form #create-input #discription'),
  author = document.querySelector('#create-form #create-input #author'),
  price = document.querySelector('#create-form #create-input #price');

// 시퀀스 불러오기
const seq = document.querySelector('hidden').attributes.value.value;

// 도서 수정 함수
function updateData(event) {
  const bookData = new Book(title.value, discription.value, author.value, price.value);
  
  if (bookData.title === '') {
    alert('제목은 필수 입력 사항입니다.');
    return;
  } else if(!isNumber(bookData.price) || bookData.price < 0) {
    alert('가격은 정수만 입력 가능합니다.');
    return;
  }
  bookData.update(bookData.getObject(), seq);
}

// 초기 실행 함수
function init() {
  btnUpdate.addEventListener('click', updateData);
}

init();

// 정수인지 판별하는 함수
function isNumber(n) { 
  return !isNaN(parseFloat(n)) && !isNaN(n - 0) 
}