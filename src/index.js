let addToy = false;

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

  const toyCollection = document.querySelector("toy-collection")

  function getToys () {
    fetch ('http://http://localhost:3000/toys')
    .then (handleResponse)
    //array of objects//

  }

  function handleResponse(response){
    response.json()
    .then((function(response){
      response.forEach(renderToy)
    }))
  }

  function renderToy(toy){
    toyCollection.innerHTML += `
    <div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
    </div>
    `
  }

  getToys()



});
