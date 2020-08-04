let addToy = false;

let toyUrl = "http://localhost:3000/toys";

function getToys(){
  return fetch(toyUrl)
  .then(res => res.json())
  .then(results =>{
    results.message.forEach(toy => createDiv(toy));
  });
};

function createDiv(toy){
  console.log

};


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
});

//When the page loads, make a 'GET' request to fetch all the toy objects. []
//With the response data, make a <div class="card"> for each toy []
//add it to the toy-collection div []
