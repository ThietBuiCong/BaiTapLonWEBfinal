let usersArray = [];

function saveData() {
  const inputName = document.getElementById('inputUsername').value.trim();
  const inputPassword1 = document.getElementById('inputPassword1').value;
  const inputPassword2 = document.getElementById('inputPassword2').value;

  if (inputName === '' || inputPassword1 === '') {
    alert("Please fill in all fields");
    return;
  }

  usersArray = JSON.parse(localStorage.getItem('usersArray')) || [];

  if (inputPassword1 !== inputPassword2) {
    alert("Confirmed Password does not match!!! Please try again");
    return;
  }

  let isUsernameExist = false;
  for (let i = 0; i < usersArray.length; i++) {
    if (usersArray[i].name === inputName) { // sửa thành .name chứ ko phải .inputName
      isUsernameExist = true;
      break;
    }
  }
  if (isUsernameExist) {
    alert("Username already exists!!! Please try another one");
    return;
  }

  if (inputPassword1.length < 8) {
    alert("Password needs to be at least 8 characters long!!! Please try again");
    return;
  }

  usersArray.push({ name: inputName, password: inputPassword1 });

  localStorage.setItem('usersArray', JSON.stringify(usersArray));
  alert("You have created an account !!!");
  window.location.href = "../taskbar/signin.html";
}

let isLogin = false;

function checkLogin() {
  usersArray = JSON.parse(localStorage.getItem('usersArray')) || [];

  const loginName = document.getElementById('loginName').value.trim();
  const loginPassword = document.getElementById('loginPassword').value;

  for (let i = 0; i < usersArray.length; i++) {
    if (usersArray[i].name === loginName && usersArray[i].password === loginPassword) {
      isLogin = true;
      // Lưu user hiện tại vào localStorage
      localStorage.setItem('currentUser', JSON.stringify(usersArray[i]));
      // Quan trọng: Lưu trạng thái đăng nhập
      localStorage.setItem('isLogin', 'true');
      break;
    }
  }

  if (!isLogin) {
    alert("Incorrect username or password!!! Please try again");
    document.getElementById('loginPassword').value = '';
  } else {
    alert("You have logged in successfully!!!");
    window.location.href = "../index.html";
  }
}
function listGuide() {
  const list = document.getElementById("list");
  if (list.style.display === "none" || list.style.display === "") {
    list.style.display = "block";
  } else {
    list.style.display = "none";
  }
}
