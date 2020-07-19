  
// const addBtn = document.querySelector('#new-toy-btn')
// const toyForm = document.querySelector('.container')
let addToy = false;
const main = document.querySelector('#toy-collection')

// getting toys from the JSON
function fetchToys(){
  return fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(json => renderToys(json));
}

function renderToys(toys){
  const main = document.getElementById("toy-collection")
  // use of for...of bc the return was an array
  // if the return is and object use for...in
  for (const toy of toys){

    // declaring all the elements inside loop so makes new
    // element for each toy
    let divCard = document.createElement('div')
    let h2 = document.createElement('h2')
    let img = document.createElement('img')
    let p = document.createElement('p')
    let btn = document.createElement('button')

    // setting the attributes for each element declared above
    h2.innerText = toy.name
    img.setAttribute('src', toy.image)
    img.setAttribute('class', 'toy-avatar')
    p.innerText = `${toy.likes} likes`
    divCard.setAttribute('class', 'card')
    // setting atributs for like button
    btn.setAttribute('class', 'like-btn')
    btn.setAttribute('id', toy.id)
    btn.innerText = "like"

    // event listener for the like button
    btn.addEventListener('click', (e) => {
      // calls the like function
      likes(e)
    })

    // adds everything to the single character's div created
    divCard.append(h2, img, p, btn)
    // adds the character to the page
    main.append(divCard)
  }
}

function likes(e) {
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": more
      })
    })
    .then(res => res.json())
    .then((like_obj => {
      e.target.previousElementSibling.innerText = `${more} likes`;
    }))
}

function postToy(toy_data){
  return fetch('http://localhost:3000/toys',{
    method: "POST",
    headers: 
    {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify( {
      "name": toy_data.name.value,
      "image": toy_data.image.value,
      "likes": 0
    } )
  })
  .then(res => res.json())
  .then(() => {
    fetchToys()
  })
}




document.addEventListener("DOMContentLoaded", () => {
  fetchToys()
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', event => {
        event.preventDefault()
        postToy(event.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
