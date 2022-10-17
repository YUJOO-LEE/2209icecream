const $form = document.querySelector('form');
const $inputs = $form.querySelectorAll('.chkThis');
let isInputChecked = false;

for (let el of $inputs) {
  el.addEventListener('keyup', (e)=>{
    const inputName = e.target.name;
    errorReset(inputName);

    switch (inputName) {
      case 'userId':
        if (checkLen('userId', 5)) {
          errorMsg('userId', '5글자 이상 입력하세요.');
        }
        break;

      case 'password':
        const pwError = checkPw('password', 6);
        if (pwError) {
          errorMsg('password', `${pwError.join(', ')}`);
        }
        break;

      case 'password2':
        if (checkSamePw('password', 'password2')) {
          errorMsg('password2', '같은 비밀번호를 입력하세요.');
        }
        break;

      case 'userName':
        if (checkLen('userName', 3)) {
          errorMsg('userName', '3글자 이상 입력하세요.');
        }
        break;
    }
  

  })
}

// SUBMIT 버튼
$form.addEventListener('submit',(e)=>{

  e.preventDefault();
  errorReset();


  if (checkLen('emailId')) {
    e.preventDefault();
    errorMsg('emailId', '이메일 주소를 입력하세요.');
  }

  if (checkCheck('gender')) {
    e.preventDefault();
    errorMsg('gender', '성별을 선택하세요.');
  }

  if (checkLen('comment', 20)) {
    e.preventDefault();
    errorMsg('comment', '20글자 이상 입력하세요.');
  }

})

// 리셋 버튼
$form.addEventListener('reset',()=>{
  errorReset();
})

// 입력 길이 확인
function checkLen(name, len = 1) {
  const $input = $form.querySelector(`[name=${name}]`);
  const txt = $input.value.trim();

  return txt.length < len ? true : false;
}

// 비밀번호 양식 확인
function checkPw(name, len = 6) {
  const $input = $form.querySelector(`[name=${name}]`);
  const txt = $input.value.trim();

  const errReason = [];
  if (txt.length < len) errReason.push(`${len}글자 이상 입력하세요`)

  const regexp = {
    '숫자를 포함하세요': /[0-9]/,
    '영문자를 포함하세요': /[a-zA-Z]/,
    '특수문자를 포함하세요': /[~!@#$%^&*()_+?<>₩]/
  };
  for (let exp of Object.keys(regexp)) {
    if (!regexp[exp].test(txt)) errReason.push(exp);
  }

  return errReason.length ? errReason : false;
}

// 비밀번호 같은지 확인
function checkSamePw(pw1, pw2) {
  pw1 = $form.querySelector(`[name=${pw1}]`).value.trim();
  pw2 = $form.querySelector(`[name=${pw2}]`).value.trim();

  return !pw2 || pw1 !== pw2 ? true : false;
}

// 체크 유무 확인
function checkCheck(name){
  const $inputs = $form.querySelectorAll(`[name=${name}]`);
  let isChecked = false;

  for (let input of $inputs) if (input.checked) isChecked = true;
  return !isChecked ? true : false;
}

// 셀렉트 선택 여부 확인 (checkLen()으로도 동작함)
function checkSelect(name){
  const $select = $form.querySelector(`[name=${name}]`);
  const selectId = $select.options.selectedIndex; // 선택된 옵션의 Index 반환
  const value = $select[selectId].value;

  return !value ? true : false;
}

// 에러 메세지 출력
function errorMsg(name, msg) {
  const el = $form.querySelector(`[name=${name}]`);
  const errMsg = document.createElement('p');
  errMsg.className = 'hint';
  errMsg.innerHTML = `<i class="fa-solid fa-check"></i> ${msg}`;
  el.closest('li').append(errMsg);
}

// 전체 에러 메세지 삭제
function errorReset(which) {
  if (which) {
    const el = $form.querySelector(`[name=${which}]`);
    el.closest('li').querySelector('.hint')?.remove();
  } else {
    const $p = document.querySelectorAll('.hint');
    for (p of $p) p.remove();
  }
}