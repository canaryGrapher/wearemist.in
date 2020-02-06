window.onload = changeLinkTexts;
window.onload = showCC;
window.onresize = changeLinkTexts;

function showCC() {
  var cc = document.getElementById("cc");
  var ccCards = document.getElementById("corec");
  var cctext = document.getElementById("ccLink");
  cc.style.backgroundColor = "rgb(219, 219, 219)";
  cctext.style.color = "#000000";
  ccCards.style.display = "grid";
  //restoring MC tab back to normal
  var mc = document.getElementById("mc");
  var mcCards = document.getElementById("manc");
  var mctext = document.getElementById("mcLink");
  mc.style.backgroundColor = "#000000";
  mctext.style.color = "#ffffff";
  mcCards.style.display = "none";
  //restoring WC tab back to normal
  var wc = document.getElementById("wc");
  var wcCards = document.getElementById("workc");
  var wctext = document.getElementById("wcLink");
  wc.style.backgroundColor = "#000000";
  wctext.style.color = "#ffffff";
  wc.style.backgroundColor = "#000000";
  wcCards.style.display = "none";
}

function showMC() {
  var mc = document.getElementById("mc");
  var mcCards = document.getElementById("manc");
  var mctext = document.getElementById("mcLink");
  mc.style.backgroundColor = "rgb(219, 219, 219)";
  mctext.style.color = "#000000";
  mcCards.style.display = "grid";
  //restoring MC tab back to normal
  var cc = document.getElementById("cc");
  var ccCards = document.getElementById("corec");
  var cctext = document.getElementById("ccLink");
  cc.style.backgroundColor = "#000000";
  cctext.style.color = "#ffffff";
  ccCards.style.display = "none";
  //restoring MC tab back to normal
  var wc = document.getElementById("wc");
  var wcCards = document.getElementById("workc");
  var wctext = document.getElementById("wcLink");
  wc.style.backgroundColor = "#000000";
  wctext.style.color = "#ffffff";
  wc.style.backgroundColor = "#000000";
  wcCards.style.display = "none";
}

function showWC() {
  var wc = document.getElementById("wc");
  var wcCards = document.getElementById("workc");
  var wctext = document.getElementById("wcLink");
  wc.style.backgroundColor = "rgb(219, 219, 219)";
  wctext.style.color = "#000000";
  wcCards.style.display = "grid";
  //restoring CC tab back to normal
  var cc = document.getElementById("cc");
  var ccCards = document.getElementById("corec");
  var cctext = document.getElementById("ccLink");
  cc.style.backgroundColor = "#000000";
  cctext.style.color = "#ffffff";
  ccCards.style.display = "none";
  //restoring MC tab back to normal
  var mc = document.getElementById("mc");
  var mcCards = document.getElementById("manc");
  var mctext = document.getElementById("mcLink");
  mc.style.backgroundColor = "#000000";
  mctext.style.color = "#ffffff";
  mc.style.backgroundColor = "#000000";
  mcCards.style.display = "none";
}

function showDialog() {
  var dialogGrabber = document.getElementById("howToApply");
  dialogGrabber.style.display = "inline-flex";
}

function hideDialog() {
  var dialogGrabber = document.getElementById("howToApply");
  dialogGrabber.style.display = "none";
}

function changeLinkTexts() {
  var ccLinkName = document.getElementById("ccLink");
  var mcLinkName = document.getElementById("mcLink");
  var wcLinkName = document.getElementById("wcLink");
  if (window.matchMedia('(max-width: 800px)').matches) { // If media query matches
    ccLinkName.innerHTML = "CC";
    mcLinkName.innerHTML = "MC";
    wcLinkName.innerHTML = "WC";
  }
  else {
    ccLinkName.innerHTML = "Core Committee";
    mcLinkName.innerHTML = "Management Committee";
    wcLinkName.innerHTML = "Working Committee";
  }
}