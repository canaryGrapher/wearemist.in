var ccCounter = 0;
var mcCounter = 0;
var wcCounter = 0;
var animationChooser = ["fadeInLeft", "fadeInUp", "bounceIn", "bounceInUp", "bounceInRight", "bounceInLeft", "fadeInRight", "lightSpeedIn"];

window.onload = function () {
  showCC();
  changeLinkTexts();
  renderTeammates();
};

window.onresize = function () {
  changeLinkTexts();
};

showMenu = 0;

async function renderTeammates() {
  document.getElementById("loaderContainer").style.display = "none";
  let bootstrapColorChooser = ["bg-primary", "bg-success", "bg-danger", "bg-warning", "bg-info", "bg-dark", "bg-secondary", "bg-dark", "bg-olive", "bg-orange"];
  let res = await fetch(`/teaminfo`);
  recievedData = await res.json();
  let insertElementToBoard = document.getElementById('insertionareaforboard');
  let insertElementToManComm = document.getElementById('insertionareaformancomm');
  let insertElementToWorkComm = document.getElementById('insertionareaforworkcomm');
  recievedData.CC.forEach(insertBoard);
  recievedData.MC.forEach(insertManComm);
  recievedData.WC.forEach(insertWorkComm);
  function insertBoard(itemBoard) {
    let counterCorrection = ccCounter % 8;
    let ccAnimation = animationChooser[counterCorrection];
    ccCounter = ccCounter + 1;
    let idForFooter = itemBoard.name.split(" ").join("");
    insertElementToBoard.innerHTML += `<div class="wow ${ccAnimation} card col-12 col-sm-6 col-md-4 col-lg-3 text-center pt-2 pb-5">
                <img class="rounded-circle img card-img-top mx-auto ccImages"
                src="${itemBoard.photo}"
                alt="${itemBoard.name}">
            <div class="card-body text-center">
                <h4 class="card-title">${itemBoard.name}</h4>
                <p class="card-text text-primary">${itemBoard.position}</p>
            </div>
            <div class="card-footer text-center" id="${idForFooter}"></div></div>`;
    if (itemBoard.github != "") {
      eval(`document.getElementById("${idForFooter}").innerHTML += '<a href="${itemBoard.github}" id="btn-1" class="text-decoration-none fab fa-github pr-3 pl-3 p-md-3 p-lg-4"></a>'`);
    }
    if (itemBoard.linkedin != "") {
      eval(`document.getElementById("${idForFooter}").innerHTML += '<a href="${itemBoard.linkedin}" id="btn-1" class="text-decoration-none fab fa-linkedin pr-3 pl-3 p-md-3 p-lg-4"></a>'`);
    }
  }

  function insertManComm(itemManComm) {
    let counterCorrection = mcCounter % 8;
    let mcAnimation = animationChooser[counterCorrection];
    mcCounter = mcCounter + 1;
    let idForFooter = itemManComm.name.split(" ").join("");
    insertElementToManComm.innerHTML += `<div class="wow ${mcAnimation} card col-12 col-sm-6 col-md-4 col-lg-3 text-center pt-2 pb-5">
                <img class="rounded-circle img card-img-top mx-auto ccImages"
                src="${itemManComm.photo}"
                alt="${itemManComm.name}">
            <div class="card-body text-center">
                <h4 class="card-title">${itemManComm.name}</h4>
            </div>
            <div class="card-footer text-center" id="${idForFooter}"></div></div>`;
    if (itemManComm.github != "") {
      eval(`document.getElementById("${idForFooter}").innerHTML += '<a href="${itemManComm.github}" id="btn-1" class="text-decoration-none fab fa-github pr-3 pl-3 p-md-3 p-lg-4"></a>'`);
    }
    if (itemManComm.linkedin != "") {
      eval(`document.getElementById("${idForFooter}").innerHTML += '<a href="${itemManComm.linkedin}" id="btn-1" class="text-decoration-none fab fa-linkedin pr-3 pl-3 p-md-3 p-lg-4"></a>'`);
    }
  }
  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function insertWorkComm(itemWorkComm) {
    let counterCorrection = wcCounter % 8;
    let wcAnimation = animationChooser[counterCorrection];
    wcCounter = wcCounter + 1;
    let colorValue = getRndInteger(0, 9);
    let cardColor = bootstrapColorChooser[colorValue];
    let idForFooter = itemWorkComm.name.split(" ").join("");
    insertElementToWorkComm.innerHTML += `<div class="wow ${wcAnimation} col-6 col-sm-4 col-md-3 mt-5">
    <div class="card mx-auto text-white ${cardColor}" id="${idForFooter}">
        <div class="card-body text-center">
            <h5 class="card-title">${itemWorkComm.name}</h5>
        </div>
    </div>
</div>`
  }

}

