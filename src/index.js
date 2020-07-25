let addToy = false;
const toysPath = "http://localhost:3000/toys"
function toyPath(id) {
  return toysPath + `/${id}`
}
// let formData = {}
// let configObj = {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     "Accept": "application/json"
//   },
//   body: JSON.stringify(formData)
// }

function renderToys(json) {
  json.forEach(function(toy) {
    let toyCollection = document.getElementById("toy-collection")
    toyCollection.innerHTML += `
      <div class="card">
        <h2>${toy.name}</h2></br>
        <img src=${toy.image} class="toy-avatar"></br>
        <p>${toy.likes} Likes </p>
        <button id=${toy.id} class="like-btn">Like <3</button>
      </div>
    `
  })
}

function indexToys() {
  return fetch(toysPath)
    .then(function(response) {
      return response.json()
    })
    .then(renderToys)
}

function createToy(toyName, toyImage) {
  // formData["name"] = toyName
  // formData["image"] = toyImage
  // formData["likes"] = 0
  return fetch(toysPath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": toyName,
        "image": toyImage,
        "likes": 0
      })
    })
    .then(function(response) {
      return response.json()
    })
    .then(function(toy) {
      let toyCollection = document.getElementById("toy-collection")
      toyCollection.innerHTML += `
        <div class="card">
          <h2>${toy.name}</h2></br>
          <img src=${toy.image} class="toy-avatar"></br>
          <p>${toy.likes} Likes </p>
          <button id="${toy.id}" class="like-btn" >Like <3</button>
        </div>
      `
    })
}

function increaseLikes(id, newLikes) {
  return fetch(toyPath(id), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": newLikes
    })
  })
  .then(function(response) {
    return response.json()
  })
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  indexToys();
  const addToyForm = document.getElementsByClassName("add-toy-form")[0]
  addToyForm.addEventListener("submit", function(e) {
    e.preventDefault();
    let toyName = document.getElementsByName("name")[0].value
    let toyImage = document.getElementsByName("image")[0].value
    createToy(toyName, toyImage);
    e.target.reset()
    addBtn.click() //simulate mouse click to close add toy form
  });
  const toyCollection = document.getElementById("toy-collection");
  toyCollection.addEventListener("click", function(e) {
    let spot = e.target
    // console.log(spot.tagName)
    if (spot.tagName == "BUTTON") {
      // debugger
      let likes = spot.parentElement.getElementsByTagName("p")[0].innerText.split(" ")[0];
      let newLikes = parseInt(likes) + 1;
      increaseLikes(spot.id, newLikes);
      spot.parentElement.getElementsByTagName("p")[0].innerText = `${newLikes} Likes`;
    }
  })
});
