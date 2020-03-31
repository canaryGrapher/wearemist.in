function loadTerminal() {
    typeWriter();
    loadBrowser();
    document.getElementById("command1").focus();
    document.getElementById("accessIdentifier").innerHTML = `guest@wearemist:<span class="accessIndicator">~$</span>`;
    document.getElementById("terminalTitle").innerHTML = `${recievedData}@wearemist.in`;
}

var txtcounter = 0;
var txt = "Manipal Information Security Team - version - Stable-Version_1.2.1-def:28.03.2020 2020 MIST, Manipal. All rights reserved.";
var speed = 5;

function typeWriter() {
    if (txtcounter < txt.length) {
        document.getElementById("terminalMessage").innerHTML += txt.charAt(txtcounter);
        txtcounter++;
        setTimeout(typeWriter, speed);
    }
}
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

var i = 1;
// Execute a function when the user releases a key on the keyboard
async function handleEnter(e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
        var userInputCommand = document.getElementById(`command${i}`).value;
        var commandIndi = userInputCommand.split(" ");
        console.log(`Processing command "${userInputCommand}"`);
        var first = commandIndi[0];
        var second = commandIndi[1];
        var third = commandIndi[2];
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
                addCommand();
            }

            else {
                document.getElementById(`commandOutput${i}`).innerHTML = `Arguments for this command are not supported in this terminal`;
                addCommand();
            }
        }

        else if (userInputCommand == "exit") {
            exitTerminal();
        }

        else if (first == "cat") {
            if (third == null) {
                if (second == "team") {
                    //making CoreComm array
                    var cc = `<span class="teamHeading">Board</span><br><div class="teamViewer">`;
                    var ccArray = loadCCdata();
                    var ccArr = ccArray.split(",");
                    for (var val1 in ccArr) {
                        cc = cc + `<div class="teamMember">` + ccArr[val1] + "</div>" + " ";
                    }
                    //making ManComm array
                    var mc = `<span class="teamHeading">Management Committee</span><br><div class="teamViewer">`;
                    var mcArray = loadMCdata();
                    var mcArr = mcArray.split(",");
                    for (var val2 in mcArr) {
                        mc = mc + `<div class="teamMember">` + mcArr[val2] + "</div>" + " ";
                    }
                    //making WorkComm array
                    var wc = `<span class="teamHeading">Working Committee</span><br><div class="teamViewer">`;
                    var wcArray = loadWCdata();
                    var wcArr = wcArray.split(",");
                    for (var val3 in wcArr) {
                        wc = wc + `<div class="teamMember">` + wcArr[val3] + "</div>" + " ";
                    }
                    document.getElementById(`commandOutput${i}`).innerHTML = `<div class="teamContainer"><div class="team">${cc}</div></div><div class="team">${mc}</div></div><div class="team">${wc}</div></div></div>`;
                    addCommand();
                }
                else if (second == "news") {
                    var news = `<span class="newsHeading" id="newsMessage">Recent news</span><br>`;
                    var newsArray = loadNewsdata();
                    var newsArr = newsArray.split(",");
                    for (var val4 in newsArr) {
                        news = news + newsArr[val4] + "<br><br>";
                        if (val4 == 9) {
                            break;
                        }
                    }
                    document.getElementById(`commandOutput${i}`).innerHTML = `${news}`;
                    addCommand();
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
                field.<br><br>`;
                    addCommand();
                }
                else if (second == null) {
                    document.getElementById(`commandOutput${i}`).innerHTML = "Illegal use of 'cat'<br> USAGE: cat [FILENAME]";
                    addCommand();
                }
                else {
                    document.getElementById(`commandOutput${i}`).innerHTML = `No such file found: "${second}"`;
                    addCommand();
                }
            }
            else {
                document.getElementById(`commandOutput${i}`).innerHTML = `Illegal use of 'cat' <br> USAGE: cat [FILENAME]`;
                addCommand();
            }
        }

        else if (userInputCommand == "pwd") {
            document.getElementById(`commandOutput${i}`).innerHTML = `https://www.wearemist.in/Geek`;
            addCommand();
        }
        else if (userInputCommand == "date") {
            var dateToday = new Date();
            document.getElementById(`commandOutput${i}`).innerHTML = `${dateToday}<br>`;
            addCommand();
        }

        else if (userInputCommand == "help") {
            document.getElementById(`commandOutput${i}`).innerHTML = `List of available commands:<br><div id="availableCommands"><div class="commandIs">ls</div><div class="commandIs">cat</div><div class="commandIs">clear</div><div class="commandIs">date</div><div class="commandIs">help</div><div class="commandIs">whoami</div><div class="commandIs">man</div><div class="commandIs">pwd</div><div class="commandIs">exit</div></div><br>`;
            addCommand();
        }

        else if (userInputCommand == "whoami") {
            document.getElementById(`commandOutput${i}`).innerHTML = `${recievedData}`;
            addCommand();
        }
        else if (userInputCommand.trim() == "") {
            console.log("No command Input");
            addCommand();
        }

        else if (userInputCommand == "clear") {
            window.location.reload(false);
        }

        else if (userInputCommand == "man") {
            var manualPage = `<table><tr><td>ls</th><td class="commandDescription">: List files</th> </tr><tr><td>cat [filename]</td>
              <td class="commandDescription">: Show file contents</td></tr><tr><td>clear</td><td class="commandDescription">: Refresh screen</td>
            </tr><tr><td>date</td><td class="commandDescription">: Print date and time</td></tr><tr><td>help</td><td class="commandDescription">: Available commands</td>
            </tr><tr><td>whoami</td><td class="commandDescription">: Display IP Address</td></tr><tr><td>man</td><td class="commandDescription">: Command help</td>
            </tr><tr><td>pwd</td><td class="commandDescription">: Current location</td></tr><tr><td>exit</td><td class="commandDescription">: Previous page</td>
            </tr></table><br>`;
            document.getElementById(`commandOutput${i}`).innerHTML = `${manualPage}`;
            addCommand();
        }

        else {
            document.getElementById(`commandOutput${i}`).innerHTML = `sh: "${userInputCommand}": not found<br><br>Try typing "help" or "man" if you are lost<br><br>`;
            addCommand();
        }
        document.getElementById(`commandOutput${i}`).classList.add("commandOutput");
    }
}

async function addCommand() {
    i = i + 1;
    var addHTML = `<div class="commandInstance" id="accessPane${i}"><div class="access"><div class="accessName"><p>guest@wearemist:<span class="accessIndicator">~$</span></p>
        </div><input type="text" name="command" class="app-control" id="command${i}" autocomplete="off"autocapitalize="off" autocorrect="off">
        <p class="commandStore" id="commandStore${i}"></p></div><p class="commandOutput" id="commandOutput${i}"></p></div>`;
    var duplicatorSelector = document.getElementById("terminalArea");
    duplicatorSelector.innerHTML += addHTML;
    document.getElementById(`command${i}`).focus();
}