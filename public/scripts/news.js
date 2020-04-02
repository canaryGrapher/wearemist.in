var xhttp = new XMLHttpRequest();
window.onload = function () {
    document.getElementById("loaderContainer").style.display = "none";
    document.getElementById("subscribeFillForm").style.display = "none";
    xhttp.open("GET", "/getNews", false);
    xhttp.send();
    recievedData = JSON.parse(xhttp.responseText);
    screenWidth = screen.width;
    this.resizeCheck();
};

window.onresize = function () {
    if (screen.width != screenWidth) {
        resizeCheck();
    }
};

function closeSubscriptionForm() {
    document.getElementById("subscribeFillForm").style.display = "none";
}

function showSubscriptionForm() {
    document.getElementById("subscribeFillForm").style.display = "inherit";
    hideResNav();
}

function setDataBigScreen() {
    var i = 0;
    document.getElementById("mainNewsContainer").innerHTML = "";
    for (var val in recievedData) {
        if (i == 0) {
            document.getElementById("recentSelectedText").innerHTML = `${recievedData[i].newsHeading}<script></script>`;
            document.getElementById("articleCredit").innerHTML = recievedData[i].credit;
            document.getElementById("articleDate").innerHTML = recievedData[i].date;
            document.getElementById("recentHigh").style.backgroundImage = `url("${recievedData[i].highlightPhoto}")`;
        }

        if (i > 0 && i < 5) {
            document.getElementById(`recentNewsCardImage${i}`).style.backgroundImage = `url("${recievedData[i].highlightPhoto}")`;
            document.getElementById(`cardHeading${i}`).innerHTML = `${recievedData[i].newsHeading}<br>`;
            document.getElementById(`cardText${i}`).innerHTML = recievedData[i].date;
        }

        if (i > 4 && i <= val) {
            var addHTML = `<div class="mainNewsCard"><div id="imageCard${i}" class="miniCardImage"></div><div class="miniCardText"><div class="heading">${recievedData[i].newsHeading}</div><div class="cardDate">By ${recievedData[i].credit} &nbsp;&nbsp; ${recievedData[i].date}</div></div></div>`;
            document.getElementById("mainNewsContainer").innerHTML += addHTML;
            document.getElementById(`imageCard${i}`).style.backgroundImage = `url("${recievedData[i].highlightPhoto}")`;
        }
        i += 1;
    }
}

function setDataSmallScreen() {
    document.getElementById("mainNewsContainer").innerHTML = "";
    var x = 0;
    for (var val in recievedData) {
        if (x == 0) {
            document.getElementById("recentSelectedText").innerHTML = `${recievedData[x].newsHeading}<script></script>`;
            document.getElementById("articleCredit").innerHTML = recievedData[x].credit;
            document.getElementById("articleDate").innerHTML = recievedData[x].date;
            document.getElementById("recentHigh").style.backgroundImage = `url("${recievedData[x].highlightPhoto}")`;
        }
        if (x > 0) {
            var addHTML = `<div class="mainNewsCard"><div id="imageCard${x}" class="miniCardImage"></div><div class="miniCardText"><div class="heading">${recievedData[x].newsHeading}</div><div class="cardDate">By ${recievedData[x].credit} &nbsp;&nbsp; ${recievedData[x].date}</div></div></div>`;
            document.getElementById("mainNewsContainer").innerHTML += addHTML;
            document.getElementById(`imageCard${x}`).style.backgroundImage = `url("${recievedData[x].highlightPhoto}")`;
        }
        x += 1;
    }
}

function showResNavBar() {
    document.getElementById("hamburgerContainer").style.display = "none";
    document.getElementById("responsiveNavItems").style.display = "flex";
    document.getElementById("responsiveNavbar").style.backgroundColor = "rgba(0, 0, 0)";
}

function hideResNavBar() {
    document.getElementById("hamburgerContainer").style.display = "flex";
    document.getElementById("responsiveNavItems").style.display = "none";
    document.getElementById("responsiveNavbar").style.backgroundColor = "rgba(0, 0, 0, 0.7)";
}

function resizeCheck() {
    if (window.matchMedia("(max-width: 820px)").matches) {
        setDataSmallScreen();
    }
    else {
        setDataBigScreen();
    }
}