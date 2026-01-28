/*************************************************
 * API TĨNH – GIẢ LẬP DỮ LIỆU BÊN NGOÀI
 *************************************************/
const API_MOVIES = [
  {
    id: 101,
    title: "Interstellar",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    duration: 169,
    actors: ["Matthew McConaughey", "Anne Hathaway"],
    genre: ["Khoa học viễn tưởng", "Phiêu lưu"],
    description: "Một nhóm nhà du hành vượt không gian để cứu lấy tương lai nhân loại.",
    price: 95000,
    rating: 8.6,
    releaseDate: "2014-11-07",
    status: "now"
  },
  {
    id: 102,
    title: "Your Name",
    poster: "https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg",
    duration: 106,
    actors: ["Ryunosuke Kamiki", "Mone Kamishiraishi"],
    genre: ["Anime", "Lãng mạn", "Giả tưởng"],
    description: "Hai con người xa lạ kết nối với nhau thông qua giấc mơ kỳ lạ.",
    price: 85000,
    rating: 8.4,
    releaseDate: "2016-08-26",
    status: "now"
  },
  {
    id: 103,
    title: "5 Centimeters per Second",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoWNuexW4wGZaOAapRLJUlT78jG38KIIS6HBtTjK8CRyRNTTJ9wZ51qgpIXbzbGaTkcOf8ZesfTKj64gAmkoVcK3_fzVLzIM3ZYBoDN6E&s=10",
    duration: 104,
    actors: ["Kenji Mizuhashi", "Yoshimi Kondō", "Satomi Hanamura", "Ayaka Onoue", "Risa Mizuno"],
    genre: ["Romance", "Drama", "Animation"],
    description: "Một bộ phim anime cảm động kể về tình yêu đầu và ký ức xa cách..",
    price: 95.000,
    rating: 8.6,
    releaseDate: "2025-12-23",
    status: "now"
  },
  {
    id: 104,
    title: "Conan: Quả Bom Chọc Trời",
    poster: "https://upload.wikimedia.org/wikipedia/vi/3/39/Caseclosed_the_time_bombed_%28movie_1%29.jpg",
    duration: 166,
    actors: ["Minami Takayama","Kappei Yamaguchi","Wakana Yamazaki"],
    genre: ["Hoạt hình","Hành động","Bí ẩn","Phiêu lưu"],
    description: "Phần phim điện ảnh đầu tiên của Conan, Conan phải vô hiệu hóa bom khắp Tokyo để cứu nguy thành phố.",
    price: 90000,
    rating: 8.0,
    releaseDate: "2026-01-23",
    status: "soon"
  },
  {
    id: 105,
    title: "Dune: Part Two#",
    poster: "https://image.tmdb.org/t/p/w500/gho58bYmw9juYXmUSHRJKOngJGn.jpg",
    duration: 166,
    actors: ["Timothée Chalamet", "Zendaya"],
    genre: ["Hành động", "Khoa học viễn tưởng"],
    description: "Paul Atreides đối mặt số phận và dẫn dắt cuộc chiến trên hành tinh Arrakis.",
    price: 105000,
    rating: 8.8,
    releaseDate: "2026-02-06",
    status: "soon"
  },
];

/*************************************************
 * RENDER TRANG CHỦ (INDEX.HTML)
 *************************************************/
const movieNow = document.getElementById("movieNow");
const movieSoon = document.getElementById("movieSoon");

if (movieNow && movieSoon) {
  movieNow.innerHTML = API_MOVIES
    .filter(movie => movie.status === "now")
    .map(renderMovieCard)
    .join("");

  movieSoon.innerHTML = API_MOVIES
    .filter(movie => movie.status === "soon")
    .map(renderMovieCard)
    .join("");
}

function renderMovieCard(movie) {
  return `
    <div class="movie-card">
      <img src="${movie.poster}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>⭐ ${movie.rating}/10</p>
      <button onclick="goDetail(${movie.id})">
        Xem chi tiết
      </button>
    </div>
  `;
}

/*************************************************
 * ĐIỀU HƯỚNG SANG TRANG CHI TIẾT
 *************************************************/
function goDetail(id) {
  window.location.href = `movie-detail.html?id=${id}`;
}

/*************************************************
 * RENDER TRANG CHI TIẾT (MOVIE-DETAIL.HTML)
 *************************************************/
const detailBox = document.getElementById("movieDetail");

if (detailBox) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const movie = API_MOVIES.find(m => m.id == id);

  if (movie) {
    detailBox.innerHTML = `
      <div class="detail-container">
        <img src="${movie.poster}" class="detail-poster">

        <div class="detail-info">
          <h1>${movie.title}</h1>

          <p><b>⏱ Thời lượng:</b> ${movie.duration} phút</p>
          <p><b>🎭 Diễn viên:</b> ${movie.actors.join(", ")}</p>
          <p><b>🎬 Thể loại:</b> ${movie.genre.join(", ")}</p>
          <p><b>⭐ Đánh giá:</b> ${movie.rating}/10</p>
          <p><b>📅 Khởi chiếu:</b> ${movie.releaseDate}</p>

          <p class="desc">${movie.description}</p>

          <div class="price">
            Giá vé: <span>${movie.price.toLocaleString()} VNĐ</span>
          </div>

          <button class="buy-btn">🎟 Mua vé</button>
        </div>
      </div>
    `;
  }
}

// ================= LOGIN MOCK =================
function login(username) {
  localStorage.setItem("user", username);
  location.reload();
}

function logout() {
  localStorage.removeItem("user");
  location.reload();
}

function getUser() {
  return localStorage.getItem("user");
}

// ================= COMMENT =================
function getComments(movieId) {
  return JSON.parse(localStorage.getItem(`comments_${movieId}`)) || [];
}

function addComment(movieId) {
  const user = getUser();
  const input = document.getElementById("commentInput");
  const text = input.value.trim();

  if (!text) return;

  const comments = getComments(movieId);
  comments.push({
    user,
    text,
    time: new Date().toLocaleString("vi-VN")
  });

  localStorage.setItem(`comments_${movieId}`, JSON.stringify(comments));
  input.value = "";
  renderComments(movieId);
}

function renderComments(movieId) {
  const list = document.getElementById("commentList");
  const comments = getComments(movieId);

  list.innerHTML = comments.map(c => `
    <div class="comment-item">
      <b>${c.user}</b>
      <span>${c.time}</span>
      <p>${c.text}</p>
    </div>
  `).join("");
}

// ================= COMMENT UI =================
if (detailBox && movie) {
  const user = getUser();

  const loginBox = document.getElementById("loginBox");
  const inputBox = document.getElementById("commentInputBox");

  if (user) {
    loginBox.innerHTML = `
      <p>👋 Xin chào <b>${user}</b>
      <button onclick="logout()">Đăng xuất</button></p>
    `;

    inputBox.innerHTML = `
      <textarea id="commentInput" placeholder="Nhập bình luận..."></textarea>
      <button onclick="addComment(${movie.id})">Gửi bình luận</button>
    `;
  } else {
    loginBox.innerHTML = `
      <input id="usernameInput" placeholder="Nhập tên để đăng nhập">
      <button onclick="login(document.getElementById('usernameInput').value)">
        Đăng nhập để bình luận
      </button>
    `;
  }

  renderComments(movie.id);
}

