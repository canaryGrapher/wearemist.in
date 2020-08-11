const pageLocations = {
  "instagram": "https://www.instagram.com/sudo.mist/",
  "teams": "mailto:50123d1f.manipal.edu@apac.teams.ms?Subject=Message%20from%20website%20user",
  "github": "https://github.com/WeAreMIST",
  "linkedin": "https://in.linkedin.com/company/manipal-information-security-team",
  "facebook": "https://www.facebook.com/wearemist.in/",
  "email": "mailto:sudo@wearemist.in?Subject=Message%20from%20website%20user"
}

async function loadHistoryTimeline(idOfButton) {
  const buttonID = document.getElementById(`${idOfButton}`);
  const holder = document.getElementById('historyInput');
  buttonID.innerHTML = `<div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div>`;
  let res = await fetch("/getHistoryTimeline");
  let recievedData = await res.text();
  holder.innerHTML = ""
  holder.innerHTML = recievedData;
}

function openPage(id) {
  location.assign(eval(`pageLocations.${id}`));
}

$('#submit').click(async function () {
  let nameOfSender = document.getElementById("userName").value;
  let emailofSender = document.getElementById("userEmail").value;
  let messageBySender = document.getElementById("sendMessage").value;
  let emailVerify = validateEmailAddress(emailofSender.trim());
  let checkBlacklistStatus = await checkBlackList();
  if (nameOfSender.trim() != "" && emailofSender.trim() != "" && messageBySender.trim() != "") {
    if (checkBlacklistStatus) {
      if (emailVerify) {
        $.ajax({
          url: '/contactMailer',
          type: 'POST',
          data: {
            name: nameOfSender.trim(),
            email: emailofSender.trim(),
            message: messageBySender.trim()
          },
          success: function (msg) {
            document.getElementById("errorHolder").innerHTML = `<div class="alert alert-success alert-dismissible wow rubberBand" role="alert">
          Your message was delivered.
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>`;
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            document.getElementById("errorHolder").innerHTML = `<div class="alert alert-danger alert-dismissible wow rubberBand" role="alert">
          Oops, there was an error on our end. Please try again later.
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>`;
          }
        });
      }
      else {
        document.getElementById("errorHolder").innerHTML = `<div class="alert alert-warning alert-dismissible wow rubberBand" role="alert">
            Email format is not valid. Enter a valid email address.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`;
      }
    }
    else if (!checkBlacklistStatus) {
      document.getElementById("errorHolder").innerHTML = `<div class="alert alert-danger alert-dismissible wow rubberBand" role="alert">
            We only allow one submission in a 12 hour span. Try again later.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`;
    }
  }
  else {
    document.getElementById("errorHolder").innerHTML = `<div class="alert alert-danger alert-dismissible wow rubberBand" role="alert">
        Please make sure you fill all the fields.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;
  }
});

function validateEmailAddress(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

async function checkBlackList() {
  let res = await fetch('/checkblackliststatus');
  let allowedToSubmit = await res.text();
  console.log(allowedToSubmit);
  console.log(allowedToSubmit)
  if(allowedToSubmit == "true") {
    return true;
  }
  else {
    return false;
  }
}