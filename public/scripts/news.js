document.addEventListener("DOMContentLoaded", function (event) {
    // document.getElementById("loaderContainer").style.display = "none";
    setNewsCards();
    setClubNews();
    setSidebarHeight();
});

const categoryObject = {
    "category1": "Vulnerabilities",
    "category2": "Breaches",
    "category3": "Research and Development",
    "category4": "Frauds and Thefts",
    "category5": "Policies and Regulations"
}

async function setClubNews() {
    let xhttp = new XMLHttpRequest();
    await xhttp.open("GET", "/getClubNews", false);
    await xhttp.send();
    let crecievedData = JSON.parse(xhttp.responseText);
    let count = 1;
    const bulletinAnnouncement = document.getElementById("scrollAnnouncements");
    colorPallete = ["bg-primary", "bg-secondary", "bg-success", "bg-danger", "bg-warning", "bg-info", "bg-dark", "bg-color1", "bg-color2", "bg-color3"];
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    for (var club in crecievedData) {
        let classForModal = crecievedData[club].heading.split(" ").join("");
        let card_color = getRndInteger(0, 6);
        let addCode = `<div class="card text-white ${colorPallete[card_color]} mb-3 ml-3 mr-3 clubAnnouncementCardHorizontal" data-toggle="modal"
            data-target=".${classForModal}" style="width: 22rem;">
            <div class="card-body">
                <h5 class="card-title">${crecievedData[club].heading}</h5>
            </div>
            <div class="card-header border-0">${crecievedData[club].date}</div>
            </div>`;
        addModalCode = `<div class="modal fade ${classForModal}" tabindex="-1" role="dialog"
        aria-labelledby="ClubAnnouncement${count}" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body text-wrap">
                        <div class="col-10 mx-auto wrap-content">
                            <h2 class="text-center">${crecievedData[club].heading}</h2>
                            <p class="text-center"><small>${crecievedData[club].date}</small></p>`;
        if (crecievedData[club].image != "") {
            addModalCode += `<img class="img-fluid pb-5" style="width:100%;"
                                src="${crecievedData[club].image}">`;
        }
        addModalCode += `<p>${crecievedData[club].content}</p>
                            <b>Venue:</b> ${crecievedData[club].venue}<br />
                            <b>Timings:</b> ${crecievedData[club].timing}<br />
                            <p><b>Link:</b> <a target="_blank" href="${crecievedData[club].link}" class="text-info">${crecievedData[club].link}</a></p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary mx-auto"
                            data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
        count += 1;
        addCode += addModalCode;
        bulletinAnnouncement.innerHTML += addCode;
    }
}

async function checkVerify(writerName) {
    let getVerifiedUser = new XMLHttpRequest();
    getVerifiedUser.open("GET", `/verifyWriter?writername=${writerName}`, false);
    getVerifiedUser.send();
    let isVerified = getVerifiedUser.responseText;
    if (isVerified == "true") {
        return isVerified;
    }
    else {
        return isVerified;
    }
}

async function setNewsCards() {
    const bulletinBoardNews = document.getElementById("newsBulletin");
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/getNews", false);
    xhttp.send();
    let recievedData = JSON.parse(xhttp.responseText);
    bulletinBoardNews.innerHTML = "";
    for (let newsData in recievedData) {
        let isVerifiedWriter = await checkVerify(recievedData[newsData].author);
        let IdOfThisFilter = searchObject(`${recievedData[newsData].filterTags}`);
        let cardNews = `<div class="card rounded mb-4 col-12 p-0 m-0">
        <div class="col-12 d-md-flex">
            <img class="img-responsive col-12 col-md-4 p-3 mr-3 ml-3"
                src="${recievedData[newsData].highlightPhoto}"
                alt="${recievedData[newsData].newsHeading}" href="${recievedData[newsData].about}">
                <div class="card-body col-md-8 col-12">
                        <h5 class="ml-2 mb-1 sourceInformation text-primary text-primary"><filter class="sourceWebsite" onclick="window.open('${recievedData[newsData].source}')">${recievedData[newsData].credit}</filter><small
                            class="bg-cyan-light ml-3 text-primary p-1 paraFilterSelector" id="${IdOfThisFilter}" onclick="filteredNews(this.id)">${recievedData[newsData].filterTags}</small></h5>
                    <p></p>
                    <h3 class="col-lg-12 col-12">${recievedData[newsData].newsHeading}</h3>
                    <p class="ml-3">${recievedData[newsData].para}</p>
                    <p class="ml-3 text-primary linkToOriginal" onclick="window.open('${recievedData[newsData].about}')">View the full article</p>
                    <p class="card-text pl-3"><small class="text-muted">Uploaded on June 4, 2020</small></p>
                    <div class="card-tag-holder ml-3">`;
        for (let tagname in recievedData[newsData].tags) {
            let addIt = `<span class="p-1 text-primary">#${recievedData[newsData].tags[tagname]}</span>   `;
            cardNews += addIt;
        }
        cardNews += `</div></div></div><div class="card-footer border-0">
        <p class="text-muted">Summary by <span class="text-dark">${recievedData[newsData].author}</span>`;
        if (isVerifiedWriter == "true") {
            cardNews += `<i class="pl-1 text-primary fas fa-check-circle"></i>`;
        }
        cardNews += `</p><a href="#" class="card-link"></a></div></div>`;
        bulletinBoardNews.innerHTML += cardNews;
    }
}

