const board = document.querySelector('.board');
const lis = board.querySelectorAll('li');

for (let i = 0; i < lis.length; i++) {
  lis[i].addEventListener('click', (e)=>{
    e.preventDefault();
    for (let j = 0; j < lis.length; j++) {
      if (lis[j] !== lis[i]) lis[j].classList.remove('on');
    }

    lis[i].classList.toggle('on');
  })
}