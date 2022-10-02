// 헤더 DOM
const $header = document.querySelector('header');
const header = {
  btnCall: $header.querySelector('.btnCall'),
  mobileNav: $header.querySelector('.mobileNav'),
  logo: $header.querySelector('#logo')
};


// 헤더
header.btnCall.addEventListener('click', (e)=>{ // 햄버거 버튼 클릭
  e.preventDefault(); //링크 이동 방지

  header.logo.classList.toggle('on');
  header.btnCall.classList.toggle('on');
  header.mobileNav.classList.toggle('on');
})
