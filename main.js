'use strict';

const navbarMenu = document.querySelector('.navbar__menu');
const navbarMenuItems = document.querySelectorAll('.navbar__menu__item');

// 메뉴 아이템 클릭하면 해당 섹션으로 이동 하게 만들기 + 메뉴 아이템 효과 주기
navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const menu = target.dataset.menu;
  scrollIntoView(menu);
  const active = document.querySelector('.navbar__menu__item.active');
  active.classList.remove('active');
  target.classList.add('active');
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}
