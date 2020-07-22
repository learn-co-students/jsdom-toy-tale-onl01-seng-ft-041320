// Fetch Andy's Toys

let toysContainer = document.getElementById('toy-collection')
let toysPath = 'http://localhost:3000/toys'

fetch(toysPath)
    .then(function(responseObject){
      return responseObject.json()
    })
    // .then(console.log)
    .then(function(resultsArray){
      // Add Toy Info to the Card
      resultsArray.forEach(makeToyDiv)
      })

function makeToyDiv(toy){
    toysContainer.innerHTML += `
    <div id='toy_${toy.id}' class='card'>
    <h2>${toy.name}</h2>
    <img src='${toy.image}' class='toy-avatar'></img>
    <p>${toy.likes} Likes</p>
    <button class='like-btn'>Like <3</button>
    </div>
    `
  }

// Add a New Toy

// Select
// pre-done already below

// Listen
// pre-done already below

let addToy = false;
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', function (event) {
        event.preventDefault()
        postToy(event.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

// Do

function postToy(toy) {
  return fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": toy.name.value,
      "image": toy.image.value,
      "likes": 0
    })
  })

  .then(function (responseObject) {
    return responseObject.json()
  })
  .then(function (resultsObject) {
    let newToy = makeToyDiv(resultsObject)
    toysContainer.append(newToy)
  })
}

// Increase Toy's Likes

