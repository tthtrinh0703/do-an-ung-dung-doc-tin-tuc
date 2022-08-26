'use strict'

//9.setting


//Tạo các biến dữ liệu lấy từ form và các nút để bắt sự kiện
const pageSizeInput = document.querySelector("#input-page-size");
const categoryInput = document.querySelector("#input-category");
const saveBtn = document.querySelector("#btn-submit");
const KEYSETTING = "SETTING";


//Nhấn nút save sẽ valita form và lưu dữ liệu nhận đc vào trong localStorage nếu
// validate thành công
saveBtn.addEventListener("click",function(){
	function validate() {
		let check = true;
		let message = "";
		if(!pageSizeInput.value){
			check = false;
			message = "Please fill in News per page 💖";
		}if(pageSizeInput.value <= 0 || pageSizeInput.value>20){
			check = false;
			message = "News per page must be between 1 and 20 💖";
		}
		return {ok: check,alertMessage: message};
	}
	const validateForm = validate();
	if(validateForm.ok){
		const setting = {
			news: parseInt(pageSizeInput.value),
			category: categoryInput.value,
		};
		console.log(setting);
		localStorage.setItem(KEYSETTING,JSON.stringify(setting));
		alert("Save setting successfully 💖");
	}else{
		alert(validateForm.alertMessage);
	}
})

console.log(JSON.parse(localStorage.getItem(KEYSETTING)));