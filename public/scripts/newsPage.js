window.onscroll = function() {
  scrollFunction();
};

window.onload = function() {
  document.getElementById("navbarScroll").style.display = "none";
};

function scrollFunction() {
  var navibar = document.getElementById("navbar");
  var naviScroll = document.getElementById("navbarScroll");
  if (
    document.body.scrollTop > 350 ||
    document.documentElement.scrollTop > 350
  ) {
    navibar.style.display = "none";
    naviScroll.style.display = "flex";
  } else {
    navibar.style.display = "flex";
    naviScroll.style.display = "none";
  }
}
