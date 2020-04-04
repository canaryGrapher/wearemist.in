h = 1;
k = 0;
setInterval(rotate, 10000);
var xhttp = new XMLHttpRequest();
var cxhttp = new XMLHttpRequest();
window.onload = function () {
    document.getElementById("loaderContainer").style.display = "none";
    document.getElementById("subscribeFillForm").style.display = "none";
    //getting cybersecurity news
    xhttp.open("GET", "/getNews", false);
    xhttp.send();
    recievedData = JSON.parse(xhttp.responseText);
    resizeCheck();
    //getting club news
    cxhttp.open("GET", "/getClubNews", false);
    cxhttp.send();
    crecievedData = JSON.parse(cxhttp.responseText);
    screenWidth = screen.width;
    setClubNews();
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

function setClubNews() {
    y = 0;
    colorPallete = ["#1287A8", "#829356", "#DA621E", "rgb(49, 78, 204)", "rgb(56, 56, 56)"];
    var loopThroughColors = 0;
    if (crecievedData.length > 0) {
        document.getElementById("clubNewsContainer").innerHTML = "";
    }

    for (var club in crecievedData) {
        if (loopThroughColors > 4) {
            loopThroughColors = 0;
        }
        if (crecievedData[y].image == "") {
            clubNotice = `<div id="clubNews${y}" class="clubNewsCard wow fadeInRight" onclick="showClubMessage(this.id)"><p>${crecievedData[y].heading}</p></div>
        <div class="popup" id="popup${y}"><div class="clubNewsContainerInbox" id="clubNewsContainerInbox${y}"><div class="imageOfThisNews" id="imageOfThisNews${y}"></div>
            <div class=" contentOfThisNews" id="contentOfThisNews${y}"><div class="headerOfThisNews" id="headerOfThisNews${y}"><h1>${crecievedData[y].heading}</h1>
                </div><div class="descriptionOfThisNews" id="descriptionOfThisNews${y}"><date>${crecievedData[y].date}</date><p>${crecievedData[y].content}</p>
                <venue><b>Venue: </b>${crecievedData[y].venue}</venue><timing><b>Timing: </b>${crecievedData[y].timing}</timing><event><b>Link: </b>${crecievedData[y].link}</event>
                </div><div class="closingX"><div class="closePopupClub" id="closePopupClub${y}" onclick="closePopup(this.id)">X</div>
                </div></div></div></div><style>#imageOfThisNews${y}{height:20%;}</style>`;
        }
        else {
            clubNotice = `<div id="clubNews${y}" class="clubNewsCard wow fadeInRight" onclick="showClubMessage(this.id)"><p>${crecievedData[y].heading}</p></div>
        <div class="popup" id="popup${y}"><div class="clubNewsContainerInbox" id="clubNewsContainerInbox${y}"><div class="imageOfThisNews" id="imageOfThisNews${y}"></div>
            <div class=" contentOfThisNews" id="contentOfThisNews${y}"><div class="headerOfThisNews" id="headerOfThisNews${y}"><h1>${crecievedData[y].heading}</h1>
                </div><div class="descriptionOfThisNews" id="descriptionOfThisNews${y}"><date>${crecievedData[y].date}</date><p>${crecievedData[y].content}</p>
                <venue><b>Venue: </b>${crecievedData[y].venue}</venue><timing><b>Timing: </b>${crecievedData[y].timing}</timing><event><b>Link: </b>${crecievedData[y].link}</event>
                </div><div class="closingX"><div class="closePopupClub" id="closePopupClub${y}" onclick="closePopup(this.id)">X</div>
                </div></div></div></div>`;
        }

        document.getElementById("clubNewsContainer").innerHTML += `${clubNotice}`;
        document.getElementById(`clubNews${y}`).style.backgroundColor = `${colorPallete[loopThroughColors]}`;
        document.getElementById(`imageOfThisNews${y}`).style.backgroundImage = `url("${crecievedData[y].image}")`;
        console.log(crecievedData[y].image);
        y += 1;
        loopThroughColors += 1;
    }

}

function setDataBigScreen() {
    var i = 0;
    document.getElementById("mainNewsContainer").innerHTML = "";
    for (var val in recievedData) {
        if (i == 0) {
            document.getElementById("recentSelectedText").innerHTML = `<a href="${recievedData[i].about}">${recievedData[i].newsHeading}<a>`;
            document.getElementById("articleCredit").innerHTML = recievedData[i].credit;
            document.getElementById("articleDate").innerHTML = recievedData[i].date;
            document.getElementById("recentHigh").style.backgroundImage = `url("${recievedData[i].highlightPhoto}")`;
        }

        if (i > 0 && i < 5) {
            document.getElementById(`recentNewsCardImage${i}`).style.backgroundImage = `url("${recievedData[i].highlightPhoto}")`;
            document.getElementById(`cardHeading${i}`).innerHTML = `<a href="${recievedData[i].about}">${recievedData[i].newsHeading}</a><br>`;
            document.getElementById(`cardText${i}`).innerHTML = recievedData[i].date;
        }

        if (i > 4 && i <= val) {
            var addHTML = `<a href="${recievedData[i].about}"><div class="mainNewsCard wow fadeInUp"><div id="imageCard${i}" class="miniCardImage"></div><div class="miniCardText"><div class="heading">${recievedData[i].newsHeading}</div><div class="cardDate">By ${recievedData[i].credit} &nbsp;&nbsp; ${recievedData[i].date}</div></div></div></a>`;
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
            document.getElementById("recentSelectedText").innerHTML = `<a href="${recievedData[x].about}">${recievedData[x].newsHeading}</a>`;
            document.getElementById("articleCredit").innerHTML = recievedData[x].credit;
            document.getElementById("articleDate").innerHTML = recievedData[x].date;
            document.getElementById("recentHigh").style.backgroundImage = `url("${recievedData[x].highlightPhoto}")`;
        }
        if (x > 0) {
            var addHTML = `<a href="${recievedData[x].about}"><div class="mainNewsCard wow fadeInUp"><div id="imageCard${x}" class="miniCardImage"></div><div class="miniCardText"><div class="heading">${recievedData[x].newsHeading}</div><div class="cardDate">By ${recievedData[x].credit} &nbsp;&nbsp; ${recievedData[x].date}</div></div></div></a>`;
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

function rotate() {
    if (screen.width > 820) {
        if (h > 4) {
            h = 0;
        }
        if (k == 6) {
            k = 0;
        }
        document.getElementById("recentSelectedText").innerHTML = `<a href="${recievedData[h].about}">${recievedData[h].newsHeading}<a>`;
        document.getElementById("articleCredit").innerHTML = recievedData[h].credit;
        document.getElementById("articleDate").innerHTML = recievedData[h].date;
        document.getElementById("recentHigh").style.backgroundImage = `url("${recievedData[h].highlightPhoto}")`;
        document.getElementById(`recentNewsCardImage1`).style.backgroundImage = document.getElementById(`recentNewsCardImage2`).style.backgroundImage;
        document.getElementById(`recentNewsCardImage2`).style.backgroundImage = document.getElementById(`recentNewsCardImage3`).style.backgroundImage;
        document.getElementById(`recentNewsCardImage3`).style.backgroundImage = document.getElementById(`recentNewsCardImage4`).style.backgroundImage;
        document.getElementById(`recentNewsCardImage4`).style.backgroundImage = `url("${recievedData[k].highlightPhoto}")`;
        document.getElementById(`cardHeading1`).innerHTML = `<a href="${recievedData[2].about}">${recievedData[2].newsHeading}</a><br>`;
        document.getElementById(`cardHeading2`).innerHTML = `<a href="${recievedData[3].about}">${recievedData[3].newsHeading}</a><br>`;
        document.getElementById(`cardHeading3`).innerHTML = `<a href="${recievedData[4].about}">${recievedData[4].newsHeading}</a><br>`;
        document.getElementById(`cardHeading4`).innerHTML = `<a href="${recievedData[0].about}">${recievedData[0].newsHeading}</a><br>`;
        document.getElementById(`cardText1`).innerHTML = recievedData[2].date;
        document.getElementById(`cardText2`).innerHTML = recievedData[3].date;
        document.getElementById(`cardText3`).innerHTML = recievedData[4].date;
        document.getElementById(`cardText4`).innerHTML = recievedData[k].date;
        h += 1;
        k += 1;
    }
}

function showClubMessage(idOfElement) {
    document.getElementById(`popup${idOfElement[idOfElement.length - 1]}`).style.display = "flex";
}

function closePopup(idOfElement) {
    document.getElementById(`popup${idOfElement[idOfElement.length - 1]}`).style.display = "none";
}