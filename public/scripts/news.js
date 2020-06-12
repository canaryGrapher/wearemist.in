var cxhttp = new XMLHttpRequest();

document.addEventListener("DOMContentLoaded", function (event) {
    console.log("Body loaded");
    setNewsCards();
    setClubNews();
});

function filteredNews(identity) {
    alert(identity);
}

function setClubNews() {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/getClubNews", false);
    xhttp.send();
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
        let addCode = `<div class="card text-white ${colorPallete[card_color]} mb-3 ml-3 mr-3" data-toggle="modal"
            data-target=".${classForModal}" style="width: 22rem;">
            <div class="card-body">
                <h5 class="card-title">${crecievedData[club].heading}</h5>
            </div>
            <div class="card-header border-0">${crecievedData[club].date}</div>
            </div>`;
        addModalCode = `<div class="modal fade ${classForModal}" tabindex="-1" role="dialog"
        aria-labelledby="ClubAnnouncement${count}" aria-hidden="true">
        <div class="modal-dialog modal-lg">
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
                            <h2 class="text-center">WC's are now testing the website</h2>
                            <p class="text-center"><small>April 12, 2020</small></p>`;
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

async function setNewsCards() {
    const bulletinBoardNews = document.getElementById("newsBulletin");
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/getNews", false);
    xhttp.send();
    let recievedData = JSON.parse(xhttp.responseText);
    for (let newsData in recievedData) {
        let cardNews = `<div class="card rounded mx-auto mb-4" style="width: 100%;">
        <div class="col-12 d-md-flex d-block">
            <img class="img-responsive col-lg-4 col-12 p-3 mr-3 ml-3"
                src="${recievedData[newsData].highlightPhoto}"
                alt="${recievedData[newsData].newsHeading}" href="${recievedData[newsData].about}">
                <div class="card-body">
                    <h5 class="ml-3 mb-1">
                        <span class="text-primary mr-1 text-primary sourceWebsite" onclick="window.open('${recievedData[newsData].source}')">${recievedData[newsData].credit}</span><small
                            class="bg-cyan-light ml-3 text-primary p-1">${recievedData[newsData].filterTags}</small>
                    </h5>
                    <p></p>
                    <h3 class="col-lg-8 col-12">${recievedData[newsData].newsHeading}</h3>
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



