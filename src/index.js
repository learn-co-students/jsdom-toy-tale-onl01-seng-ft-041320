let addToy = false;
let toyCollection;
let toyUrl = "http://localhost:3000/toys";

let addToyBtn;


function getToys(){
  return fetch(toyUrl)
  .then(res => res.json())
  .then(results =>{
    results.forEach(toy => createDiv(toy))
  });
}

function createDiv(toy){
  const newDiv = document.createElement('div');
  newDiv.setAttribute("class", "card");
  let nameHeader = document.createElement('h2');
  let imageSource = document.createElement('img');
  let likesP = document.createElement('p');
  let toyBtn = document.createElement('BUTTON');
  toyBtn.innerText = "Like";
  toyBtn.setAttribute("class", "like-btn")
  imageSource.src = toy.image;
  imageSource.setAttribute("class", "toy-avatar");
  nameHeader.innerText = toy.name;
  likesP.innerText = `${toy.likes} Likes`;
  toyBtn.setAttribute(`id`, `${toy.id}`);
  toyCollection.appendChild(newDiv);
  newDiv.appendChild(nameHeader);
  newDiv.appendChild(imageSource);
  newDiv.appendChild(likesP);
  newDiv.appendChild(toyBtn);
};

function grabToyLikes(likesElement, toyLikes, toyObjId){
 
 
// console.log(toyObjId)
  let toyUrlId = `http://localhost:3000/toys/${toyObjId}`;
  updateLikes(likesElement, toyLikes, toyUrlId);
 };

function updateLikes(likesElement, toyLikes, toyUrlId){
let patchData = {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({
    "likes": toyLikes
  }
  )
};
return fetch(toyUrlId, patchData)
.then(function(response){
  return response.json();
})
.then(function(toyLikes){
    newLikes= toyLikes.likes + 1
    likesElement.innerText = `${newLikes} Likes`;
}
)
};

function submitToy(toyData){
  let postData = {
method: "POST", 
headers: {
  "Content-Type": "application/json",
  "Accept": "application/json"
},
body: JSON.stringify({
  "name": toyData.name.value,
  "image": toyData.image.value,
  "likes": 0
}
  )
};
return fetch("http://localhost:3000/toys", postData)
.then(function(response){
  return response.json();
})
.then(function(toy){
  createDiv(toy)
  window.scrollTo(0,document.body.scrollHeight);
})
};


//eventListener
document.addEventListener("DOMContentLoaded", () => {
  toyCollection = document.getElementById('toy-collection');
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const addToyForm = document.querySelector(".add-toy-form");
  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  
  });getToys();
  addToyBtn = document.querySelector(".submit");
  addToyForm.addEventListener("submit", function(){
    event.preventDefault();
    submitToy(event.currentTarget)
    event.currentTarget.reset()
  });
  toyCollection.addEventListener("click", (event) =>{
    if (event.target.tagName === "BUTTON"){
      const likesElement = event.target.parentNode.querySelector("p");
      const likesString = likesElement.textContent;
      const toyLikes = parseInt(likesString);
      const toyObjId = event.target.id;
       

    grabToyLikes(likesElement,toyLikes, toyObjId)}
  });
})

//When the page loads, make a 'GET' request to fetch all the toy objects. [X]
//With the response data, make a <div class="card"> for each toy [X]
//add it to the toy-collection div [X]
//Add a New Toy
//user submits the toy form, a POST request is sent to http://localhost:3000/toys [X]
//new toy is added to Andy's Toy Collection. [X]
//The toy should conditionally render to the page. [X]
//In order to send a POST request via Fetch, give the Fetch a second argument of an object.[X]
//This object should specify the method as POST[X]
//provide the appropriate headers and the JSON-ified data for the request.[X]
//make sure header and keys match the documentation[X]
