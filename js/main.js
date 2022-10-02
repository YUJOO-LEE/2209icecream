// 헤더 DOM
const $header = document.querySelector('header');
const header = {
  btnCall: $header.querySelector('.btnCall'),
  mobileNav: $header.querySelector('.mobileNav'),
  logo: $header.querySelector('#logo')
};

// 갤러리 DOM
const $gallery = document.querySelector('.gallery');
const gallery = {
  articles: $gallery.querySelectorAll('article')
};

// 어바웃 DOM
const $about = document.querySelector('.about');
const about = {
  slider: $about.querySelector('.slider'),
  articles: $about.querySelectorAll('article'),
  btnPrev: $about.querySelector('.btnPrev'),
  btnNext: $about.querySelector('.btnNext'),
  clickable: true
}

// 컨텍트 DOM
const $contact = document.querySelector('.contact');
const contact = {
  menus: $contact.querySelectorAll('.tabMenu>ul>li'),
  contents: $contact.querySelectorAll('.tabBody>div')
}



// 헤더
header.btnCall.addEventListener('click', (e)=>{ // 햄버거 버튼 클릭
  e.preventDefault(); //링크 이동 방지

  header.logo.classList.toggle('on');
  header.btnCall.classList.toggle('on');
  header.mobileNav.classList.toggle('on');
})

// 갤러리
gallery.articles.forEach((el, i)=>{
  el.addEventListener('mouseenter', ()=>{ // 마우스 IN 시
    for (let el of gallery.articles) {
      el.className = 'off';
    }
    el.className = 'on';
    el.querySelector('video').play();
    const randomNum = Math.floor(Math.random() * 10 - 5);
    el.style.transform = `scale(1.1) rotate(${randomNum}deg)`;
  })

  el.addEventListener('mouseleave', ()=>{ // 마우스 OUT 시
    el.style.transform = `rotate(0)`;
    el.querySelector('video').pause();
    for (let el of gallery.articles) {
      el.className = '';
    }
  })
})

// 어바웃
init();
setInterval(()=>{ // 자동 반복
  moveSlide('next');
}, 5000)

about.btnPrev.addEventListener('click', (e)=>{  // 왼쪽 클릭
  e.preventDefault();
  moveSlide('prev');
})

about.btnNext.addEventListener('click', (e)=>{  // 오른쪽 클릭
  e.preventDefault();
  moveSlide('next');
})

function moveSlide(motion) {  // 슬라이드 이동
  if (!about.clickable) return;
  about.clickable = false;

  new Anim(about.slider, {
    prop: 'left',
    value: motion === 'prev' ? '0%' : '-200%',
    duration: 500,
    callback: ()=>{
      if (motion === 'prev') {
        about.slider.prepend(about.slider.lastElementChild);
      } else {
        about.slider.append(about.slider.firstElementChild);
      }
      about.slider.style.left = '-100%';
      about.clickable = true;
    }
  })
}

function init() { // 초기화
  const len = about.articles.length;

  about.slider.prepend(about.slider.lastElementChild);
  about.slider.style.left = '-100%';
  about.slider.style.width = `${100 * len}%`;
  about.articles.forEach((el)=>{
    el.style.width = `${100 / len}%`;
  })
}

// 컨텍트 영역
contact.menus.forEach((el, i) => {
  el.addEventListener('click', (e)=>{
    e.preventDefault();

    for (let i = 0; i < contact.menus.length ; i++) {
      contact.menus[i].classList.remove('on');
      contact.contents[i].classList.remove('on');
    }

    contact.menus[i].classList.add('on');
    contact.contents[i].classList.add('on');
  })
})
