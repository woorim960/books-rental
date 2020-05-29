// public/js/create.js

// Book 클래스 불러오기
import Book from '../model/Book.js';
import User from '../model/User.js';
'use strict';

// HTML 오브젝트 변수 선언
const btnUpdate = document.querySelector('#update-btn'),
  btnDelete = document.querySelector('#delete-btn'),
  btnRental = document.querySelector('#rental-btn'),
  btnReturn = document.querySelector('#return-btn'),
  seq = document.querySelector('hidden').attributes.value.value;

// 도서 수정 화면 이동
function showBookUpdate() {
  location.href = `${seq}/update`;
}

// 도서 삭제 화면 이동
function showBookDelete() {
  Book.delete(seq);
}

// 도서 대여 함수
function rentalBook() {
  alert('서비스 준비 중입니다.');
}

// 도서 반납 함수
function returnBook() {
   alert('서비스 준비 중입니다.');
}

// 초기 실행 함수
function init() {
  User.checkSessionOfDetail(btnUpdate, btnDelete, btnRental, btnReturn);
  btnUpdate.addEventListener('click', showBookUpdate);
  btnDelete.addEventListener('click', showBookDelete);
  btnRental.addEventListener('click', rentalBook);
  btnReturn.addEventListener('click', returnBook);
}

init();