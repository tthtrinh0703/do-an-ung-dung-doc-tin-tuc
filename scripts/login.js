'use strict'


//3.Chức năng login

//Nhập dữ liệu từ form và tạo các nút bắt sự kiện
const UsernameInput = document.querySelector("#input-username");
const PasswordInput = document.querySelector("#input-password");
const loginBtn = document.querySelector("#btn-submit");


//lấy dữ liệu những tài khoản đã register trong phần 1,2
const KEY = "USER_ARRAY";
let userArr;
if (!localStorage.getItem(KEY)) {
	userArr = [];
} else {
	userArr = JSON.parse(localStorage.getItem(KEY));
}
const KEYCURRENT = "USER_CURRENT";


//Thêm sự kiện vào nút login
loginBtn.addEventListener("click", function() {
	//Hàm validate form login
	function validate() {
		let check = true;
		let message = "";
		if (!PasswordInput.value) {
			check = false;
			message = "Please fill in Password 💖";
		}
		if (!UsernameInput.value) {
			check = false;
			message = "Please fill in Username 💖";
		}
		return {
			ok: check,
			alertMessage: message
		};
	}
//Tạo biến validateForm để chạy hàm validate
	const validateForm = validate();
//Nếu form login chuẩn kiểm tra xem user nhân từ form input có trong các class user đã register không 
//bằng cách sử dụng hàm forEach.
	if (validateForm.ok) {
		let checkUser = false;
		userArr.forEach((user) => {
			if (user.Password === PasswordInput.value && user.Username === UsernameInput.value) {
				checkUser = true;
				localStorage.setItem(KEYCURRENT, JSON.stringify(user));
				alert("LOGIN successfull!!💖");
				window.location.href = 'C:/xampp/htdocs/Assignment 03 (Stater)/index.html';
			}
		});
		if (!checkUser) alert("Can't find User💖");
	} else {
		alert(validateForm.alertMessage);
	}
})