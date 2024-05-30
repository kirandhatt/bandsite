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
    dateP.textContent = comment.timestamp;
    nameAndDateDiv.appendChild(dateP);

    const textP = document.createElement("p");
    textP.classList.add("display-comments__text");
    textP.textContent = comment.commentText;
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

// create comments //

let commentsArray = [
    {
    name: "Victor Pinto",
    timestamp: "11/02/2023",
    commentText: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."
    },

    {
    name: "Christina Cabrera",
    timestamp: "10/28/2023",
    commentText: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."
    },

    {
    name: "Isaac Tadesse",
    timestamp: "10/20/2023",
    commentText: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
    }
];

// add comments //

function addComments() {
    commentsList.textContent = "";
    for (let i=0; i<commentsArray.length; i++) {
        displayComment(commentsArray[i]);
    }
};

addComments();

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

form.addEventListener('submit',(e) => {
    e.preventDefault();
    const userName = nameInput.value;
    const comment = commentInput.value;

    if(userName === "" && comment === "") {
        nameInput.classList.add("comments__required");
        commentInput.classList.add("comments__required");
    } else if (userName === "") {
        nameInput.classList.add("comments__required");
    } else if (comment === "") {
        commentInput.classList.add("comments__required");
    } else {
        commentsArray.unshift({
            name: userName,
            timestamp: today,
            commentText: comment,
        })

        nameInput.value = "";
        commentInput.value = "";
        addComments();
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