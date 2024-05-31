import {BandSiteApi} from './band-site-api.js';
const bandSiteApi = new BandSiteApi(apiKey);

// create comment section //

const commentSection = document.querySelector(".comments");
const newSection = document.createElement("section");
newSection.classList.add("display-comments");
commentSection.appendChild(newSection);
 
const newList = document.createElement("ul");
newList.classList.add("display-comments__list");
newList.setAttribute("id", "comments-list");
newSection.appendChild(newList);

const commentsList = document.getElementById("comments-list");

// display comment section //

function displayComment(comment) {
    // create divs //
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("display-comments__card");

    const commentCardDiv = document.createElement("div");
    commentCardDiv.classList.add("display-comments__content");

    const nameAndDateDiv = document.createElement("div");
    nameAndDateDiv.classList.add("display-comments__name-and-date");

    const textDiv = document.createElement("div");

    // create parapraphs and append to divs //
    const nameP = document.createElement("p");
    nameP.classList.add("display-comments__name");
    nameP.textContent = comment.name;
    nameAndDateDiv.appendChild(nameP);

    const dateP = document.createElement("p");
    dateP.classList.add("display-comments__date");
    dateP.textContent = new Date(comment.timestamp).toLocaleDateString();
    nameAndDateDiv.appendChild(dateP);

    const textP = document.createElement("p");
    textP.classList.add("display-comments__text");
    textP.textContent = comment.comment;
    textDiv.appendChild(textP);

    // append name + date div and text div to card div //
    commentCardDiv.appendChild(nameAndDateDiv);
    commentCardDiv.appendChild(textDiv);

    // create div for blank pic & append card div to comment div //
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("comments__img--no-picture");
    commentDiv.appendChild(imgDiv);

    commentDiv.appendChild(commentCardDiv);

    // append comment div to comment list div //
    commentsList.appendChild(commentDiv);
};

// add new comment //
function addComments() {
    commentsList.textContent = "";
    displayComment(comment);
}

addComments();

// load comments from api //

async function loadComments() {
    const comments = await bandSiteApi.getComments();
    commentsList.textContent = "";
    comments.forEach(comment => displayComment(comment));
}

loadComments();

// today's date //

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth();
let yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

// add new comments + validation //

const form = document.getElementById('commentForm');
const nameInput = document.querySelector(".comments__name");
const commentInput = document.querySelector(".comments__text");

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userName = nameInput.value;
    const commentText = commentInput.value;

    if(userName === "" && comment === "") {
        nameInput.classList.add("comments__required");
        commentInput.classList.add("comments__required");
    } else if (userName === "") {
        nameInput.classList.add("comments__required");
    } else if (comment === "") {
        commentInput.classList.add("comments__required");
    } else {
        const newComment = {
            name: userName,
            comment: commentText
        };

        await bandSiteApi.postComment(newComment);
        nameInput.value = "";
        commentInput.value = "";
        loadComments();
    }
});

// clear validation //

function clearValidation (e) {
    if (e.target.value) {
        e.target.classList.remove("comments__required");
    }
}

nameInput.oninput = clearValidation;
commentInput.oninput = clearValidation;