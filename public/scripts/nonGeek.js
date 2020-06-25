const pageLocations = {
    "instagram": "https://www.instagram.com/sudo.mist/",
    "teams": "mailto:f78c6659.manipal.edu@apac.teams.ms?Subject=Message%20from%20website%20user",
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