'use strict'


//4.Home Page
//5.Chức năng logout

//Lấy dữ liệu về user đã login trong phần 3.
const KEYCURRENT = "USER_CURRENT";
const userCurrent = JSON.parse(localStorage.getItem(KEYCURRENT));

//Tạo các nút để bắt sự kiện
const loginModal = document.querySelector("#login-modal");
const mainContent = document.querySelector("#main-content");
const logoutBtn = document.querySelector("#btn-logout");


//Nếu login rồi thì hiện nút logout ẩn 2 nút register và login bằng cách thêm class hidden
//Nếu không thì ngược lại
if (!userCurrent) {
	mainContent.classList.add("hidden");
} else {
	document.querySelector("#welcome-message").textContent = `Welcome ${userCurrent.firstName}`;
	loginModal.classList.add("hidden");
}

//Nếu nhấn nút logout thì đăng xuất bằng cách xóa dữ liệu về USER_CURENT trong localStorage
logoutBtn.addEventListener("click", function() {
	localStorage.removeItem(KEYCURRENT);
	mainContent.classList.add("hidden");
	loginModal.classList.remove("hidden");
})