// public/js/book-main.js

// Book 클래그 불러오기
import Book from './book/class.js';
'use strict';

// HTML 오브젝트 변수 선언
const tbody = document.querySelector('#read-form #read-table tbody');

// 도서 읽어오는 함수
function readBooks() {
  // 저장되어있는 도서 읽어온 뒤 테이블에 삽입
  const promise = Book.read();
  promise.then(bookData => {
    tbody.innerHTML = bookData;
  });
}

// 도서 상세 페이지 이동
function showBookDetail(event) {
  const seq = event.target.parentNode.childNodes[1].innerText;
  location.href = `/book/${seq}`;
}

// 초기 실행 함수
function init() {
  readBooks(); // 도서 읽어오는 함수

  tbody.addEventListener('click', showBookDetail);
}

init();