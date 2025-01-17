import {BandSiteApi} from './band-site-api.js';
const bandSiteApi = new BandSiteApi(apiKey);

// create shows list //

const showsList = document.getElementById("shows-list");

// createElement function for ease //
function createElement (tag, className, textContent) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    if (textContent) element.textContent = textContent;
    return element;
};

// select rows one at a time //

let currentlySelectedRow = null;

// display shows list //

function displayShows(shows) {
    showsList.textContent = "";

    const tableHeadings = createElement("li", "shows__tableHeadings");
    tableHeadings.appendChild(createElement("div", "shows__tableHeadings-item", "Date"));
    tableHeadings.appendChild(createElement("div", "shows__tableHeadings-item", "Venue"));
    tableHeadings.appendChild(createElement("div", "shows__tableHeadings-item", "Location"));
    tableHeadings.appendChild(createElement("div", "shows__tableHeadings-item", ""));
    showsList.appendChild(tableHeadings);

    shows.forEach((item) => {
        const labelsShows = {
            date: "Date",
            place: "Venue",
            location: "Location",
            button: "Button"
        };

        // create lists //
        const showsCardItem = document.createElement("li");
        showsCardItem.classList.add("shows__cards");

        const showsDateList = document.createElement("ul");
        showsDateList.classList.add("shows__cards--sub-list");

        const showsVenueList = document.createElement("ul");
        showsVenueList.classList.add("shows__cards--sub-list");

        const showsLocationList = document.createElement("ul");
        showsLocationList.classList.add("shows__cards--sub-list");

        const showsButtonList = document.createElement("ul");
        showsButtonList.classList.add("shows__cards--sub-list","shows__cards--sub-list-button");

        // create items and append to lists //
        showsDateList.appendChild(createElement("li", "shows__label", labelsShows.date));
        showsDateList.appendChild(createElement("li", "shows__info--date", new Date(item.date).toLocaleDateString()));
    
        showsVenueList.appendChild(createElement("li", "shows__label", labelsShows.place));
        showsVenueList.appendChild(createElement("li", "shows__info--venue", item.place));
    
        showsLocationList.appendChild(createElement("li", "shows__label", labelsShows.location));
        showsLocationList.appendChild(createElement("li", "shows__info--location", item.location));

        const buttons = document.createElement("button");
        buttons.classList.add("shows__button");
        buttons.textContent = "Buy Tickets";
        showsButtonList.appendChild(buttons);

        // append list divs to card items //
        showsCardItem.appendChild(showsDateList);
        showsCardItem.appendChild(showsVenueList);
        showsCardItem.appendChild(showsLocationList);
        showsCardItem.appendChild(showsButtonList);

        // append card items to main shows list //
        showsList.appendChild(showsCardItem);

        // highlight selected row //
        showsCardItem.addEventListener("click", (e) => {
            e.stopPropagation();
            e.preventDefault();
            
            if(currentlySelectedRow && currentlySelectedRow !== showsCardItem) {
                currentlySelectedRow.classList.remove('shows__cards--selected');
            }
            showsCardItem.classList.toggle("shows__cards--selected");

            if(showsCardItem.classList.contains('shows__cards--selected')) {
                currentlySelectedRow = showsCardItem;
            } else {
                currentlySelectedRow = null;
            }
        });  
    });
}

// load shows from api //
async function loadShows() {
    try {
        const shows = await bandSiteApi.getShows();
        displayShows(shows);
    } catch (error) {
        console.error('Error loading shows:', error);
    }
}

loadShows();