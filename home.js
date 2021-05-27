let btn = document.querySelector("#btn");
let sidebar = document.querySelector(".sidebar");
let searchBtn = document.querySelector(".bx-search");

window.addEventListener('load', sider);

function sider() {

    sidebar.classList.toggle("active");
}

btn.onclick = function() {
    sidebar.classList.toggle("active");
    if (document.getElementById('naver').style.left == "240px") {
        document.getElementById('naver').style.left = "78px";
    } else {
        document.getElementById('naver').style.left = "240px";

    }
}