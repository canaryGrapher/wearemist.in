document.onkeydown = checkKey;
//function to detect the keypresses of up arrow and the down arrow
function checkKey(buttonPress) {
    buttonPress = buttonPress || window.event;
    if (buttonPress.keyCode == "37" || buttonPress.keyCode == "39") {
        // detecting key press
        const checkSelectedGUI = document.getElementById("GUImode");
        const checkSelectedCLI = document.getElementById("CLImode");
        const checkTextColor = document.getElementById("cliText");
        if (checkSelectedGUI.style.color == "white") {
            switchToCLI();
        } else if (checkSelectedCLI.style.color == "white") {
            switchToGUI();
        }
    } else if (buttonPress.keyCode == "13") {
        const checkSelectedGUI = document.getElementById("GUImode");
        if (checkSelectedGUI.style.color == "white") {
            window.location.replace("/nongeek");
        } else {
            window.location.replace("/geek");
        }
    }
}
function switchToGUI() {
    if (screen.width > 1000) {
        const guiSelector = document.getElementById("GUImode");
        guiSelector.style.color = "white";
        const cliSelector = document.getElementById("CLImode");
        cliSelector.style.color = "rgb(200, 200, 200)";
        overlayGui.style.backgroundColor = "rgba(0, 0, 0, 0.692)";
        overlayCli.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    }
}
function switchToCLI() {
    if (screen.width > 1000) {
        const cliSelector = document.getElementById("CLImode");
        cliSelector.style.color = "white";
        const guiSelector = document.getElementById("GUImode");
        guiSelector.style.color = "rgb(255, 255, 255)";
        const overlayGui = document.getElementById("overlayGui");
        const overlayCli = document.getElementById("overlayCli");
        overlayGui.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
        overlayCli.style.backgroundColor = "rgba(0, 0, 0, 0.695)";
    }
}
function goToCLIPage() {
    window.location.replace("/Geek");
}
function goToGUIPage() {
    window.location.replace("/nonGeek");
}