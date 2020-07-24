let addToy = false;

function postToys(name, image) {
  let toyData = {
    name: name,
    image: image,
    likes: 0
  }

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toyData)
  }

  return fetch("http://localhost:3000/toys", configObj)
  .then(function(response) {
    return response.json()
  })
  .then(function(object) {
    document.body.innerHTML = object.name;
  })
  .catch(function(error) {
    alert("Didn't work");
    document.body.innerHTML = error;
  })
}

function getToys() {
  return fetch("http://localhost:3000/toys")
  .then(function(response) {
    return response.json()
  })
  .then(function(json){
    renderToys(json)
  })
}

function renderToys(toys) {
  toys.forEach(function makeCard(toy) {
    const toyCollection = document.getElementById('toy-collection')
    const card = document.createElement('div')
    card.className = "card"
    card.innerHTML = `<h2 id=${toy['id']}>${toy['name']}</h2>
                      <img src=${toy['image']} class="toy-avatar" />
                      <p>${toy['likes']}</p>
                      <button class="like-btn">Like <3</button>`
  toyCollection.appendChild(card)
  })
}

function updateLikes(id, likes) {
  fetch(`http://localhost:3000/toys/${id}`, {
  method: "PATCH",

  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },

  body: JSON.stringify({"likes": likes})
})
  .then(function(json){
    renderToys(json)
  })
}

document.addEventListener("DOMContentLoaded", () => {
  getToys()
  const likeBtn = document.getElementsByClassName("like-btn")
  const createBtn = document.getElementsByClassName("submit")[0]
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

  createBtn.addEventListener("click", function (e){
    e.preventDefault()
    let name = document.getElementsByClassName("input-text")[0].value
    let image = document.getElementsByClassName("input-text")[1].value
    postToys(name, image)
  })

  document.addEventListener("click", function (e) {
    e.preventDefault()
    if (e.target.className === 'like-btn'){
      let id = e.target.parentElement.querySelector('h2').id
      let likesContainer = e.target.parentElement.querySelector('p')
      let likes = parseInt(likesContainer.innerText)
      let newLikes = likes + 1;
      updateLikes(id, newLikes);
      likesContainer.innerHTML = `<p>${newLikes} </p>`
    }
  })
});