function showCC() {
  var cc = document.getElementById("cc");
  var ccCards = document.getElementById("corec");
  var cctext = document.getElementById("ccLink");
  cc.style.backgroundColor = "rgb(255, 255, 255)";
  cctext.style.color = "#000000";
  ccCards.style.display = "grid";
  //restoring MC tab back to normal
  var mc = document.getElementById("mc");
  var mcCards = document.getElementById("manc");
  var mctext = document.getElementById("mcLink");
  mc.style.backgroundColor = "#343a40";
  mctext.style.color = "#ffffff";
  mcCards.style.display = "none";
  //restoring WC tab back to normal
  var wc = document.getElementById("wc");
  var wcCards = document.getElementById("workc");
  var wctext = document.getElementById("wcLink");
  wctext.style.color = "#ffffff";
  wc.style.backgroundColor = "#343a40";
  wcCards.style.display = "none";
}

function showMC() {
  var mc = document.getElementById("mc");
  var mcCards = document.getElementById("manc");
  var mctext = document.getElementById("mcLink");
  mc.style.backgroundColor = "rgb(255, 255, 255)";
  mctext.style.color = "#000000";
  mcCards.style.display = "grid";
  //restoring MC tab back to normal
  var cc = document.getElementById("cc");
  var ccCards = document.getElementById("corec");
  var cctext = document.getElementById("ccLink");
  cc.style.backgroundColor = "#343a40";
  cctext.style.color = "#ffffff";
  ccCards.style.display = "none";
  //restoring MC tab back to normal
  var wc = document.getElementById("wc");
  var wcCards = document.getElementById("workc");
  var wctext = document.getElementById("wcLink");
  wctext.style.color = "#ffffff";
  wc.style.backgroundColor = "#343a40";
  wcCards.style.display = "none";
}

function showWC() {
  var wc = document.getElementById("wc");
  var wcCards = document.getElementById("workc");
  var wctext = document.getElementById("wcLink");
  wc.style.backgroundColor = "rgb(255, 255, 255)";
  wctext.style.color = "#000000";
  wcCards.style.display = "grid";
  //restoring CC tab back to normal
  var cc = document.getElementById("cc");
  var ccCards = document.getElementById("corec");
  var cctext = document.getElementById("ccLink");
  cc.style.backgroundColor = "#343a40";
  cctext.style.color = "#ffffff";
  ccCards.style.display = "none";
  //restoring MC tab back to normal
  var mc = document.getElementById("mc");
  var mcCards = document.getElementById("manc");
  var mctext = document.getElementById("mcLink");
  mctext.style.color = "#ffffff";
  mc.style.backgroundColor = "#343a40";
  mcCards.style.display = "none";
}

function changeLinkTexts() {
  var ccLinkName = document.getElementById("ccLink");
  var mcLinkName = document.getElementById("mcLink");
  var wcLinkName = document.getElementById("wcLink");
  if (window.matchMedia('(max-width: 700px)').matches) { // If media query matches
    ccLinkName.innerHTML = "Board";
    mcLinkName.innerHTML = "MC";
    wcLinkName.innerHTML = "WC";
  }
  else {
    ccLinkName.innerHTML = "Board";
    mcLinkName.innerHTML = "Management Committee";
    wcLinkName.innerHTML = "Working Committee";
  }
}

function redirectToBoot() {
  window.location.href = "/";
}