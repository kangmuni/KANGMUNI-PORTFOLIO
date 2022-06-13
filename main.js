'use strict';

const navbarMenu = document.querySelector('.navbar__menu');

// 메뉴 아이템 클릭하면 해당 섹션으로 이동 하게 만들기 + 메뉴 아이템 효과 주기
navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const menu = target.dataset.menu;
  if (menu === null) {
    return;
  }
  navbarMenu.classList.remove('open');
  scrollIntoView(menu);
  const active = document.querySelector('.navbar__menu__item.active');
  active.classList.remove('active');
  target.classList.add('active');
});

const home = document.querySelector('#home');
const homeHeight = home.getBoundingClientRect().height;
const arrowBtn = document.querySelector('.arrow-up');

// 스크롤 하면 화살표 버튼 나타나게 하기
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 4) {
    arrowBtn.classList.add('visible');
  } else {
    arrowBtn.classList.remove('visible');
  }
});

// 화살표 버튼 누르면 상단 홈으로 이동
arrowBtn.addEventListener('click', () => {
  scrollIntoView('#home');
});

//Navbar 토글 버튼 생성
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
});

// 스크롤 내리면 홈 섹션 투명도 조절
document.addEventListener('scroll', () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

//Contact 이메일 텍스트 클릭하면 복사
const email = document.querySelector('.contact__email');
const colorBlue = 'rgb(20, 213, 239)';
email.addEventListener('click', () => {
  copy();
  email.style.color = colorBlue;
});

function copy() {
  const text = document.querySelector('.contact__email').textContent;
  const textarea = document.createElement('textarea');
  textarea.textContent = text;
  document.body.append(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
}

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}
