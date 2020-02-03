function changeScrollerText(responsiveness) {
    //For changing the scroll/ swipe text based on the screen size
    var responsiveNavibar = document.getElementById("responsiveNavbar");
    var normalNavibar = documnet.getElementById("navbar");
    var scrollText = document.getElementById("scrollerText");
    if (responsiveness.matches) {
        window.onscroll = function () {
            if (responsiveness.matches) {
                scrollFunction();
            }
        };
        scrollText.innerHTML = "Swipe for More";
        normalNavibar.style.display = "none";
        responsiveNavibar.style.display = "inline-block";
    } else {
        scrollText.innerHTML = "Scroll for More";
        normalNavibar.style.display = "flex";
        responsiveNavibar.style.display = "none";
    }
}
var responsiveness = window.matchMedia("(max-width: 1000px)");
changeScrollerText(responsiveness);
responsiveness.addListener(changeScrollerText);


//for changing the navigation bar based on the size of the screen
function makeCross(x) {
    x.classList.toggle("change");
}

function scrollFunction() {
    if (
        document.body.scrollTop > 350 ||
        document.documentElement.scrollTop > 800
    ) {
        document.getElemenstByclassName("hamString").style.backgroundColor = "black";
    } else {
        document.getElemenstByclassName("hamString").style.backgroundColor = "white";
    }
}
