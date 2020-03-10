window.onscroll = function () {
  scrollFunction();
  resScrollFunction();
};

window.onresize = function (event) {
  var navibar = document.getElementById("navbar");
  var naviScroll = document.getElementById("navbarScroll");
  if (window.innerWidth <= 1000) {
    navibar.style.display = "none";
    naviScroll.style.display = "none";
  }
  if (window.innerWidth > 1000) {
    scrollFunction();
  }
};

window.onload = function () {
  document.getElementById("navbarScroll").style.display = "none";
};

function scrollFunction() {
  var navibar = document.getElementById("navbar");
  var naviScroll = document.getElementById("navbarScroll");
  if (window.innerWidth > 1000) {
    navibar.style.display = "none";
    naviScroll.style.display = "none";
    if (document.body.scrollTop > 350 || document.documentElement.scrollTop > 350) {
      navibar.style.display = "none";
      naviScroll.style.display = "flex";
    } else {
      navibar.style.display = "flex";
      naviScroll.style.display = "none";
    }
  }
}

showMenu = 0;
//for changing the navigation bar based on the size of the screen
function makeCross(x) {
  x.classList.toggle("change");
  if (showMenu == 0) {
    showResNav();
    document.getElementById("resNavbarLogo").style.display = "none";
  }
  else if (showMenu == 1) {
    hideResNav();
    document.getElementById("resNavbarLogo").style.display = "inherit";

  }
}

function showResNav() {
  document.getElementById("responsiveNavItems").style.display = "flex";
  document.getElementById("responsiveNavbar").style.height = "100vh";
  document.getElementById("responsiveNavbar").style.backgroundColor = "rgba(0, 0, 0, 0.9)";
  showMenu = 1;
  document.getElementById("responsiveNavItems").style.height = "60vh";
  document.getElementById("barContainer").style.transform = "rotate(0deg)";
  document.getElementById("barContainer").innerHTML = "x";
  document.getElementById("barContainer").style.color = "#c62828";

}

function hideResNav() {
  document.getElementById("responsiveNavItems").style.height = "0vh";
  document.getElementById("responsiveNavItems").style.display = "none";
  document.getElementById("responsiveNavbar").style.height = "60px";
  showMenu = 0;
  document.getElementById("responsiveNavbar").style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  document.getElementById("resNavbarLogo").style.display = "inherit";
  document.getElementById("barContainer").style.transform = "rotate(90deg)";
  document.getElementById("barContainer").innerHTML = ">";
  document.getElementById("barContainer").style.color = "#fff";
}

function hideCross() {
  document.getElementById("barContainer").classList.toggle("change");
}

function clickLinks() {
  hideResNav();
  hideCross();
}

function resScrollFunction() {
  var navibar = document.getElementById("responsiveNavbar");
  if (window.innerWidth < 1000) {
    if (document.body.scrollTop > 350 || document.documentElement.scrollTop > 350) {
      navibar.style.backgroundColor = "rgb(0, 0, 0, 0.8)";
    } else {
      navibar.style.backgroundColor = "rgb(0, 0, 0, 0.0)";
    }
  }
}