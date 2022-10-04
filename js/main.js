// 헤더 DOM
const $header = document.querySelector('header');
const header = {
  btnCall: $header.querySelector('.btnCall'),
  mobileNav: $header.querySelector('.mobileNav'),
  logo: $header.querySelector('#logo')
};

// 무비갤러리 DOM
const $movies = document.querySelector('.movies');
const movies = {
  articles: $movies.querySelectorAll('article')
};

// 슬라이드 DOM
const $slides = document.querySelector('.slides');
const slides = {
  slider: $slides.querySelector('.slider'),
  articles: $slides.querySelectorAll('article'),
  btnPrev: $slides.querySelector('.btnPrev'),
  btnNext: $slides.querySelector('.btnNext'),
  clickable: true
}

// 게시판 DOM
const $board = document.querySelector('.board');
const board = {
  lis: $board.querySelectorAll('.inner ul li')
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

// 무비갤러리
movies.articles.forEach((el, i)=>{
  el.querySelector('video').pause();
  el.addEventListener('mouseenter', ()=>{ // 마우스 IN 시
    for (let el of movies.articles) {
      el.className = 'off';
    }
    el.className = 'on'
    el.querySelector('video').play();
    const randomNum = Math.floor(Math.random() * 10 - 5);
    el.style.transform = `scale(1.1) rotate(${randomNum}deg)`;
  })

  el.addEventListener('mouseleave', ()=>{ // 마우스 OUT 시
    el.style.transform = `rotate(0)`;
    el.querySelector('video').pause();
    for (let el of movies.articles) {
      el.className = '';
    }
  })
})

// 슬라이드
init();
setInterval(()=>{ // 자동 반복
  moveSlide('next');
}, 5000)

slides.btnPrev.addEventListener('click', (e)=>{  // 왼쪽 클릭
  e.preventDefault();
  moveSlide('prev');
})

slides.btnNext.addEventListener('click', (e)=>{  // 오른쪽 클릭
  e.preventDefault();
  moveSlide('next');
})

function moveSlide(motion) {  // 슬라이드 이동
  if (!slides.clickable) return;
  slides.clickable = false;

  new Anim(slides.slider, {
    prop: 'left',
    value: motion === 'prev' ? '0%' : '-200%',
    duration: 500,
    callback: ()=>{
      if (motion === 'prev') {
        slides.slider.prepend(slides.slider.lastElementChild);
      } else {
        slides.slider.append(slides.slider.firstElementChild);
      }
      slides.slider.style.left = '-100%';
      slides.clickable = true;
    }
  })
}

function init() { // 초기화
  const len = slides.articles.length;

  slides.slider.prepend(slides.slider.lastElementChild);
  slides.slider.style.left = '-100%';
  slides.slider.style.width = `${100 * len}%`;
  slides.articles.forEach((el)=>{
    el.style.width = `${100 / len}%`;
  })
}

// 게시판 영역
board.lis.forEach((el) => {
  const randomTop = Math.random() * 6 - 3;
  const randomLeft = Math.random() * 6 - 3;
  el.style.marginTop = `${randomTop}%`;
  el.style.marginLeft = `${randomLeft}%`;
  el.style.rotate = `${randomTop}deg`;
})

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


// 지도API
const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
const options = { //지도를 생성할 때 필요한 기본 옵션
	center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
	level: 3, //지도의 레벨(확대, 축소 정도)
};

const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
const marker = new kakao.maps.Marker({ 
  // 지도 중심좌표에 마커를 생성합니다 
  position: map.getCenter() 
}); 
// 지도에 마커를 표시합니다
marker.setMap(map);

const iwContent = `<div class="mapInfo">
  <ul>
    <li>YUJOO'S<br>ICE CREAM!</li>
    <li>
      <a href="https://map.kakao.com/link/map/YUJOO'S ICE CREAM,33.450701,126.570667" target="_blank">view detail</a>
    </li>
  </ul>
  </div>`;
// 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
const iwPosition = new kakao.maps.LatLng(33.450701, 126.570667); //인포윈도우 표시 위치입니다

// 인포윈도우를 생성합니다
const infowindow = new kakao.maps.InfoWindow({
    position : iwPosition, 
    content : iwContent 
});
  
// 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
infowindow.open(map, marker); 