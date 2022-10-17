const $form = document.querySelector('form');
const $inputs = $form.querySelectorAll('.chkThis');

// 입력 시 체크
for (let el of $inputs) {
  // 각 input 요소 돌면서 확인
  el.addEventListener('input', (e)=>{
    // event 'input' = input 값 변경될때
    // keyup으로 하면 checkbox를 감지할 수 없음
    const inputName = e.target.name;
    errorReset(inputName);
    checkEveryInput(inputName);
  })
}

// SUBMIT 버튼
$form.addEventListener('submit',(e)=>{

  errorReset();
   // 에러 리셋

  for (let el of $inputs) {
    // 각 input 요소 돌면서 확인
    const inputName = el.name;
    errorReset(inputName);
    checkEveryInput(inputName, e);
    // 에러 여부 반환
  }
})

// 리셋 버튼
$form.addEventListener('reset',()=>{
  errorReset();
})

// 인풋 별 체크
function checkEveryInput(inputName, e) {
  switch (inputName) {
    case 'chkTerm1':
      if (checkCheck(inputName)) {
        if (e) e.preventDefault();
        errorMsg(inputName, '약관에 동의하셔야 가입이 가능합니다');
      }
      break;

    case 'chkTerm2':
      if (checkCheck(inputName)) {
        if (e) e.preventDefault();
        errorMsg(inputName, '약관에 동의하셔야 가입이 가능합니다');
      }
      break;

    case 'chkTerm3':
      if (checkCheck(inputName)) {
        if (e) e.preventDefault();
        errorMsg(inputName, '약관에 동의하셔야 가입이 가능합니다');
      }
      break;

    case 'userId':
      const idError = checkId(inputName, 6);
      if (idError) {
        if (e) e.preventDefault();
        errorMsg(inputName, `${idError.join(', ')}`);
      }
      break;

    case 'password':
      const pwError = checkPw(inputName, 6);
      if (pwError) {
        if (e) e.preventDefault();
        errorMsg(inputName, `${pwError.join(', ')}`);
      }
      break;

    case 'password2':
      if (checkSamePw('password', inputName)) {
        if (e) e.preventDefault();
        errorMsg(inputName, '같은 비밀번호를 입력하세요');
      }
      break;

    case 'userName':
      if (checkLen(inputName, 3)) {
        if (e) e.preventDefault();
        errorMsg(inputName, '3글자 이상 입력하세요');
      }
      break;

    case 'gender':
      
      if (checkCheck(inputName)) {
        if (e) e.preventDefault();
        errorMsg(inputName, '성별을 선택하세요');
      }
    break;

    case 'emailId':
      if (checkLen(inputName, 1)) {
        if (e) e.preventDefault();
        errorMsg(inputName, '이메일 주소를 입력하세요');
      }
      break;

    case 'tel1':
    case 'tel2':
    case 'tel3':
      if (checkLen('tel1', 1) || checkLen('tel2', 1) || checkLen('tel3', 1)) {
        if (e) e.preventDefault();
        errorMsg('tel3', '연락처를 입력하세요');
      }
      break;

    case 'comment':
      if (checkLen(inputName, 20)) {
        if (e) e.preventDefault();
        errorMsg(inputName, '20글자 이상 입력하세요');
      }
      break;
  }
}

// 입력 길이 확인
function checkLen(name, len = 1) {
  const $input = $form.querySelector(`[name=${name}]`);
  const txt = $input.value.trim();

  return txt.length < len ? true : false;
}

// 입력 아이디 확인
function checkId(name, len = 6) {
  const $input = $form.querySelector(`[name=${name}]`);
  const txt = $input.value.trim();

  const errReason = [];
  if (txt.length < len) errReason.push(`${len}글자 이상 입력하세요`)
  const regexpEng = /^[a-z]|[0-9]|[_-]$/;
  if (!regexpEng.test(txt)) errReason.push(`영소문자, 숫자, 특수문자(-,_) 만 입력 가능합니다`)

  return errReason.length ? errReason : false;
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