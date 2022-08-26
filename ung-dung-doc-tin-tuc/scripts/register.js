'use strict'

// 1.Tạo class
// 2.Chức năng Register

//Nhập dữ liệu từ form và tạo các nút bắt sự kiện
const firstNameInput = document.querySelector("#input-firstname");
const lastNameInput = document.querySelector("#input-lastname");
const UsernameInput = document.querySelector("#input-username");
const PasswordInput = document.querySelector("#input-password");
const PasswordConfirmInput = document.querySelector("#input-password-confirm");
const registerBtn = document.querySelector("#btn-submit");


//Tạo dữ liệu trong localStorage với Key = "USER_ARRAY" và Value là dãy các class user
const KEY = "USER_ARRAY";
let userArr;
if (!localStorage.getItem(KEY)) {
	userArr = [];
} else {
	userArr = JSON.parse(localStorage.getItem(KEY));
}


//Class user và constructor với đầu vào firstName,lastName,UserName,Password
class user {
	constructor(firstName, lastName, Username, Password) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.Username = Username;
		this.Password = Password;
	}
}

//Bắt sự kiện vào nút Register
registerBtn.addEventListener("click", function() {
	//function validate dữ liệu nhận đc từ form trả về 1 object với điều kiện và message
	function validate() {
		let check = true;
		let message = "";
		if (!PasswordInput.value) {
			check = false;
			message = "Please fill in Password 💖";
		}
		if (PasswordInput.value.length < 8) {
			check = false;
			message = "Length of Password >= 8 💖";
		}
		if (PasswordConfirmInput.value !== PasswordInput.value) {
			check = false;
			message = "Confirm Password error 💖";
		}
		if (!UsernameInput.value) {
			check = false;
			message = "Please fill in Username 💖";
		}
		userArr.forEach((user) => {
			if (UsernameInput.value === user.Username) {
				check = false;
				message = "UserName must unique 💖";
			}
		});
		if (!lastNameInput.value) {
			check = false;
			message = "Please fill in Last Name 💖";
		}
		if (!firstNameInput.value) {
			check = false;
			message = "Please fill in First Name 💖";
		}
		return {
			ok: check,
			alertMessage: message
		};
	}
//Tạo biến validateForm để chạy function validate
	const validateForm = validate();
//Nếu form đúng chuẩn thì tạo 1 class user với dữ liệu từ form đó thêm vào array các class trong localStorage
//và chuyển sang giao diện login
//Nếu form không đúng thì đưa ra lời nhắn cho người dùng
	if (validateForm.ok) {
		const user_data = new user(firstNameInput.value, lastNameInput.value, UsernameInput.value, PasswordInput.value);
		userArr.push(user_data);
		localStorage.setItem(KEY, JSON.stringify(userArr));
		window.location.href = '../pages/login.html';
	} else {
		alert(validateForm.alertMessage);
	}
})