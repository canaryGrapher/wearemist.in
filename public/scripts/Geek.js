function exitTerminal() {
    window.location.replace("/home");
}

function loadBrowser() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/getData", false);
    xhttp.send();
    recievedData = xhttp.responseText;
}

function loadTerminal() {
    loadBrowser();
    document.getElementById("command1").focus();
    document.getElementById("accessIdentifier").innerHTML = `${recievedData}@sudo.mist:`;
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
                document.getElementById(`commandOutput${i}`).innerHTML = `Enter the option number for viewing the contents<br><br>1) Board<br> 2) Management Committee<br> 3) Working Committee<br>`;
            }

            else if (second == "news") {
                document.getElementById(`commandOutput${i}`).innerHTML = `news will be rendered`;
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
                document.getElementById(`commandOutput${i}`).innerHTML = "";
            }

            else {
                document.getElementById(`commandOutput${i}`).innerHTML = `Arguments for this command are not supported in this terminal`;
            }
        }
        else if (commandIndi == "pwd") {
            document.getElementById(`commandOutput${i}`).innerHTML = `https://www.wearemist.in`;
        }
        else if (commandIndi == "help") {
            document.getElementById(`commandOutput${i}`).innerHTML = `What help could you possibly need?`;
        }
        else {
            document.getElementById(`commandOutput${i}`).innerHTML = `sh: "${userInputCommand}": not found`;
        }

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