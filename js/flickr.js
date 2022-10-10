// key : 67f7c54ac9fe4dd292e245fbb1302b24
// buddyIcon : http://farm{icon-farm}.staticflickr.com/{icon-server}/buddyicons/{nsid}.jpg

const key = '67f7c54ac9fe4dd292e245fbb1302b24';
const method1 = 'flickr.interestingness.getList';
const method2 = 'flickr.photos.search';
const base = 'https://www.flickr.com/services/rest?';
const perPage = 20;
const format = 'json';
const urlAll = `${base}method=${method1}&api_key=${key}&per_page=${perPage}&format=${format}&nojsoncallback=1`;
// 모든 이미지 불러오기

const $loading = document.querySelector('#loading');
const $searchBox = document.querySelector('#searchBox form');
const $picList = document.querySelector('.picList');
const $list = $picList.querySelector('#list');
const $input = $searchBox.querySelector('#search');

callData(urlAll); // 첫 화면 출력

// 검색 기능
$searchBox.addEventListener('submit', (e)=>{
  e.preventDefault();
  const tag = $input.value.trim();

  if (!tag) { // 공백 처리
    $input.style.border = '2px solid red';
    return;
  }

  $input.style.border = '';
  const urlSearch = `${base}method=${method2}&api_key=${key}&per_page=${perPage}&format=${format}&nojsoncallback=1&tags=${tag}&privacy_filter=1`;
  callData(urlSearch);
})

// 썸네일 클릭 이벤트
$list.addEventListener('click', (e)=>{
  e.preventDefault();
  if (e.target.className !== 'thumbnail') return;

  const $aside = document.createElement('aside');
  const asideCon = `
    <p>${e.target.closest('div').querySelector('p').innerText}</p>
    <img src="${e.target.closest('a').getAttribute('href')}">
    <span><i class="fa-solid fa-xmark"></i></span>
  `;
  $aside.innerHTML = asideCon;
  $picList.append($aside);

  // close 버튼 클릭 이벤트 부여
  $aside.querySelector('span').addEventListener('click', ()=>{
    $aside.remove();
  })
})

// 화면 전환
function changScreen(screen) {
  if (screen === 'reset') {

    $list.innerHTML = '';
    $loading.classList.remove('off');
    $list.classList.remove('on');
    $loading.querySelector('p').textContent = '0';

  } else if (screen === 'show') {

    $loading.classList.add('off');
    $list.classList.add('on');
    // 함수 호출 시 초기모션 추가
    // 모든 이미지가 로딩될 때 까지 isotope 적용되지 않으면 지저분해 보이기 때문에
    // 완성된 레이아웃 보여주기 위함
  }
}

// 데이터 불러오기
function callData(url){
  changScreen('reset');

  fetch(url)
    .then(data=>{
      return data.json();
    })
    .then(json=>{
      const items = json.photos.photo;
      
      if (!items.length) {  // 데이터 없을 때 예외처리
        $list.style.border = '0';
        $list.innerHTML = '검색된 데이터가 없습니다.';
        isoLayout();
        return;
      }

      createList(items);
      delayLoading();
    })
}

// 리스트 DOM 생성
function createList(items){
  let htmls = '';
  items.map(item=>{
    const thumbnail = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`;
    const original = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`;

    htmls += `
      <li class="item">
        <div>
          <a href="${original}">
            <img src="${thumbnail}" class="thumbnail">
          </a>
          <p>${item.title}</p>
          <span>
            <strong>${item.owner}</strong>
            <img src="http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg" class="profile">
          </span>
        </div>
      </li>
    `;
  })

  $list.style.border = '';
  $list.innerHTML = htmls;
}

// 이미지 로딩 확인
function delayLoading(){
  // 동적으로 생성된 이미지 갯수 구함
  const imgs = $list.querySelectorAll('img');
  const len = imgs.length;
  let count = 0;
  
  for (let el of imgs) {
    el.addEventListener('load', ()=>{
      count++;
      $loading.querySelector('p').textContent = Math.floor(count/len * 100);

      if(count === len) {
        $loading.querySelector('p').textContent = '100';
        isoLayout();
      }
      // 로딩된 이미지 갯수가 리스트 총 갯수와 같아지면 함수실행
    })

    el.addEventListener('error', ()=>{
      // el.closest('.item').style.display = 'none';
      // 에러 대상 완전히 지움
      
      if (el.className === 'thumbnail') {
        el.setAttribute('src', '../img/no_image.png');
        // thumbnail 엑박 방지
      } else {
        el.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif');
        // buddyIcon 엑박 방지
      }
    })
  }
}

// 레이아웃 설정 
function isoLayout(){
  changScreen('show');

  // new Isotope( $list, {
  //   // options
  //   itemSelector: '.item',
  //   columnWidth: '.item',
  //   transitionDuration: '0.5s'
  // });
}