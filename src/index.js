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
});

document.addEventListener("DOMContentLoaded", function(e) {
  fetch("http://localhost:3000/toys")
    .then(function(response) {
      return response.json()
    })
    .then(function(json) {
      addToys(json);
    })
});

function addToys(object) {
  for (const toy of object) {
    if (toy.name != undefined) {
      createToyCard(toy);
    }
  }
};

function createToyCard(toy) {
  document.getElementById('toy-collection').innerHTML += `
      <div class="card">
        <h2 id=${toy['id']}>${toy['name']}</h2>
        <img src=${toy['image']} class="toy-avatar" />
        <p>Likes ${toy['likes']}</p>
        <button class="like-btn">Like <3</button>
      </div>
    `
}
document.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.querySelector('input[name=name]').value 
  const image = document.querySelector('input[name=image]').value
  addNewToy(name, image);
  createToyCard({name: name, image: image, likes: 0});
})

function addNewToy(name, image) {
  fetch('http://localhost:3000/toys', {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }, 
    body: JSON.stringify({
      "name": name,
      "image": image,
      "likes": 0
    })
  }).then(function(response) {
    return response.json();
  })
}

document.addEventListener('click', function(e) {
  if (e.target.className === 'like-btn') {
    let id = e.target.parentElement.querySelector('h2').id
    let likesContainer = e.target.parentElement.querySelector('p')
    let num = likesContainer.innerText.charAt(likesContainer.innerText.length - 1)
    let newNum = parseInt(num) + 1;
    updateToyLikes(id, newNum);
    likesContainer.innerHTML = `<p>Likes ${newNum}</p>`
  }
})

function updateToyLikes(id, num) {
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH", 
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": num
    })
  })
  .then(response => response.json())
}