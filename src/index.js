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
  fetch("http://localhost:3000/toys").then(response => response.json()).then(object => createToyCards(object));

  let submitBtn = document.getElementsByName("submit")[0];
  document.addEventListener("submit", event => {
    event.preventDefault();
    sendCreateToyRequest();
  });

  
});

function createToyCards(toys) {
  toys.forEach(toy => {
    createToyCard(toy);
  });
}

function createToyCard(toy) {
  let div = document.createElement("div");
  div.className = "card";
  let h2 = document.createElement("h2");
  h2.innerText = toy.name;
  let img = document.createElement("img");
  img.src = toy.image;
  let p = document.createElement("p");
  p.innerText = `${toy.likes} Likes`
  let button = document.createElement("button");
  button.className = "like-btn";
  button.innerText = "Like <3";
  button.addEventListener("click", () => sendLikeRequest(toy, div));
  div.append(h2);
  div.append(img);
  div.append(p);
  div.append(button);
  document.getElementById("toy-collection").append(div);
}

function sendCreateToyRequest() {
  let fetchBody = {
    name: document.getElementsByName("name")[0].value,
    image: document.getElementsByName("image")[0].value
  }
  
  let fetchObj = {
    "method": "POST",
    "headers": {
      "content-type": "application/json",
      "accept": "application/json"
    },
    "body": JSON.stringify(fetchBody)
  }

  fetch("http://localhost:3000/toys", fetchObj).then(response => response.json()).then(object => createToyCard(object));
}

function sendLikeRequest(toy, div) {
  let fetchBody = {
    likes: toy.likes + 1
  }
  
  let fetchObj = {
    "method": "PATCH",
    "headers": {
      "content-type": "application/json",
      "accept": "application/json"
    },
    "body": JSON.stringify(fetchBody)
  }

  fetch(`http://localhost:3000/toys/${toy.id}`, fetchObj).then(response => response.json()).then(object => updateLikes(object, div));
}

function updateLikes(toy, div) {
  div.querySelector("p").innerText = `${toy.likes} Likes`
}