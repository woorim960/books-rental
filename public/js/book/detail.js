// public/js/create.js

// Book 클래스 불러오기
import Book from './class.js';
'use strict';

// HTML 오브젝트 변수 선언
const btnUpdate = document.querySelector('#update-btn'),
  btnDelete = document.querySelector('#delete-btn'),
  seq = document.querySelector('hidden').attributes.value.value;

// 도서 수정 화면 이동
function showBookUpdate() {
  location.href = `${seq}/update`;
}

// 도서 삭제 화면 이동
function showBookDelete() {
  Book.delete(seq);
}

// 초기 실행 함수
function init() {
  btnUpdate.addEventListener('click', showBookUpdate);
  btnDelete.addEventListener('click', showBookDelete);
}

init();