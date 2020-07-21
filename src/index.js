let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
  const toysUrl = "http://localhost:3000/toys";
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
  fetchToys(toysUrl)


});

function fetchToys(toysUrl) {
    return fetch(toysUrl)
    .then(resp => resp.json())
    .then(json => renderToys(json));
}

function renderToys(toys) {
  const toysDiv = document.getElementById('toy-collection')
  toys.forEach(function(toy) {
    const cardDiv = document.createElement('div')
    cardDiv.className = "card";
    cardDiv.innerHTML = `
    <h2>${toy.name}</h2>
    <img src = ${toy.image} class = "toy-avatar">
    <p> ${toy.likes} Likes </p>`
    const btn = document.createElement('button');
    btn.className = "like-btn";
    btn.innerText = "Like <3"
    btn.id = toy.id;
    btn.addEventListener('click', addLike );
    cardDiv.appendChild(btn);
    toysDiv.appendChild(cardDiv);
  })
  
}

function addLike(e) {
  let likesCounter = parseInt(e.target.parentElement.querySelector('p').innerText.split(' ')[0]) + 1
  e.target.parentElement.querySelector('p').innerText= `${likesCounter} Likes `;
}