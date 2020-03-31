var xhttp = new XMLHttpRequest();
window.onload = function () {
    document.getElementById("loaderContainer").style.display = "none";
    document.getElementById("subscribeFillForm").style.display = "none";
    xhttp.open("GET", "/getNews", false);
    xhttp.send();
    recievedData = JSON.parse(xhttp.responseText);
    this.setData();
};

function closeSubscriptionForm() {
    document.getElementById("subscribeFillForm").style.display = "none";
}

function showSubscriptionForm() {
    document.getElementById("subscribeFillForm").style.display = "inherit";
    hideResNav();
}

function setData() {
    var i = 0;
    for (var val in recievedData) {
        if (i == 0) {
            document.getElementById("recentSelectedText").innerHTML = recievedData[i].newsHeading;
            document.getElementById("articleCredit").innerHTML = recievedData[i].credit;
            document.getElementById("articleDate").innerHTML = recievedData[i].date;
            document.getElementById("recentHigh").style.backgroundImage = `url("${recievedData[i].highlightPhoto}")`;
        }

        if (i > 0 && i < 5) {
            document.getElementById(`recentNewsCardImage${i}`).style.backgroundImage = `url("${recievedData[i].highlightPhoto}")`;
            document.getElementById(`cardHeading${i}`).innerHTML = recievedData[i].newsHeading;
            document.getElementById(`cardText${i}`).innerHTML = recievedData[i].date;
        }

        if (i > 4) {
            var addHTML = `<div class="mainNewsCard"><div id="imageCard${i}" class="miniCardImage"></div><div class="miniCardText"><div class="heading">${recievedData[i].newsHeading}</div><div class="cardDate">By ${recievedData[i].credit} &nbsp;&nbsp; ${recievedData[i].date}</div></div></div>`;
            document.getElementById("mainNewsContainer").innerHTML += addHTML;
            document.getElementById(`imageCard${i}`).style.backgroundImage = `url("${recievedData[i].highlightPhoto}")`;
        }
        i += 1;
    }
}