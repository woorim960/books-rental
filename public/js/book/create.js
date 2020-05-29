// public/js/create.js

import Book from './class.js';
'use strict';

const btnCreate = document.querySelector('#create-form #btns #create-btn'),
  title = document.querySelector('#create-form #create-input #title'),
  discription = document.querySelector('#create-form #create-input #discription'),
  author = document.querySelector('#create-form #create-input #author'),
  price = document.querySelector('#create-form #create-input #price');

function createData(event) {
  const bookData = new Book(title.value, discription.value, author.value, price.value);

  if (bookData.title === '') {
    alert('제목은 필수 입력 사항입니다.');
    return;
  } else if(!isNumber(bookData.price) || bookData.price < 0) {
    alert('가격은 정수만 입력 가능합니다.');
    return;
  }
  bookData.create(bookData.getObject());
}

function init() {
  btnCreate.addEventListener('click', createData);
}

init();

function isNumber(n) { 
  return !isNaN(parseFloat(n)) && !isNaN(n - 0) 
}