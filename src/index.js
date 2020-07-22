const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
const toyCollection = document.querySelector("#toy-collection");
const form = document.querySelector(".add-toy-form");
const ROOT_URL = `http://localhost:3000/toys`;
let btns = document.querySelectorAll(".like-btn");
let addToy = false;

// YOUR CODE HERE

addBtn.addEventListener("click", () => {
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
    addSubmitListener();
  } else {
    toyForm.style.display = "none";
  }
});

const getToys = () => {
  return fetch(ROOT_URL)
    .then(res => res.json())
    .then(toys => toys.forEach(toy => addToyCardToDom(toy)))
    .then(addLikeListener());
};

const addToyCardToDom = toy => {
  const card = document.createElement("div");
  const title = document.createElement("h2");
  const img = document.createElement("img");
  const likes = document.createElement("p");
  const btn = document.createElement("button");
  const likeCount = document.createElement("span");

  img.src = toy.image;
  title.innerHTML = toy.name;
  likes.innerHTML = `Likes: `;
  likeCount.innerHTML = toy.likes;
  btn.innerHTML = "👍";

  btn.dataset.id = toy.id;
  likeCount.id = toy.id;
  card.className = "card";
  img.className = "toy-avatar";
  btn.className = "like-btn";

  likes.appendChild(likeCount);

  card.appendChild(title);
  card.appendChild(img);
  card.appendChild(likes);
  card.appendChild(btn);

  toyCollection.appendChild(card);
};

const postToy = data => {
  let options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  };
  return fetch(ROOT_URL, options)
    .then(res => res.json())
    .then(res => console.log(res, options.body));
};

const getFormData = () => {
  return {
    name: form.name.value,
    image: form.image.value,
    likes: 0
  };
};

const addSubmitListener = () => {
  form.addEventListener("submit", e => {
    e.preventDefault();
    postToy(getFormData());
  });
};

const addLikeListener = () => {
  document.addEventListener("click", e => {
    //best way to do this? Having trouble using querySelectorAll...
    if (e.target.className === "like-btn") {
      let targetBtn = e.target;
      let currentLikes = document.getElementById(targetBtn.dataset.id)
        .innerText;
      increaseLikes(currentLikes, targetBtn.dataset.id);
    }
  });
};

const increaseLikes = (likesCount, toyId) => {
  let options = {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ likes: parseInt(likesCount) + 1 })
  };
  return fetch(`${ROOT_URL}/${toyId}`, options)
    .then(res => res.json())
    .then(json => updateLikesCount(json.likes, toyId));
};

const updateLikesCount = (likesCount, toyId) => {
  let likesEl = document.getElementById(toyId);
  likesEl.innerHTML = likesCount;
};

const init = () => {
  getToys();
};

document.addEventListener("DOMContentLoaded", init);