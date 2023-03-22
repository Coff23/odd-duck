"use strict";

let showedImages = [];
let roundsOFVoting = 25;
let results = document.getElementById("results");

// constructor for images
function Choice(name, source) {
    this.name = name;
    this.timesClicked = 0;
    this.timesShown = 0;
    this.source = source;
}

if (localStorage.getItem('showedImages')) {
    showedImages = JSON.parse(localStorage.getItem(showedImages));
} else {
    showedImages.push(new Choice("bag", "img/bag.jpg"));
    showedImages.push(new Choice("banana", "img/banana.jpg"));
    showedImages.push(new Choice("bathroom", "img/bathroom.jpg"));
    showedImages.push(new Choice("boots", "img/boots.jpg"));
    showedImages.push(new Choice("breakfast", "img/breakfast.jpg"));
    showedImages.push(new Choice("bubblegum", "img/bubblegum.jpg"));
    showedImages.push(new Choice("chair", "img/chair.jpg"));
    showedImages.push(new Choice("cthulhu", "img/cthulhu.jpg"));
    showedImages.push(new Choice("dog-duck", "img/dog-duck.jpg"));
    showedImages.push(new Choice("dragon", "img/dragon.jpg"));
    showedImages.push(new Choice("pen", "img/pen.jpg"));
    showedImages.push(new Choice("pet-sweep", "img/pet-sweep.jpg"));
    showedImages.push(new Choice("scissors", "img/scissors.jpg"));
    showedImages.push(new Choice("shark", "img/shark.jpg"));
    showedImages.push(new Choice("sweep", "img/sweep.png"));
    showedImages.push(new Choice("tauntaun", "img/tauntaun.jpg"));
    showedImages.push(new Choice("unicorn", "img/unicorn.jpg"));
    showedImages.push(new Choice("water-can", "img/water-can.jpg"));
    showedImages.push(new Choice("wine-glass", "img/wine-glass.jpg"));
}

// Location where the images are displaying on the screen
let imageEl1 = document.querySelector("section img:first-child");
let imageEl2 = document.querySelector("section img:nth-child(2)");
let imageEl3 = document.querySelector("section img:nth-child(3)");

let voteTrackerEl = document.getElementById("voting-pics");

function generateRandomImage() {
    return Math.floor(Math.random() * showedImages.length);
}

// renders 3 images at random
function renderImages() {
    let image1 = showedImages[generateRandomImage()];
    let image2 = showedImages[generateRandomImage()];
    let image3 = showedImages[generateRandomImage()];

    //makes sure no two images are never the same
    while (image1 === image2 || image1 === image3 || image2 === image3) {
        image1 = showedImages[generateRandomImage()];
        image2 = showedImages[generateRandomImage()];
    }

    imageEl1.src = image1.source;
    imageEl1.id = image1.name;
    image1.timesShown += 1;

    imageEl2.src = image2.source;
    imageEl2.id = image2.name;
    image2.timesShown += 1;

    imageEl3.src = image3.source;
    imageEl3.id = image3.name;
    image3.timesShown += 1;

    // let previousImage = [image1, image2, image3];

    // while (previousImage === imageEl1 || previousImage === imageEl2 || previousImage === imageEl3) {
    //     imageEl1 = showedImages[generateRandomImage()];
    //     imageEl1 = showedImages[generateRandomImage()];
    //     imageEl1 = showedImages[generateRandomImage()];

    // }

    // while (choice2 === imageEl1 || choice2 === imageEl2 || choice2 === imageEl3) {
    //     imageEl2 = showedImages[generateRandomImage()];
    // }

    // while (choice3 === imageEl1 || choice3 === imageEl2 || choice3 === imageEl3) {
    //     imageEl3 = showedImages[generateRandomImage()];
    // }
}

// when you click an image it adds 1 to timesClicked and takes one off of the 25 rounds. also puts the results on the screen after 25 rounds of voting, got to split these functions up.
let eventId = voteTrackerEl.addEventListener("click", function (event) {
    let imageClicked = event.target.id;
    showedImages.forEach(image => {
        if (image.name === imageClicked) {
            image.timesClicked += 1;
        }
    });
    if (roundsOFVoting) { // what happens when you have votes left
        renderImages();
        roundsOFVoting--;
    } else { // what happens when you run out of votes
        voteTrackerEl.removeEventListener("click", eventId);
        let buttonEl = document.getElementById("results-button");
        buttonEl.addEventListener("click", renderData);
        alert("Max number of votes completed click button to view results.");
    }
});

// displays data and chart after 25 images have been clicked and button is clicked.
function renderData(event) {
    let buttonClicked = event.target.id;
    let labels = [];
    let timesShownValues = [];
    let timesClickedValues = [];

    showedImages.forEach(image => {
        let resultsPrintedEl = document.createElement("li");
        let parentContainer = document.getElementById("results-list");
        parentContainer.appendChild(resultsPrintedEl);
        resultsPrintedEl.innerHTML += `${image.name} was clicked ${image.timesClicked} times and shown ${image.timesShown} times.`;
        labels.push(image.name);
        timesShownValues.push(image.timesShown);
        timesClickedValues.push(image.timesClicked);
    });

    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '# of Votes',
                data: timesClickedValues,
                borderWidth: 1
            }, {
                label: "times shown",
                data: timesShownValues,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

renderImages();

// localStorage.setItem("Choice", JSON.stringify(showedImages));
// console.log(localStorage);
// let choiceState = localStorage.getItem('Choice');
// console.log(JSON.parse(choiceState));

function writeData(key, value) {
    localStorage.setItem('Choice', JSON.stringify(showedImages));
    console.log(localStorage);
}

writeData();

function readData(key) {
    return JSON.parse(localStorage.getItem('Choice')) || [];
    // console.log(JSON.parse('Choice'));
}

readData();


// writeData();
// readData();