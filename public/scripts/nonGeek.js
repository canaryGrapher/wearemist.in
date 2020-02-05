var responsiveness = window.matchMedia("(max-width: 1000px)");
function changeScrollerText(responsiveness) {
    //For changing the scroll/ swipe text based on the screen size
    var responsiveNavibar = document.getElementById("responsiveNavbar");
    var normalNavibar = documnet.getElementById("navbar");
    changeScrollerText(responsiveness);
    responsiveness.addListener(changeScrollerText);
    if (responsiveness.matches) {
        normalNavibar.style.display = "none";
        responsiveNavibar.style.display = "inline-block";
    } else {
        normalNavibar.style.display = "flex";
        responsiveNavibar.style.display = "none";
    }
}

function showResNav() {
    document.getElementById("responsiveNavItems").style.display = "flex";
    document.getElementById("responsiveNavbar").style.height = "100vh";
    showMenu = 1;
    document.getElementById("responsiveNavItems").style.height = "60vh";
}

function hideResNav() {
    document.getElementById("responsiveNavItems").style.display = "none";
    document.getElementById("responsiveNavbar").style.height = "40px";
    showMenu = 0;
    document.getElementById("responsiveNavItems").style.height = "0vh";
}


showMenu = 0;
//for changing the navigation bar based on the size of the screen
function makeCross(x) {
    x.classList.toggle("change");
    if (showMenu == 0) {
        showResNav();
    }
    else if (showMenu == 1) {
        hideResNav();
    }
}