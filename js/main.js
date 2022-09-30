const btnCall = document.querySelector('.btnCall');
const mobileNav = document.querySelector('.mobileNav');
const logo = document.querySelector('#logo');

btnCall.onclick = function(e){
  e.preventDefault(); //링크 이동 방지

  logo.classList.toggle('on');
  btnCall.classList.toggle('on');
  mobileNav.classList.toggle('on');
}
