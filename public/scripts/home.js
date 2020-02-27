document.onkeydown = checkKey;
//function to detect the keypresses of up arrow and the down arrow
function checkKey(buttonPress) {
    buttonPress = buttonPress || window.event;
    if (buttonPress.keyCode == "37" || buttonPress.keyCode == "39") {
        // detecting up or down key press
        const checkSelectedGUI = document.getElementById("GUImode");
        const checkSelectedCLI = document.getElementById("CLImode");
        const checkTextColor = document.getElementById("cliText");
        if (checkSelectedGUI.style.color == "black") {
            switchToCLI();
        } else if (checkSelectedCLI.style.color == "black") {
            switchToGUI();
        }
    } else if (buttonPress.keyCode == "13") {
        const checkSelectedGUI = document.getElementById("GUImode");
        if (checkSelectedGUI.style.color == "black") {
            window.location.replace("/nongeek");
        } else {
            window.location.replace("/geek");
        }
    }
}
function switchToGUI() {
    const guiSelector = document.getElementById("GUImode");
    guiSelector.style.backgroundColor = "whitesmoke";
    guiSelector.style.color = "black";
    const cliSelector = document.getElementById("CLImode");
    cliSelector.style.color = "white";
    cliSelector.style.backgroundColor = "#2a6296";
}
function switchToCLI() {
    const cliSelector = document.getElementById("CLImode");
    cliSelector.style.backgroundColor = "whitesmoke";
    cliSelector.style.color = "black";
    const guiSelector = document.getElementById("GUImode");
    guiSelector.style.color = "white";
    guiSelector.style.backgroundColor = "#2a6296";
}
function goToCLIPage() {
    window.location.replace("/Geek");
}
function goToGUIPage() {
    window.location.replace("/nonGeek");
}