let addToy = false;

function postToys(name, imgUrl) {
  configurationObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": name,
      "image": imgUrl,
      "likes": 0
    })
  };
  return fetch("http://localhost:3000/toys", configurationObject)
  .then(function(response) {
    return response.json()
  })
  };

function getToys(){
  return fetch("http://localhost:3000/toys")
  .then(function (response){
    return response.json()
  })
  .then(function makeToyCard (json) {
    json.forEach(function makeCard(toy){
      const toyCard = document.createElement('div')
      const toyDiv = document.getElementById('toy-collection')
      toyCard.className = 'card'
      toyCard.innerHTML = `
          <h2>${toy.name}</h2>
          <img src=${toy.image} class="toy-avatar" />
          <p>${toy.likes} Likes </p>
          <button id = ${toy.id} class="like-btn">Like <3</button>
      `
      toyDiv.appendChild(toyCard)
    })
  })
};

function addLikes(e){
  let likesContainer = e.target.parentElement.querySelector('p')
  let likeNumber = parseInt(likesContainer.innerText.split(' ')[0])
  configurationObject = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: `${likeNumber + 1}`
    })
  }
  return fetch(`http://localhost:3000/toys/${e.target.id}`, configurationObject)
  .then(function(response) {
    return response.json()
  })
  .then(function(json){
    likesContainer.innerHTML = likeNumber + 1 + " likes"
  });
};

document.addEventListener("DOMContentLoaded", () => {
  getToys()
  .then(function(){
    const buttons = document.querySelectorAll('.like-btn')
    buttons.forEach(function(button){
      button.addEventListener('click', addLikes)
    })
  });
  const toyCollection = document.getElementById('toy-collection')
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  toyFormContainer.addEventListener('submit', function(){
    let name = document.querySelector("[name='name']").value
    let image = document.querySelector("[name='image']").value
    postToys(name, image);
  });
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
