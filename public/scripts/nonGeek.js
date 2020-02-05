function showResNav() {
    document.getElementById("responsiveNavItems").style.display = "flex";
    document.getElementById("responsiveNavbar").style.height = "100vh";
    showMenu = 1;
    document.getElementById("responsiveNavItems").style.height = "60vh";
}

function hideResNav() {
    document.getElementById("responsiveNavItems").style.height = "0vh";
    document.getElementById("responsiveNavItems").style.display = "none";
    document.getElementById("responsiveNavbar").style.height = "40px";
    showMenu = 0;
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

function hideCross() {
    document.getElementById("barContainer").classList.toggle("change");
}

function clickLinks() {
    hideResNav();
    hideCross();
}