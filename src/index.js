// //Fetch and Add Toy Info to Card:

// <div id="toy-collection">
// get request to fetch all toy objects
// make a <div class="card"> for each toy and add it to the toy-collection div

// Each cards child elements
// h2 tag with the toy's name
// img tag with the src of the toy's image attribute and the class name "toy-avatar"
// p tag with how many likes that toy has
// button tag with a class "like-btn"


   const toyDataPath = "http://localhost:3000/toys"

  function fetchToys() {
    fetch(toyDataPath)
      .then(resp => resp.json())
      .then(json => renderToys(json));
  }

    function renderToys(toys) {
      toys.forEach(toy => {
        let toyCollectionContainer = document.getElementById('toy-collection')
        
        let h2 = document.createElement('h2')
        h2.innerText = toy.name
        toyCollectionContainer.appendChild(h2)

        let img = document.createElement('img')
        img.src = toy.image
        toyCollectionContainer.appendChild(img)

        let toyLikes = document.createElement('p')
        toyLikes.innerText = `Likes: ${toy.likes}`
        toyCollectionContainer.appendChild(toyLikes)

        let button = document.createElement('BUTTON')
        button.setAttribute('class', 'like-btn')
        let text = document.createTextNode("Like")
        button.appendChild(text)
        toyCollectionContainer.appendChild(button)
      })
    }
    document.addEventListener("DOMContentLoaded", function() {
      fetchToys()
    })

// //Add a new toy:

// POST request is sent to http://localhost:3000/toys
// toy should conditionally render to the page
// give the Fetch a second argument of an object. 
// This object should specify the method as POST 
// and also provide the appropriate headers and the JSON-ified data for the request

// POST http://localhost:3000/toys
// headers: 
// {
//   "Content-Type": "application/json",
//   Accept: "application/json"
// }
 
// body: JSON.stringify({
//   "name": "Jessie",
//   "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
//   "likes": 0
// })

//window.onload=function(){

  let addToy = false;

  document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector("#new-toy-btn");
    const toyFormContainer = document.querySelector(".container");
    addBtn.addEventListener("click", () => {
      // hide & seek with the form
      addToy = !addToy;
      if (addToy) {
        toyFormContainer.style.display = "block";
        toyFormContainer.addEventListener('submit', function(e) {
          e.preventDefault();
          addNewToy(e.target)
        })
      } else {
        toyFormContainer.style.display = "none";
      }
    });
  });

  function addNewToy(toy) {
    // debugger
    const url = 'http://localhost:3000/toys'
    let name = document.querySelector("[name='name']").value
    let image = document.querySelector("[name='image']").value
    
    let newToy = {
      name: name,
      image: image,
      likes: 0
    };

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
              "Accept": "application/json"
      },
      body: JSON.stringify(newToy)
    };

    return fetch(url, configObj)
      .then(function(response) {
        return response.json();
      }) 
      .then(function(object) {
        console.log(object);
        document.body.innerHTML = object.id;
      })
      .catch(function(error) {
        alert("Woody: Watch out, errors!");
        document.body.innerHTML = error
      })
  };
  

//}

// //Increase Toy Likes:

// user clicks on toy's like button
// 1. conditional increase to toy's like count w/o reloading page
// 2. patch request sent to server at http://localhost:3000/toys/:id updating the number of likes that the specific toy has

// PATCH http://localhost:3000/toys/:id
// headers: 
// {
//   "Content-Type": "application/json",
//   Accept: "application/json"
// }
 
// body: JSON.stringify({
//   "likes": <new number>
// })
const likeButton = document.querySelector('.like-btn')
document.addEventListener('click', likes)

function likes(e) {
  e.preventDefault()
  
  let moreLikes = parseInt((e.target.previousElementSibling.innerText).split(": ")[1]) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": moreLikes
      })
    })
    .then(res => res.json())
    .then((like_obj => {
      e.target.previousElementSibling.innerText = `Likes: ${moreLikes}`;
    }))
}

//Questions:
//when adding new toy...db is out of order 
//the above code doesn't update # on database