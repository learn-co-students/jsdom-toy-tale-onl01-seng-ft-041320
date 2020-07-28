let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetchToys()
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', (e) => {
        e.preventDefault()
        newToy(e.target)
        toyFormContainer.style.display = "none";
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


function fetchToys() {
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(json => renderToys(json))
}

function renderToys(toys) {
  const toyCollection = document.getElementById('toy-collection')

  for (const toy of toys) {
    let toyCardDiv = document.createElement('div')
    let h2 = document.createElement('h2')
    let img = document.createElement('img')
    let p = document.createElement('p')
    let btn = document.createElement('button')

    h2.innerText = toy.name
    img.setAttribute('src', toy.image)
    img.setAttribute('class', 'toy-avatar')
    p.innerText = `${toy.likes} likes`
    toyCardDiv.setAttribute('class', 'card')
    btn.setAttribute('class', 'like-btn')
    btn.setAttribute('id', toy.id)
    btn.innerText = "like"

    btn.addEventListener('click', (e) => {
      updateLikes(e)
    })

    toyCardDiv.append(h2, img, p, btn)
    toyCollection.append(toyCardDiv)
  } 
};

function updateLikes(event){
  event.preventDefault()

  let incrementLike = parseInt(event.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${event.target.id}`, {
    method: "PATCH",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    
    body: JSON.stringify({
      "likes": incrementLike
    })
  })
  .then(response => response.json())
  .then(updatedLikes => {
    event.target.previousElementSibling.innerText = `${incrementLike} Likes`
  })
};

function newToy(toyData) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify({
      "name": toyData.name.value,
      "image": toyData.image.value,
      "likes": 0
    })
  })
  .then(response => response.json())
  .then(fetchToys())
}