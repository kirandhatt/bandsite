// create shows list //

const showsList = document.getElementById("shows-list");

// shows array //

let shows = [
    {
    date: "Mon Sept 09 2024",
    venue: "Ronald Lane",
    location: "San Francisco, CA",
    button: "Buy Tickets"
    },

    {
    date: "Tue Sept 17 2024",
    venue: "Pier 3 East",
    location: "San Francisco, CA",
    button: "Buy Tickets"
    },

    {
    date: "Sat Oct 12 2024",
    venue: "View Lounge",
    location: "San Francisco, CA",
    button: "Buy Tickets"
    },

    {
    date: "Sat Nov 16 2024",
    venue: "Hyatt Agency",
    location: "San Francisco, CA",
    button: "Buy Tickets"
    },

    {
    date: "Fri Nov 29 2024",
    venue: "Moscow Center",
    location: "San Francisco, CA",
    button: "Buy Tickets"
    },

    {
    date: "Wed Dec 18 2024",
    venue: "Press Club",
    location: "San Francisco, CA",
    button: "Buy Tickets"
    }
]

// display shows list //

shows.forEach((item) => {
    const labelsShows = Object.keys(item);

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

    // create items and append them to lists //
    function createElement (tag, className, textContent) {
        const element = document.createElement(tag);
        if (className) element.classList.add(className);
        if (textContent) element.textContent = textContent;
        return element;
    };

    showsDateList.appendChild(createElement("li", "shows__label", labelsShows[0]));
    showsDateList.appendChild(createElement("li", "shows__info--date", item.date));

    showsVenueList.appendChild(createElement("li", "shows__label", labelsShows[1]));
    showsVenueList.appendChild(createElement("li", "shows__info--venue", item.venue));

    showsLocationList.appendChild(createElement("li", "shows__label", labelsShows[2]));
    showsLocationList.appendChild(createElement("li", "shows__info--location", item.location));

    const buttons = document.createElement("button");
    buttons.classList.add("shows__button");
    buttons.textContent = item.button;
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
        showsCardItem.classList.toggle("shows__cards--selected");
        if (showsCardItem.classList.contains("shows__cards--selected")) {
            showsCardItem.style.pointerEvents = 'none';
        } else {
            showsCardItem.style.pointerEvents = '';
        }
    });
});
