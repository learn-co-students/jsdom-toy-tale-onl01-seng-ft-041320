
let addToy = false;
let toyCollection = document.querySelector("#toy-collection")
let newToy = document.querySelector(".add-toy-form")
let destinationURL = "http://localhost:3000/toys"


fetch(destinationURL)
  .then(response => response.json())
  .then(obj => addToyCollection(obj))

function addToyCollection(obj) {
  for (toyObj of obj) {
    let toyCard = `
      <div class="card">
        <h2>${toyObj.name}</h2>
        <img src=${toyObj.image} class="toy-avatar"/>
        <p>${toyObj.likes} Likes </p>
        <button class="like-btn" id="${toyObj.id}">Like <3</button>
      </div>
    `
    toyCollection.innerHTML += toyCard
  }
}



function addNewToy(e) {
  let addNewToy = e.target.children
  let newToy = {
    name: addNewToy[1].value,
    image: addNewToy[3].value,
    likes: 0
  }

  configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newToy)
  }

  fetch(destinationURL, configObj)
    .then(response => response.json())
    .then(obj => console.log("New Toy: ", obj))
    .catch(error => console.log("error: ", error))


  e.preventDefault();

}

function addLike(e) {
  // debugger;
  e.preventDefault()
  let ToyCard = e.path[1].children
  let currentLikes = parseInt(ToyCard[2].innerText)
  let updateLike = ++currentLikes
  let destinationURL = `http://localhost:3000/toys/${e.target.id}`
  configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ "likes": updateLike })
  }
  // debugger;

  fetch(destinationURL, configObj)
    .then(response => response.json())
    .then(obj => console.log(obj))
    .catch(error => console.log(error))

}


newToy.addEventListener('submit', addNewToy)

toyCollection.addEventListener('click', (e) => {
  if (e.target.className == "like-btn") {
    addLike(e)
    // e.preventDefault();
  }
})


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
});

