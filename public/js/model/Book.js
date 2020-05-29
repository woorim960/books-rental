// public/js/model/Book.js
'use strict';

// Book 클래스 정의
export default class Book {
  // 생성자
  constructor(title, discription, author, price) {
    this.title = title;
    this.discription = discription;
    this.author = author;
    this.price = price;
  }

  // 객체 반환 함수
  getObject = () => {
    const bookData = {
      title : this.title,
      discription : this.discription,
      author : this.author,
      price : this.price
    }
    return bookData;
  }

  // 객체 반환 함수(stric으로 객체 인스턴스화하지 않고도 실행 가능하도록 구현하였음)
  static getObject = (seq, title, discription, author, price) => {
    const bookData = {
      seq : seq,
      title : title,
      discription : discription,
      author : author,
      price : price
    }
    return bookData;
  }

  // 도서 조회 함수(stric으로 객체 인스턴스화하지 않고도 실행 가능하도록 구현하였음)
  static read = () => {
    return fetch('/book/read')
      .then(res => res.json())
      .then(books => {
        let tr = '';
        for (let i = 0; i < books.length; i++) {
          tr += `<tr>
            <td>${books[i].seq}</td>
            <td>${books[i].title}</td>
            <td>${books[i].discription}</td>
            <td>${books[i].author}</td>
            <td>${books[i].price}</td>
          `;
          tr += '</tr>'
        }
        return tr;
      })
      .catch(err => alert(err));
  }

  // 도서 추가 함수
  create = (bookData) => {
    fetch('/book/create', {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(bookData)
    })
      .then(res => res.json())
      .then(json => {
        if (json) {
          location.href = '/book';
          alert('데이터가 추가되었습니다.');
        }
      })
      .catch(err => alert(err));
  }

  // 도서 수정 함수
  update = (bookData, seq) => {
    bookData.seq = seq;
    fetch(`/book/${seq}/update`, {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(bookData)
    })
      .then(res => res.json())
      .then(json => {
        if (json) {
          location.href = `/book/${seq}`
          alert('데이터가 수정되었습니다.');
        }
      })
      .catch(err => alert(err));
  }

  // 도서 삭제 함수
  static delete = (seq) => {
    const book = {
      seq : seq
    };
    fetch(`/book/${seq}/delete`, {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(book)
    })
      .then(res => res.json())
      .then(json => {
        if (json) {
          alert('삭제가 완료 되었습니다.');
        }
      })
      .catch(err => alert(err));
  }

  // 도서 대여 함수
  static rental = (user, seq) => {
    fetch(`/book/${seq}/rental`, {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(user)
    })
      .then(res => res.json())
      .then(json => {
        if (json) {
          alert('대여가 완료 되었습니다.');
        } else {
          alert('이미 대여하셨습니다.')
        }
      })
      .catch(err => alert(err));
  }

  // 도서 반납   함수
  static return = (user, seq) => {
    fetch(`/book/${seq}/return`, {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(user)
    })
      .then(res => res.json())
      .then(json => {
        if (json) {
          alert('반납이 완료 되었습니다.');
        } else {
          alert('대여는 하셨는지요?')
        }
      })
      .catch(err => alert(err));
  }
}