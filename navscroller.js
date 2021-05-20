var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    var viewportWidth = screen.width;
    if (viewportWidth < 900) {
        if (prevScrollpos < 400) {
            document.getElementsByClassName("sidebar")[0].style.left = "0px";
            document.getElementsByClassName("home_content")[0].style.left = "78px";

        } else {
            document.getElementsByClassName("sidebar")[0].style.left = "-78px";
            document.getElementsByClassName("home_content")[0].style.left = "0px";
            document.getElementsByClassName("home_content")[0].style.width = "100%";
        }
        prevScrollpos = currentScrollPos;
    }
}