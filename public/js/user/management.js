// public/js/user/management.js

// Book 클래스 불러오기
import User from '../model/User.js';
'use strict';

// HTML 오브젝트 변수 선언
const tbody = document.querySelector('#read-form #read-table tbody'),
  btnCreate = document.querySelector('#create-btn'),
  btnUpdate = document.querySelector('#update-btn'),
  btnDelete = document.querySelector('#delete-btn');

// 선택된 회원 셀이 저장될 리스트 변수
const clickedCells = [];

// 도서 읽어오는 함수
function readUsers() {
  // 저장되어있는 도서 읽어온 뒤 테이블에 삽입
  const userData = User.read();
  userData.then(user => {
    tbody.innerHTML = user;
  });
}

// 선택된 셀들의 데이터 가공 함수
function processClickedCells(event) {
  // 선택된 셀과 아이디 변수 초기화
  const clickedCell = event.target.parentNode,
    id = clickedCell.childNodes[1].innerText;
  
  // 선택된 셀에 on 클래스 토글링
  clickedCell.classList.toggle('on');

  // 선택된 셀을 리스트에 저장 및 삭제
  if (clickedCells.includes(id)) {
    // 선택된 셀들 목록에 현재 선택된 셀이 이미 있는 경우에는 지움
    clickedCells.splice(clickedCells.indexOf(id), 1);
  } else {
    // 선택된 셀들 목록에 현재 선택된 셀이 없는 경우에 추가
    clickedCells.push(id);
  }
}

function createUser() {
  location.href = '/user/create'
}

function updateUser() {

}

function deleteUser() {

}

// 초기 실행 함수
function init() {
  readUsers(); // 도서 읽어오는 함수
  tbody.addEventListener('click', processClickedCells);
  btnCreate.addEventListener('click', createUser);
  btnUpdate.addEventListener('click', updateUser);
  btnDelete.addEventListener('click', deleteUser);
}

init();