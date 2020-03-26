function exitTerminal() {
    window.location.replace("/home");
}

function loadBrowser() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/getData", false);
    xhttp.send();
    recievedData = xhttp.responseText;
}

function loadCCdata() {
    var CCxhttp = new XMLHttpRequest();
    CCxhttp.open("GET", "/getCCdata", false);
    CCxhttp.send();
    recievedCCData = CCxhttp.responseText;
    return recievedCCData;
}

function loadMCdata() {
    var MCxhttp = new XMLHttpRequest();
    MCxhttp.open("GET", "/getMCdata", false);
    MCxhttp.send();
    recievedMCData = MCxhttp.responseText;
    return recievedMCData;
}

function loadNewsdata() {
    var Newsxhttp = new XMLHttpRequest();
    Newsxhttp.open("GET", "/getNewsdata", false);
    Newsxhttp.send();
    recievedNewsData = Newsxhttp.responseText;
    return recievedNewsData;
}

function loadWCdata() {
    var WCxhttp = new XMLHttpRequest();
    WCxhttp.open("GET", "/getWCdata", false);
    WCxhttp.send();
    recievedWCData = WCxhttp.responseText;
    return recievedWCData;
}

function loadTerminal() {
    loadBrowser();
    document.getElementById("command1").focus();
    document.getElementById("accessIdentifier").innerHTML = `${recievedData}@sudo.mist:<span class="accessIndicator">~$</span>`;
    document.getElementById("terminalTitle").innerHTML = `${recievedData}@wearemist.in`;
}
var i = 1;

// Execute a function when the user releases a key on the keyboard
function handleEnter(e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
        var userInputCommand = document.getElementById(`command${i}`).value;
        var commandIndi = userInputCommand.split(" ");
        console.log(commandIndi);
        var first = commandIndi[0];
        var second = commandIndi[1];
        //storing previous commands
        document.getElementById(`command${i}`).style.display = "none";
        document.getElementById(`commandStore${i}`).style.display = "inherit";
        document.getElementById(`commandStore${i}`).innerHTML = userInputCommand;
        var itm = document.getElementById("accessPanel").lastChild;
        var cln = itm.cloneNode(true);
        document.getElementById("accessPanel").appendChild(cln);
        if (first == "ls") {
            if (second == null) {
                document.getElementById(`commandOutput${i}`).innerHTML = `<span class="file">about</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="file">news</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="file">team</span>`;
            }

            else {
                document.getElementById(`commandOutput${i}`).innerHTML = `Arguments for this command are not supported in this terminal`;
            }
        }
        else if (userInputCommand == "exit") {
            exitTerminal();
        }
        else if (first == "cat") {
            if (second == "team") {
                //making CoreComm array
                var cc = `<span class="teamHeading">Board</span><br>`;
                var ccArray = loadCCdata();
                var ccArr = ccArray.split(",");
                for (var val1 in ccArr) {
                    cc = cc + ccArr[val1] + "<br>";
                }
                //making ManComm array
                var mc = `<span class="teamHeading">Management Committee</span><br>`;
                var mcArray = loadMCdata();
                var mcArr = mcArray.split(",");
                for (var val2 in mcArr) {
                    mc = mc + mcArr[val2] + "<br>";
                }
                //making WorkComm array
                var wc = `<span class="teamHeading">Working Committee</span><br>`;
                var wcArray = loadWCdata();
                var wcArr = wcArray.split(",");
                for (var val3 in wcArr) {
                    wc = wc + wcArr[val3] + "<br>";
                }
                document.getElementById(`commandOutput${i}`).innerHTML = `<div class="teamContainer"><div class="team">${cc}</div><div class="team">${mc}</div><div class="team">${wc}</div></div>`;

            }

            else if (second == "news") {
                var news = `<span class="teamHeading" id="newsMessage">Loading last ten news</span><br>`;
                var newsArray = loadNewsdata();
                var newsArr = newsArray.split(",");
                for (var val4 in newsArr) {
                    news = news + newsArr[val4] + "<br><br>";
                    console.log(val4);
                    if (val4 == 11) {
                        break;
                    }
                }
                document.getElementById(`commandOutput${i}`).innerHTML = `${news}`;
            }

            else if (second == "about") {
                document.getElementById(`commandOutput${i}`).innerHTML = `We are a team of Information and Network Security enthusiasts who
                have gathered knowledge about the field through workshops, online
                courses, books and research. We now want to spread the knowledge we
                have gained to other students with an interest in this ever-growing
                area of computer science. We want to ensure that students approach
                this field the right way and to provide them with a platform to
                enhance and practice their skills in the same.<br>We are committed to spreading awareness about the increasing need
                for Information and Network Security. We plan to train other
                like-minded students to enhance their skills and aptitude in this
                field.`;
            }

            else if (second == null) {
                document.getElementById(`commandOutput${i}`).innerHTML = "Illegal use of 'cat'";
            }

            else {
                document.getElementById(`commandOutput${i}`).innerHTML = `Arguments for this command are not supported in this terminal`;
            }
        }
        else if (commandIndi == "pwd") {
            document.getElementById(`commandOutput${i}`).innerHTML = `https://www.wearemist.in`;
        }
        else if (commandIndi == "help") {
            document.getElementById(`commandOutput${i}`).innerHTML = `List of available commands:<br><pre id="availableCommands">pwd   ls   whoami   cat   exit   man</pre>`;
        }
        else if (commandIndi == "whoami") {
            document.getElementById(`commandOutput${i}`).innerHTML = `${recievedData}`;
        }
        else {
            document.getElementById(`commandOutput${i}`).innerHTML = `sh: "${userInputCommand}": not found`;
        }
        document.getElementById(`commandOutput${i}`).classList.add("commandOutput");
        addCommand();
    }
}

async function addCommand() {
    i = i + 1;
    var addHTML = `<div class="commandInstance" id="accessPane${i}">
    <div class="access">
        <div class="accessName">
            <p>${recievedData}@sudo.mist:<span class="accessIndicator">~$</span></p>
        </div>
        <input type="text" name="command" class="app-control" id="command${i}" autocomplete="off"
            autocapitalize="off" autocorrect="off" autofocus>
        <p class="commandStore" id="commandStore${i}"></p>
    </div>
    <p class="commandOutput" id="commandOutput${i}"></p>
</div>
<br>
<br>`;
    var duplicatorSelector = document.getElementById("terminalArea");
    duplicatorSelector.innerHTML += addHTML;
    document.getElementById(`command${i}`).focus();
}