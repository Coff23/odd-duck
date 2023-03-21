"use strict";

const showedImages = [];
let roundsOFVoting = 25;
let results = document.getElementById("results");

function Choice(name, source) {
    this.name = name;
    this.timesClicked = 0;
    this.timesShown = 0;
    this.source = source;
}

showedImages.push(new Choice("bag", "/img/bag.jpg"));
showedImages.push(new Choice("banana", "/img/banana.jpg"));
showedImages.push(new Choice("bathroom", "/img/bathroom.jpg"));
showedImages.push(new Choice("boots", "/img/boots.jpg"));
showedImages.push(new Choice("breakfast", "/img/breakfast.jpg"));
showedImages.push(new Choice("bubblegum", "/img/bubblegum.jpg"));
showedImages.push(new Choice("chair", "/img/chair.jpg"));
showedImages.push(new Choice("cthulhu", "/img/cthulhu.jpg"));
showedImages.push(new Choice("dog-duck", "/img/dog-duck.jpg"));
showedImages.push(new Choice("dragon", "/img/dragon.jpg"));
showedImages.push(new Choice("pen", "/img/pen.jpg"));
showedImages.push(new Choice("pet-sweep", "/img/pet-sweep.jpg"));
showedImages.push(new Choice("scissors", "/img/scissors.jpg"));
showedImages.push(new Choice("shark", "/img/shark.jpg"));
showedImages.push(new Choice("sweep", "/img/sweep.png"));
showedImages.push(new Choice("tauntaun", "/img/tauntaun.jpg"));
showedImages.push(new Choice("unicorn", "/img/unicorn.jpg"));
showedImages.push(new Choice("water-can", "/img/water-can.jpg"));
showedImages.push(new Choice("wine-glass", "/img/wine-glass.jpg"));

let imageEl1 = document.querySelector("section img:first-child");
let imageEl2 = document.querySelector("section img:nth-child(2)");
let imageEl3 = document.querySelector("section img:nth-child(3)");

let voteTrackerEl = document.getElementById("voting-pics");

function generateRandomImage() {
    return Math.floor(Math.random() * showedImages.length);
}

function renderImages() {
    let image1 = showedImages[generateRandomImage()];
    let image2 = showedImages[generateRandomImage()];
    let image3 = showedImages[generateRandomImage()];
    
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
}

let eventId = voteTrackerEl.addEventListener("click", function (event) {
    let imageClicked = event.target.id;
    showedImages.forEach(image => {
        if (image.name === imageClicked) {
            image.timesClicked += 1;
        }
    });
    if (roundsOFVoting) {
        renderImages();
        roundsOFVoting--;
    } else {
        voteTrackerEl.removeEventListener("click", eventId);
        let resultsPrinted = document.createElement("ul");
        let resultsText = "";
        showedImages.forEach(image=>{
            resultsText += `${image.name} was clicked ${image.timesClicked} times and shown${image.timesShown} times.`;
        });
        resultsPrinted.innerHTML = resultsText;
        results.appendChild(resultsPrinted);
        results.classList.add("results-list");
        console.log(showedImages);
        
    }
});

renderImages();