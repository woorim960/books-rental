// public/js/model/User.js
'use strict';

// USER 클래스 정의
export default class User {

  // 생성자
  constructor(id, name, email, pw, pwCheck) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.pw = pw;
    this.pwCheck = pwCheck;
  }

  // 객체 반환 함수
  getObject = () => {
    const userData = {
      id : this.id,
      name : this.name,
      email : this.email,
      pw : this.pw,
      pwCheck : this.pwCheck
    }
    return userData;
  }

  // 객체 반환 함수(static으로 객체 인스턴스화하지 않고도 실행 가능하도록 구현하였음)
  static getObject = (id, name, email, pw, pwCheck) => {
    const userData = {
      id : id,
      name : name,
      email : email,
      pw : pw,
      pwCheck : pwCheck
    }
    return userData;
  }

  // 로컬 저장소에 로그인 정보 저장
  static saveSessionToLocal = (user) => {
    localStorage.setItem('current_user', user.id);
    localStorage.setItem('is_manager', user.is_manager);
  }

  // 현재 로그인 세션 정보 확인
  static checkSession = (btnSignIn, btnSignOut, btnCreateBook) => {
    const currentUser = localStorage.getItem('current_user'),
      isManager = localStorage.getItem('is_manager');
  
    // 로그인 세션 정보
    if (currentUser !== 'undefined') {
      // 로그인 상태
      btnSignIn.classList.add('deactive'); // 로그인 버튼 비활성화
      btnSignOut.classList.remove('deactive'); // 로그아웃 버튼 활성화
    } else {
      // 로그아웃 상태
      btnSignIn.classList.remove('deactive'); // 로그인 버튼 활성화
      btnSignOut.classList.add('deactive'); // 로그아웃 버튼 활성화
    }
  
    // 관리자 세션 정보
    if (isManager === 'Y') {
      // 관리자
      btnCreateBook.classList.remove('deactive'); // 도서 추가 버튼 활성화
    } else {
      // 회원
      btnCreateBook.classList.add('deactive'); // 도서 추가 버튼 비활성화
    }
  }

  static checkSessionOfDetail = (btnUpdate, btnDelete) => {
    const isManager = localStorage.getItem('is_manager');

    // 관리자 세션 정보
    if (isManager === 'Y') {
      // 관리자
      btnUpdate.classList.remove('deactive'); // 도서 추가 버튼 활성화
      btnDelete.classList.remove('deactive'); // 도서 추가 버튼 활성화
    } else {
      // 회원
      btnUpdate.classList.add('deactive'); // 도서 추가 버튼 비활성화
      btnDelete.classList.add('deactive'); // 도서 추가 버튼 활성화
    }
  }

  // 로그인 함수(static으로 객체 인스턴스화하지 않고도 실행 가능하도록 구현하였음)
  static signIn = (user) => {
    fetch('/user/sign-in', {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(user)
    })
      .then(res => res.json())
      .then(user => {
        if (user) {
          this.saveSessionToLocal(user[0]);
          location.href = '/book';
          alert('로그인에 성공하셨습니다.');
        } else {
          alert('존재하지 않는 아이디거나 비밀번호가 일치하지 않습니다.');
        }
        
      });
  }

  // 유저 추가 함수
  signUp = (user) => {
    return fetch('/user/sign-up', {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(user)
    })
      .then(res => res.json())
      .then(json => {
        if (json) {
          location.href = '/sign-in';
          alert('회원 가입이 완료 되었습니다.');
          return true;
        } else {
          alert('이미 존재하는 아이디입니다.');
          return false;
        }
      })
      .catch(err => alert(err));
  }
}