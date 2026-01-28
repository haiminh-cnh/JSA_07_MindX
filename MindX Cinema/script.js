function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function register() {
    const username = document.getElementById("regUsername").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    const confirm = document.getElementById("regConfirm").value;

    if (!username || !email || !password || !confirm) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
    }

    if (password !== confirm) {
        alert("Mật khẩu không khớp");
        return;
    }

    let users = getUsers();
    let exists = users.find(u => u.username === username);

    if (exists) {
        alert("Tài khoản đã tồn tại");
        return;
    }

    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công!");
    window.location.href = "login.html";
}

function login() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    let users = getUsers();
    let user = users.find(u => u.username === username & u.password === password);

    if (!user) {
        alert("Sai tài khoản hoặc mật khẩu");
        return;
    }
}

function login() {
    window.location.href = "index.html";
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
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
