 'use strict'

//8.Hiển thị Todo List
//Để sử dụng được Todo List thì phải đăng nhập


//Lấy dự liệu USER_CURRENT từ localStorage để biết user đang sử dụng
const KEYCURRENT = "USER_CURRENT";
const userCurrent = JSON.parse(localStorage.getItem(KEYCURRENT));

//Tạo nút để bắt tự kiện và task nhận đc từ form
const addBtn = document.querySelector("#btn-add");
const taskInput = document.querySelector("#input-task");

//Tạo 2 mảng các Task gồm mảng chứa tất cả task và 1 mảng chứa Task của user đang sử dụng
let todoArr;
let todoArrCurrent;
const KEYTODO = "TODO"

//Mảng Task người đang sử dụng lấy từ mảng chứa tất cả Task bằng cách sử dụng array.filter
function todoArrCrt(todoArr){
	return todoArr.filter((todo) => todo.owner === userCurrent.Username);
}

//Lấy mảng chứa tất cả Task từ localStorage
if (!localStorage.getItem(KEYTODO)) {
	todoArr = [];
	todoArrCurrent = [];
} else {
	todoArr = JSON.parse(localStorage.getItem(KEYTODO));
	if(userCurrent){
	todoArrCurrent = todoArrCrt(todoArr);
	}else{
		alert("You must login to use Todo List 💖");
		todoArrCurrent = [];
	}
}

//Class Task với task,owner và isDone
class Task {
	constructor(task, owner,isDone) {
		this.task = task;
		this.owner = owner;
		this.isDone = false;
	}
}

//Biến todoList để hiển thị các Task
const todoList = document.querySelector("#todo-list");

//Hàm render hiển thị các Task với tham số nhận vào là 1 mảng các class Task
function renderTodo(todos) {
	todoList.innerHTML = "";
	todos.forEach((todo) => {
		const newTask = document.createElement("li");
		newTask.setAttribute("id-task", todo.task);
		if (todo.isDone) newTask.classList.add("checked");
		newTask.innerHTML = `${todo.task}<span class="close" id="${todo.task}">×</span>`
		todoList.appendChild(newTask);
	})
}

//Hiển thị các Task của user đang sử dụng.
renderTodo(todoArrCurrent);

//Thêm sự kiện vào nút add thêm Task cho user đang sử dụng
addBtn.addEventListener("click", function() {
//Hàm validate
	function validate() {
		let check = true;
		let message;
		if (!taskInput.value) {
			check = false;
			message = "Please fill in Task 💖";
		}
		for (let i = 0; i < todoArrCurrent.length; i++) {
			if (todoArrCurrent[i].task === taskInput.value) {
				check = false;
				message = "This task already exists 💖"
			}
		}
		if (!userCurrent) {
			check = false;
			message = "You must login to use Todo List 💖"
		}
		return {
			ok: check,
			alertMessage: message
		};
	}
	const validateForm = validate();
//Nếu validate thành công thêm task vào mảng tất cả các task trong localStorage rồi filter lại mảng
// các Task của user đang sử dụng rồi hiển thị lại
	if (validateForm.ok) {
		const newTodo = new Task(taskInput.value, userCurrent.Username);
		todoArr.push(newTodo);
		localStorage.setItem(KEYTODO, JSON.stringify(todoArr));
		todoArrCurrent = todoArrCrt(todoArr);
		renderTodo(todoArrCurrent);
		taskInput.value = "";
	} else {
		alert(validateForm.alertMessage);
	}

})

//Đánh dấu isDone cho các Task 
//tạo sự kiện khi nhấn vào các task hiển thị để thay đổi thuộc tính isDone của nó trong 
// mảng tất cả Task trong localStorage rồi hiển thị lại
todoList.addEventListener("click", function(e) {
	if (e.target.tagName === "SPAN") return;
	const idTask = e.target.getAttribute("id-task");
	todoArr[todoArr.findIndex((todo) => todo.task === idTask && todo.owner === userCurrent.Username)].isDone =todoArr[todoArr.findIndex((todo) => todo.task === idTask && todo.owner === userCurrent.Username)].isDone? false:true;
	localStorage.setItem(KEYTODO, JSON.stringify(todoArr));
	todoArrCurrent = todoArrCrt(todoArr);
	renderTodo(todoArrCurrent);
})

//Xóa các Task
// Tạo sự kiện khi nhấn vào span X để xóa task đã ấn trong mảng các task rồi hiển thị lại
todoList.addEventListener("click",function(e){
	if(e.target.tagName !== "SPAN") return;
	const id = e.target.getAttribute("id");
	todoArr.splice(todoArr.findIndex(todo => todo.task === id && todo.owner === userCurrent.Username), 1);
	localStorage.setItem(KEYTODO, JSON.stringify(todoArr));
	todoArrCurrent = todoArrCrt(todoArr);
	renderTodo(todoArrCurrent);
})

