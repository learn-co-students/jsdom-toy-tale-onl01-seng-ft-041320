  
// const addBtn = document.querySelector('#new-toy-btn')
// const toyForm = document.querySelector('.container')
let addToy = false;
const main = document.querySelector('#toy-collection')

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
    let divCard = document.createElement('div')
    let h2 = document.createElement('h2')
    let img = document.createElement('img')
    let p = document.createElement('p')
    h2.innerText = toy.name
    img.setAttribute('src', toy.image)
    img.setAttribute('class', 'toy-avatar')
    p.innerText = `${toy.likes} likes`
    divCard.setAttribute('class', 'card')
    divCard.append(h2, img, p)
    main.append(divCard)
}}

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
  .then((obj_toy) => {
    debugger
    let new_toy = renderToys(obj_toy)
    main.append(new_toy)
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
