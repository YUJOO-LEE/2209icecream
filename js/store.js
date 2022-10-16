// 71bc6dc9e23e2fddadaa922419145b18

const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
const branchBtns = document.querySelectorAll('.storeList li');
let zoom = true;  // 줌 허용 여부

const options = { //지도를 생성할 때 필요한 기본 옵션
	center: new kakao.maps.LatLng(37.5208062, 127.0227158), //지도의 중심좌표.
	level: 3 //지도의 레벨(확대, 축소 정도)
};

const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

const markerOptions = [
  {
    title: 'Main shop',
    latLng: new kakao.maps.LatLng(37.5208062, 127.0227158),
    button: branchBtns[0]
  },
  {
    title: 'Coex Mall',
    latLng: new kakao.maps.LatLng(37.5118014, 127.0609938),
    button: branchBtns[1]
  },
  {
    title: 'Times Square',
    latLng: new kakao.maps.LatLng(37.5171885, 126.9035385),
    button: branchBtns[2]
  },
  {
    title: 'Hongik University',
    latLng: new kakao.maps.LatLng(37.5534726, 126.9232678),
    button: branchBtns[3]
  },
  {
    title: 'Myeongdong',
    latLng: new kakao.maps.LatLng(37.5632348, 126.9846716),
    button: branchBtns[4]
  }
]

for (let i = 0; i < markerOptions.length; i++) {

  // 인포윈도우에 표출될 내용
  const iwContent = `<div class="infoWindow">
    <h3>${markerOptions[i].title}</h3>
    <p>
      <a href="https://map.kakao.com/link/map/${markerOptions[i].title},${markerOptions[i].latLng}" target="_blank">View Detail</a>
      <a href="https://map.kakao.com/link/to/${markerOptions[i].title},${markerOptions[i].latLng}" target="_blank">Finding a way</a>
    </p>
  </div>`;


  // 여러 개 인포 윈도우 생성
  new kakao.maps.InfoWindow({
    map: map,
    position: markerOptions[i].latLng, 
    content: iwContent
  })

  // 버튼에 이벤트 부여해서 지도 중심 이동
  markerOptions[i].button.addEventListener('click', ()=>{
    for (let el of branchBtns) el.classList.remove('on');
    markerOptions[i].button.classList.add('on');
    moveTo(markerOptions[i].latLng);
  })
}

// 이동 이벤트
function moveTo(target){
  map.setCenter(target);
}

// 최초 실행 시 중심점 세팅
moveTo(markerOptions[0].latLng);


// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
const mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
const zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

setZoomable(zoom);  // 줌 허용여부에 따라 줌 제어
function setZoomable(zoom){
  map.setZoomable(zoom);
}

// 브라우저 리사이즈 시 지도 중심 이동
window.addEventListener('resize', ()=>{
  const activeLi = document.querySelector('.storeList li.on');
  const activeIndex = activeLi.dataset.index;
  moveTo(markerOptions[activeIndex].latLng);
})

