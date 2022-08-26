'use strict';


//10.Search

//Tạo các nút sự kiện và biến dữ liệ lấy từ form
const newContainer = document.querySelector("#news-container");
const searchInput = document.querySelector("#input-query");
const searchBtn = document.querySelector("#btn-submit");
const prevBtn = document.querySelector("#btn-prev");
const nextBtn = document.querySelector("#btn-next");
const pageNum = document.querySelector("#page-num");

const KEYSETTING = "SETTING";
const pageSize = 10;
let page = 1;
let endPage;

//Tạo hàm với tham số nhận vào là searchInput từ form với api từ newsapi
const news = async function(q) {
	//Tạo biến new1 sử dụng fetch vói các tham số q nhận đc từ searchInput , page , pageSize = 10
	const new1 = await fetch(`https://newsapi.org/v2/everything?q=${q}&page=${page}&pageSize=${pageSize}&apiKey=4b86b821e15741c6974fadfeb2358de0`);
	const new2 = await new1.json();
	console.log(new2);
	endPage = await Math.ceil(new2.totalResults / pageSize);
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

//Khi nhấn nút search thì validate rồi dùng hàm news ở trên để hiển thị các bài viết liên quan đến searchInput
searchBtn.addEventListener("click", function() {
	if (searchInput.value) {
		const q = searchInput.value;
		news(q);
	} else {
		alert("Please fill in search 💖");
	}
});


//Chức năng chuyển trang làm tương tự như trong phần news
function firstPage() {
	prevBtn.classList.add("hidden");
}

function lastPage() {
	nextBtn.classList.add("hidden");
}
firstPage();
nextBtn.addEventListener("click", function() {
	page += 1;
	news(page);
	if (page === endPage) lastPage();
	prevBtn.classList.remove("hidden");
	pageNum.textContent = page;
});
prevBtn.addEventListener("click", function() {
	page -= 1;
	news(page);
	if (page === 1) firstPage();
	nextBtn.classList.remove("hidden");
	pageNum.textContent = page;
})