function setSidebarHeight() {
    // Calculating height of sidebar
    document.getElementById("sidebarContainer").style.height = `${screen.height - (document.getElementById("footer").offsetHeight + document.getElementById("navigationBar").offsetHeight)}px`;
    document.getElementById("sidebarContainer").style.marginTop = `${document.getElementById("navigationBar").offsetHeight}px`;
}

function filteredNews(idOfFilter) {
    if (idOfFilter == "category1") {
        selectionFilter = categoryObject.category1;
    }
    else if (idOfFilter == "category2") {
        selectionFilter = categoryObject.category2;
    }
    else if (idOfFilter == "category3") {
        selectionFilter = categoryObject.category3;
    }
    else if (idOfFilter == "category4") {
        selectionFilter = categoryObject.category4;
    }
    else if (idOfFilter == "category5") {
        selectionFilter = categoryObject.category5;
    }
    renderFilteredContent(selectionFilter);
}

function searchObject(search) {
    let searchResult = null;
    if (search == categoryObject.category1) {
        searchResult = "category1";
    }
    else if (search == categoryObject.category2) {
        searchResult = "category2";
    }
    else if (search == categoryObject.category3) {
        searchResult = "category3";
    }
    else if (search == categoryObject.category4) {
        searchResult = "category4";
    }
    else if (search == categoryObject.category5) {
        searchResult = "category5";
    }
    return searchResult;
}


async function renderFilteredContent(filter) {
    //rendering only news with tags filter
    const bulletinBoardNews = document.getElementById("newsBulletin");
    let xhttp = new XMLHttpRequest();
    await xhttp.open("GET", "/getNews", false);
    await xhttp.send();
    bulletinBoardNews.innerHTML = "";
    bulletinBoardNews.innerHTML = `<div class="pt-5 d-flex d-xs-block pb-2 pl-3"><p class="text-secondary mr-lg-3 mr-1 p-1">Applied Filter: </p><p class="p-1 text-info bg-cyan-light">${filter}</span></p><p onClick="setNewsCards();" class="p-1 ml-3 rounded bg-darkTransparent text-light clearFilter">Clear Filter<span class="badge badge-primary ml-1">X</p></div>`
    let recievedData = JSON.parse(xhttp.responseText);
    for (let newsData in recievedData) {
        let newsTag = recievedData[newsData].filterTags.split(" ").join("");
        let searchTag = newsTag.toLowerCase();
        let compatibleFilter = filter.split(" ").join("");
        let optimizedFilter = compatibleFilter.toLowerCase();
        if (searchTag == optimizedFilter) {
            let cardNews = `<div class="card rounded mb-4">
        <div class="col-12 d-md-flex">
            <img class="img-responsive col-12 col-md-4 p-3 mr-3 ml-3"
                src="${recievedData[newsData].highlightPhoto}"
                alt="${recievedData[newsData].newsHeading}" href="${recievedData[newsData].about}">
                <div class="card-body col-md-8 col-12">
                    <h5 class="ml-3 mb-1">
                        <span class="text-primary mr-1 text-primary sourceWebsite" onclick="window.open('${recievedData[newsData].source}')">${recievedData[newsData].credit}</span><small
                            class="bg-cyan-light ml-3 text-primary p-1">${recievedData[newsData].filterTags}</small>
                    </h5>
                    <p></p>
                    <h3 class="col-lg-12 col-12">${recievedData[newsData].newsHeading}</h3>
                    <p class="ml-3">${recievedData[newsData].para}</p>
                    <p class="ml-3 text-primary linkToOriginal" onclick="window.open('${recievedData[newsData].about}')">View the full article</p>
                    <p class="card-text pl-3"><small class="text-muted">Uploaded on June 4, 2020</small></p>
                    <div class="card-tag-holder ml-3">`;
            for (let tagname in recievedData[newsData].tags) {
                let addIt = `<span class="p-1 mr-2 text-primary">#${recievedData[newsData].tags[tagname]}</span>`;
                cardNews += addIt;
            }
            cardNews += `</div></div></div><div class="card-footer border-0">
        <p class="text-muted">Summary by <span class="text-dark">${recievedData[newsData].author}</span></p>
        <a href="#" class="card-link"></a></div></div>`;
            bulletinBoardNews.innerHTML += cardNews;
        }
    }

}