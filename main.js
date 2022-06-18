'use strict';

const navbarMenu = document.querySelector('.navbar__menu');

// 메뉴 아이템 클릭하면 해당 섹션으로 이동 하게 만들기
navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const menu = target.dataset.menu;
  if (menu === null) {
    return;
  }
  navbarMenu.classList.remove('open');
  menuActivate(target);
  scrollIntoView(menu);
});

// 메뉴 아이템 효과 주기
function menuActivate(target) {
  const active = document.querySelector('.navbar__menu__item.active');
  active.classList.remove('active');
  target.classList.add('active');
}

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

// 스크롤 시 메뉴 활성화
const sectionIds = ['#home', '#about', '#skills', '#work', '#contact'];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-menu="${id}"]`)
);
let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected) {
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
};
const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      // 진입 하지 않을 때, 빠져 나갈 때!
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      if (entry.boundingClientRect.y < 0) {
        // 스크롤을 아래로 하면 페이지는 올라오니까 y좌표는 마이너스
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

window.addEventListener('wheel', () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
    window.scrollY + window.innerHeight ===
    document.body.clientHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});
