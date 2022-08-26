'use strict'


//6.Hiển thị các bài viết
//7.Chuyển trang các bài viết
//9.Setting

//Tạo các nút để bắt sự kiện
const newContainer = document.querySelector("#news-container");
const prevBtn = document.querySelector("#btn-prev");
const nextBtn = document.querySelector("#btn-next");
const pageNum = document.querySelector("#page-num");

//Lấy dữ liệu từ setting trong localStorage trong phần 9.
//Nếu chưa setting thì lấy dữ liệu mặc đinh là 5 news 1 page với category là General
const KEYSETTING = "SETTING";
let setting;
if (!localStorage.getItem(KEYSETTING)) {
	setting = {
		news: 5,
		category: "General",
	}
} else {
	setting = JSON.parse(localStorage.getItem(KEYSETTING));
}

//Tạo biến page = 1 để phục vụ việc chuyển trang và biến endPage
let page = 1;
let endPage;

//Tạo hàm với tham số nhận vào là page hiển thị các bài viết tương ứng với page nhận vào
const news = async function(page) {
	//Tạo biến new1 là fetch api lấy từ newsapi với tham số nhận vào là category, page, và news
	//Sử dụng hàm .json() để tạo biến new2 là 1 obj từ new1
	const new1 = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${setting.category}&page=${page}&pageSize=${setting.news}&apiKey=4b86b821e15741c6974fadfeb2358de0`);
	const new2 = await new1.json();
	//Biến endPage là trang cuối cùng từ tổng số bài viết nhận đc và số trang viết mỗi page
	endPage = await Math.ceil(new2.totalResults / setting.news);
	//Sử dụng forEach để mỗi news nhận được tạo 1 div với các tham số title,Img,desctiption,url từ new2 rồi thêm vào 
	//khối div newContainer đã cho
	newContainer.innerHTML = "";
	new2.articles.forEach((article) => {
		if (!article.description || !article.url || !article.title || !article.urlToImage) return;
		const content = document.createElement("div");
		content.classList.add("content")
		content.innerHTML = `<img src=${article.urlToImage}>
						 <div>
	    				 <h1>${article.title}</h1>
	    				 <p>${article.description}</p>
	    				 <button type="button" class="btn btn-primary"><a href="${article.url}">View</a></button>
	    				 </div> `;
		newContainer.appendChild(content);
	})
}

//Hàm firstpage ẩn nút previous
function firstPage() {
	prevBtn.classList.add("hidden");
}

//Hàm lastPage ẩn nút next
function lastPage() {
	nextBtn.classList.add("hidden");
}

//Giao diện ban đầu là page 1 nên ẩn nút previous và hiển thị các news trong page 1
news(page);
firstPage();

//Khi nhấn nút next thì tăng page lên 1 và hiển thị lại các bài viết trong trang tiếp theo
//Nếu là trang cuối thì chạy hàm lastPage
nextBtn.addEventListener("click", function() {
	page += 1;
	news(page);
	if (page === endPage) lastPage();
	prevBtn.classList.remove("hidden");
	pageNum.textContent = page;
});

//Khi nhấn nút previous thì giảm page đi 1 và hiển thị lại các bài viết trong trang trước đó
//Nếu là trang đầu thì chạy hàm firstPage
prevBtn.addEventListener("click", function() {
	page -= 1;
	news(page);
	if (page === 1) firstPage();
	nextBtn.classList.remove("hidden");
	pageNum.textContent = page;
})